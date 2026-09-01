import { siteConfig } from "@/lib/constants";
import {
  callbackCallId,
  callbackResult,
  callbackStatus,
  callbackString,
  parseTelnyxCallback,
  readTelnyxRawBody,
} from "@/lib/telnyx/request";
import {
  buildVoicemailLeadPayload,
  hasGatheredLead,
  type VoicemailLeadPayload,
} from "@/lib/telnyx/payload";
import { isCreationsDid, lockedFromNumber } from "@/lib/telnyx/did";
import { verifyTelnyxSignature } from "@/lib/telnyx/signature";
import {
  failoverRecordTexml,
  hangupTexml,
  inboundGatherTexml,
  successTexml,
  texmlResponse,
} from "@/lib/telnyx/texml";

export type TelnyxVoiceFailure = {
  stage: "configuration" | "signature" | "request" | "deliver";
  status?: number;
};

export type TelnyxVoiceDependencies = {
  publicKey?: string;
  fromNumber?: string;
  leadWebhookUrl?: string;
  siteUrl?: string;
  nowMs?: () => number;
  deliverLead?(payload: VoicemailLeadPayload): Promise<void>;
  reportFailure?(failure: TelnyxVoiceFailure): void;
};

const rejectedResponse = () =>
  new Response("Forbidden", { status: 403, headers: { "content-type": "text/plain" } });
const unavailableResponse = () =>
  new Response("Voice service unavailable.", {
    status: 503,
    headers: { "content-type": "text/plain" },
  });
const invalidResponse = () =>
  new Response("Invalid request.", { status: 400, headers: { "content-type": "text/plain" } });
const tooLargeResponse = () =>
  new Response("Payload too large.", { status: 413, headers: { "content-type": "text/plain" } });

function absoluteUrl(siteUrl: string, path: string) {
  return new URL(path, siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`).toString();
}

function failedGatherStatus(status: string | undefined) {
  if (!status) return false;
  return (
    status === "invalid" ||
    status === "timeout" ||
    status === "failed" ||
    status === "error" ||
    status.includes("timeout")
  );
}

function hasLeadDestination(dependencies: TelnyxVoiceDependencies) {
  return Boolean(dependencies.deliverLead || dependencies.leadWebhookUrl?.trim());
}

async function defaultDeliverLead(
  url: string | undefined,
  payload: VoicemailLeadPayload,
) {
  const destination = url?.trim();
  if (!destination) {
    throw new Error("lead_destination_missing");
  }

  const response = await fetch(destination, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok) {
    throw new Error("lead_delivery_failed");
  }
}

export function createTelnyxVoiceHandlers(dependencies: TelnyxVoiceDependencies) {
  const siteUrl = dependencies.siteUrl?.trim() || siteConfig.url;
  const gatherUrl = absoluteUrl(siteUrl, "/api/telnyx/gather");
  const recordUrl = absoluteUrl(siteUrl, "/api/telnyx/record");

  async function authorizedCallback(request: Request) {
    const publicKey = dependencies.publicKey?.trim();
    const fromNumber = lockedFromNumber(dependencies.fromNumber);
    if (!publicKey || !fromNumber) {
      dependencies.reportFailure?.({ stage: "configuration" });
      return { ok: false as const, response: unavailableResponse() };
    }

    const body = await readTelnyxRawBody(request);
    if (!body.ok) {
      dependencies.reportFailure?.({ stage: "request", status: body.status });
      return {
        ok: false as const,
        response: body.status === 413 ? tooLargeResponse() : invalidResponse(),
      };
    }

    const verified = verifyTelnyxSignature({
      publicKey,
      rawBody: body.rawBody,
      signature: request.headers.get("telnyx-signature-ed25519"),
      timestamp: request.headers.get("telnyx-timestamp"),
      nowMs: dependencies.nowMs?.(),
    });
    if (!verified) {
      dependencies.reportFailure?.({ stage: "signature", status: 403 });
      return { ok: false as const, response: rejectedResponse() };
    }

    const payload = parseTelnyxCallback(
      body.rawBody,
      request.headers.get("content-type"),
      request.url,
    );

    return { ok: true as const, payload };
  }

  async function emitLead(payload: VoicemailLeadPayload) {
    if (!hasLeadDestination(dependencies)) {
      dependencies.reportFailure?.({ stage: "configuration" });
      return false;
    }

    try {
      if (dependencies.deliverLead) {
        await dependencies.deliverLead(payload);
        return true;
      }
      await defaultDeliverLead(dependencies.leadWebhookUrl, payload);
      return true;
    } catch {
      dependencies.reportFailure?.({ stage: "deliver" });
      return false;
    }
  }

  async function inbound(request: Request) {
    const authorized = await authorizedCallback(request);
    if (!authorized.ok) return authorized.response;

    const to =
      callbackString(authorized.payload, ["To", "to", "Called"]) ??
      callbackString(authorized.payload, ["ToSipUri"]);
    if (!isCreationsDid(to?.split("@")[0])) {
      return texmlResponse(hangupTexml());
    }

    return texmlResponse(inboundGatherTexml(gatherUrl));
  }

  async function gather(request: Request) {
    const authorized = await authorizedCallback(request);
    if (!authorized.ok) return authorized.response;

    const result = callbackResult(authorized.payload);
    const lead = buildVoicemailLeadPayload({
      name: result.name,
      phone: result.phone,
      email: result.email,
      callId: callbackCallId(authorized.payload),
      recordingUrl: null,
      status: "gathered",
    });

    if (failedGatherStatus(callbackStatus(authorized.payload)) || !hasGatheredLead(lead)) {
      return texmlResponse(failoverRecordTexml(recordUrl));
    }

    // No webhook and no injected deliverLead: do not promise a follow-up
    // while discarding the lead. Failover voicemail still captures a recording.
    if (!hasLeadDestination(dependencies)) {
      dependencies.reportFailure?.({ stage: "configuration" });
      return texmlResponse(failoverRecordTexml(recordUrl));
    }

    await emitLead(lead);
    return texmlResponse(successTexml());
  }

  async function record(request: Request) {
    const authorized = await authorizedCallback(request);
    if (!authorized.ok) return authorized.response;

    const recordingUrl = callbackString(authorized.payload, [
      "RecordingUrl",
      "recording_url",
      "RecordingUri",
    ]);
    const callId = callbackCallId(authorized.payload);
    if (recordingUrl || callId) {
      await emitLead(
        buildVoicemailLeadPayload({
          name: callbackString(authorized.payload, ["name", "Name"]),
          phone: callbackString(authorized.payload, ["phone", "Phone"]),
          email: callbackString(authorized.payload, ["email", "Email"]),
          callId,
          recordingUrl,
          status: "voicemail",
        }),
      );
    }

    return texmlResponse(hangupTexml());
  }

  return { inbound, gather, record };
}
