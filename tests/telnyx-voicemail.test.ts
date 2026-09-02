import assert from "node:assert/strict";
import { generateKeyPairSync, sign } from "node:crypto";
import test from "node:test";
import {
  CREATIONS_DID_E164,
  FAILOVER_COPY,
  GREETING_COPY,
  SUCCESS_COPY,
} from "@/lib/telnyx/script";
import { createTelnyxVoiceHandlers } from "@/lib/telnyx/voice-handler";
import type { VoicemailLeadPayload } from "@/lib/telnyx/payload";

const { publicKey, privateKey } = generateKeyPairSync("ed25519");
const publicKeyB64 = publicKey
  .export({ type: "spki", format: "der" })
  .subarray(-32)
  .toString("base64");

const origin = "https://www.stlouiscreations.com";
const nowSeconds = 1_777_777_777;
const nowMs = nowSeconds * 1000;

function signBody(rawBody: string, timestamp = String(nowSeconds)) {
  return {
    timestamp,
    signature: sign(
      null,
      Buffer.from(`${timestamp}|${rawBody}`, "utf8"),
      privateKey,
    ).toString("base64"),
  };
}

function handlers(options?: {
  fromNumber?: string;
  publicKey?: string;
  leads?: VoicemailLeadPayload[];
  failures?: unknown[];
}) {
  const leads = options?.leads ?? [];
  return createTelnyxVoiceHandlers({
    publicKey: options?.publicKey ?? publicKeyB64,
    fromNumber: options?.fromNumber ?? CREATIONS_DID_E164,
    siteUrl: origin,
    nowMs: () => nowMs,
    deliverLead: async (payload) => {
      leads.push(payload);
    },
    reportFailure: (failure) => {
      options?.failures?.push(failure);
    },
  });
}

function signedRequest(
  path: string,
  rawBody: string,
  headers: Record<string, string> = {},
) {
  const signed = signBody(rawBody);
  return new Request(`${origin}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "telnyx-signature-ed25519": signed.signature,
      "telnyx-timestamp": signed.timestamp,
      ...headers,
    },
    body: rawBody,
  });
}

function signedGetRequest(path: string, query: string) {
  const signed = signBody("");
  return new Request(`${origin}${path}?${query}`, {
    method: "GET",
    headers: {
      "telnyx-signature-ed25519": signed.signature,
      "telnyx-timestamp": signed.timestamp,
    },
  });
}

test("rejects unsigned, forged, and stale Telnyx webhooks", async () => {
  const failures: unknown[] = [];
  const voice = handlers({ failures });
  const rawBody = `To=${encodeURIComponent(CREATIONS_DID_E164)}`;
  const stale = signBody(rawBody, String(nowSeconds - 6 * 60));

  const unsigned = await voice.inbound(
    new Request(`${origin}/api/telnyx/voice`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: rawBody,
    }),
  );
  const forged = await voice.inbound(
    signedRequest("/api/telnyx/voice", rawBody, {
      "telnyx-signature-ed25519": Buffer.alloc(64).toString("base64"),
    }),
  );
  const staleResponse = await voice.inbound(
    signedRequest("/api/telnyx/voice", rawBody, {
      "telnyx-signature-ed25519": stale.signature,
      "telnyx-timestamp": stale.timestamp,
    }),
  );

  assert.equal(unsigned.status, 403);
  assert.equal(forged.status, 403);
  assert.equal(staleResponse.status, 403);
  assert.equal(failures.length, 3);
});

test("returns 503 when Telnyx secrets or the locked DID env are missing", async () => {
  const missingKey = createTelnyxVoiceHandlers({
    fromNumber: CREATIONS_DID_E164,
  });
  const wrongDid = handlers({ fromNumber: "+13145550199" });
  const rawBody = `To=${encodeURIComponent(CREATIONS_DID_E164)}`;

  assert.equal(
    (await missingKey.inbound(signedRequest("/api/telnyx/voice", rawBody))).status,
    503,
  );
  assert.equal(
    (await wrongDid.inbound(signedRequest("/api/telnyx/voice", rawBody))).status,
    503,
  );
});

test("inbound TeXML gathers the three locked fields only on +13143500006", async () => {
  const voice = handlers();
  const inbound = await voice.inbound(
    signedRequest(
      "/api/telnyx/voice",
      `To=${encodeURIComponent(CREATIONS_DID_E164)}&From=${encodeURIComponent("+13145550188")}&CallSid=CA123`,
    ),
  );
  const xml = await inbound.text();

  assert.equal(inbound.status, 200);
  assert.match(inbound.headers.get("content-type") || "", /xml/);
  assert.match(xml, /<AIGather /);
  assert.match(xml, /<Greeting>Thanks for calling St\. Louis Creations\. This call may be recorded\. I just need your name, a number we can call back, and an email\.<\/Greeting>/);
  assert.match(xml, /"name"/);
  assert.match(xml, /"phone"/);
  assert.match(xml, /"email"/);
  assert.doesNotMatch(xml, /<Greeting>[^<]*(quote|pricing|SMS|twilio)/i);
  assert.match(xml, /\/api\/telnyx\/gather/);

  const otherDid = await voice.inbound(
    signedRequest("/api/telnyx/voice", `To=${encodeURIComponent("+13145550000")}&CallSid=CA999`),
  );
  const otherXml = await otherDid.text();
  assert.equal(otherDid.status, 200);
  assert.match(otherXml, /<Hangup\/>/);
  assert.doesNotMatch(otherXml, /<AIGather /);
});

test("successful AI Gather hangs up with the locked success line and emits JSON", async () => {
  const leads: VoicemailLeadPayload[] = [];
  const voice = handlers({ leads });
  const rawBody = new URLSearchParams({
    CallSid: "CA-gather-1",
    To: CREATIONS_DID_E164,
    Status: "valid",
    Result: JSON.stringify({
      name: "Ada Lovelace",
      phone: "314-555-0188",
      email: "ada@example.com",
    }),
  }).toString();

  const response = await voice.gather(signedRequest("/api/telnyx/gather", rawBody));
  const xml = await response.text();

  assert.equal(response.status, 200);
  assert.match(xml, new RegExp(SUCCESS_COPY.replaceAll(".", "\\.")));
  assert.match(xml, /<Hangup\/>/);
  assert.doesNotMatch(xml, /<Record /);
  assert.deepEqual(leads, [
    {
      name: "Ada Lovelace",
      phone: "314-555-0188",
      email: "ada@example.com",
      callId: "CA-gather-1",
      recordingUrl: null,
      status: "gathered",
    },
  ]);
});

test("AI Gather timeout or missing fields fail over to the locked record prompt", async () => {
  const leads: VoicemailLeadPayload[] = [];
  const voice = handlers({ leads });
  const timeoutBody = new URLSearchParams({
    CallSid: "CA-timeout",
    To: CREATIONS_DID_E164,
    Status: "timeout",
    Result: JSON.stringify({ name: "Ada" }),
  }).toString();
  const incompleteJson = JSON.stringify({
    data: {
      payload: {
        call_control_id: "v2:incomplete",
        status: "valid",
        result: { name: "Ada Lovelace", phone: "314-555-0188" },
        to: CREATIONS_DID_E164,
      },
    },
  });

  const timeout = await voice.gather(signedRequest("/api/telnyx/gather", timeoutBody));
  const incomplete = await voice.gather(
    signedRequest("/api/telnyx/gather", incompleteJson, {
      "content-type": "application/json",
    }),
  );

  for (const response of [timeout, incomplete]) {
    const xml = await response.text();
    assert.equal(response.status, 200);
    assert.match(xml, new RegExp(FAILOVER_COPY.replaceAll(".", "\\.")));
    assert.match(xml, /<Record /);
    assert.match(xml, /playBeep="true"/);
    assert.match(xml, /action="https:\/\/www\.stlouiscreations\.com\/api\/telnyx\/record"/);
    assert.doesNotMatch(xml, /recordingStatusCallback/);
    assert.match(xml, /<Hangup\/>/);
    assert.doesNotMatch(xml, new RegExp(SUCCESS_COPY.replaceAll(".", "\\.")));
  }
  assert.equal(leads.length, 0);
});

test("missing lead destination is a config failure and does not promise follow-up", async () => {
  const failures: unknown[] = [];
  const voice = createTelnyxVoiceHandlers({
    publicKey: publicKeyB64,
    fromNumber: CREATIONS_DID_E164,
    siteUrl: origin,
    nowMs: () => nowMs,
    reportFailure: (failure) => {
      failures.push(failure);
    },
  });
  const gatheredBody = new URLSearchParams({
    CallSid: "CA-gather-no-dest",
    To: CREATIONS_DID_E164,
    Status: "valid",
    Result: JSON.stringify({
      name: "Ada Lovelace",
      phone: "314-555-0188",
      email: "ada@example.com",
    }),
  }).toString();

  const gatherResponse = await voice.gather(
    signedRequest("/api/telnyx/gather", gatheredBody),
  );
  const gatherXml = await gatherResponse.text();

  assert.equal(gatherResponse.status, 200);
  assert.doesNotMatch(gatherXml, new RegExp(SUCCESS_COPY.replaceAll(".", "\\.")));
  assert.match(gatherXml, new RegExp(FAILOVER_COPY.replaceAll(".", "\\.")));
  assert.match(gatherXml, /<Record /);
  assert.doesNotMatch(gatherXml, /recordingStatusCallback/);
  assert.deepEqual(failures, [{ stage: "configuration" }]);

  const recordBody = new URLSearchParams({
    CallSid: "CA-record-no-dest",
    To: CREATIONS_DID_E164,
    RecordingUrl: "https://recordings.example/ca-record-no-dest.mp3",
    RecordingStatus: "completed",
  }).toString();
  const recordResponse = await voice.record(
    signedRequest("/api/telnyx/record", recordBody),
  );
  const recordXml = await recordResponse.text();

  assert.equal(recordResponse.status, 200);
  assert.match(recordXml, /<Hangup\/>/);
  assert.doesNotMatch(recordXml, new RegExp(SUCCESS_COPY.replaceAll(".", "\\.")));
  assert.deepEqual(failures, [
    { stage: "configuration" },
    { stage: "configuration" },
  ]);
});

test("record callback emits structured JSON with call id and recording URL", async () => {
  const leads: VoicemailLeadPayload[] = [];
  const voice = handlers({ leads });
  const rawBody = new URLSearchParams({
    CallSid: "CA-record-1",
    To: CREATIONS_DID_E164,
    RecordingUrl: "https://recordings.example/ca-record-1.mp3",
    RecordingStatus: "completed",
  }).toString();

  const response = await voice.record(signedRequest("/api/telnyx/record", rawBody));
  const xml = await response.text();

  assert.equal(response.status, 200);
  assert.match(xml, /<Hangup\/>/);
  assert.deepEqual(leads, [
    {
      name: null,
      phone: null,
      email: null,
      callId: "CA-record-1",
      recordingUrl: "https://recordings.example/ca-record-1.mp3",
      status: "voicemail",
    },
  ]);
});

test("locked caller script is used verbatim and does not invent SMS or quotes", async () => {
  assert.equal(
    GREETING_COPY,
    "Thanks for calling St. Louis Creations. This call may be recorded. I just need your name, a number we can call back, and an email.",
  );
  assert.equal(SUCCESS_COPY, "Got it. Thanks for calling. We’ll follow up.");
  assert.equal(FAILOVER_COPY, "Please leave a short message after the tone.");
  assert.equal(CREATIONS_DID_E164, "+13143500006");
});

test("inbound AIGather uses Kokoro Heart and documented TeXML children only", async () => {
  const voice = handlers();
  const inbound = await voice.inbound(
    signedRequest(
      "/api/telnyx/voice",
      `To=${encodeURIComponent(CREATIONS_DID_E164)}&CallSid=CA-kokoro`,
    ),
  );
  const xml = await inbound.text();

  assert.equal(inbound.status, 200);
  assert.match(xml, /<Voice name="Telnyx\.KokoroTTS\.af_heart"\/>/);
  assert.match(xml, /<AIGather action="https:\/\/www\.stlouiscreations\.com\/api\/telnyx\/gather" method="POST">/);
  assert.match(xml, /<Parameters>/);
  assert.match(xml, /<!\[CDATA\[/);
  assert.doesNotMatch(xml, /Polly\.Joanna/);
  assert.doesNotMatch(xml, /userResponseTimeoutMs/);
  assert.doesNotMatch(xml, /<Assistant[\s>]/);
  assert.doesNotMatch(xml, /ElevenLabs|Azure|Ultra|api_key_ref/);
});

test("success and failover TeXML speak with Kokoro Heart", async () => {
  const voice = handlers();
  const gatheredBody = new URLSearchParams({
    CallSid: "CA-kokoro-success",
    To: CREATIONS_DID_E164,
    Status: "valid",
    Result: JSON.stringify({
      name: "Ada Lovelace",
      phone: "314-555-0188",
      email: "ada@example.com",
    }),
  }).toString();
  const timeoutBody = new URLSearchParams({
    CallSid: "CA-kokoro-failover",
    To: CREATIONS_DID_E164,
    Status: "timeout",
  }).toString();

  const success = await voice.gather(signedRequest("/api/telnyx/gather", gatheredBody));
  const failover = await voice.gather(signedRequest("/api/telnyx/gather", timeoutBody));
  const successXml = await success.text();
  const failoverXml = await failover.text();

  assert.match(successXml, /<Say voice="Telnyx\.KokoroTTS\.af_heart">Got it\. Thanks for calling\./);
  assert.doesNotMatch(successXml, /Polly\.Joanna/);
  assert.match(failoverXml, /<Say voice="Telnyx\.KokoroTTS\.af_heart">Please leave a short message after the tone\.<\/Say>/);
  assert.doesNotMatch(failoverXml, /Polly\.Joanna/);
});

test("signed GET gather still returns the locked success line", async () => {
  const leads: VoicemailLeadPayload[] = [];
  const voice = handlers({ leads });
  const result = JSON.stringify({
    name: "Ada Lovelace",
    phone: "314-555-0188",
    email: "ada@example.com",
  });
  const query = new URLSearchParams({
    CallSid: "CA-gather-get",
    To: CREATIONS_DID_E164,
    Status: "valid",
    Result: result,
  }).toString();

  const unsigned = await voice.gather(
    new Request(`${origin}/api/telnyx/gather?${query}`, { method: "GET" }),
  );
  const signed = await voice.gather(signedGetRequest("/api/telnyx/gather", query));
  const xml = await signed.text();

  assert.equal(unsigned.status, 403);
  assert.equal(signed.status, 200);
  assert.match(xml, new RegExp(SUCCESS_COPY.replaceAll(".", "\\.")));
  assert.match(xml, /<Say voice="Telnyx\.KokoroTTS\.af_heart">/);
  assert.equal(leads.length, 1);
  assert.equal(leads[0]?.callId, "CA-gather-get");
});
