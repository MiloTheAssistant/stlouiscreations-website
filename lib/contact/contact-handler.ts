import { contactLinks, siteConfig } from "@/lib/constants";
import {
  quoteRequestSchema,
  quoteRequestSubject,
  renderQuoteRequestHtml,
} from "@/lib/contact/quote-request";
import {
  GraphMailError,
  type GraphMailMessage,
} from "@/lib/microsoft-graph-mail";

export const MAX_CONTACT_BODY_BYTES = 32 * 1024;

export type ContactFailure = {
  stage: "configuration" | "token" | "send" | "unknown";
  status?: number;
  code?: string;
};

type ContactHandlerDependencies = {
  deliver(message: GraphMailMessage): Promise<void>;
  reportFailure?(failure: ContactFailure): void;
};

const invalidResponse = () =>
  Response.json({ error: "Invalid submission." }, { status: 400 });
const rejectedResponse = () =>
  Response.json({ error: "Submission rejected." }, { status: 403 });
const tooLargeResponse = () =>
  Response.json({ error: "Invalid submission." }, { status: 413 });
const unavailableResponse = () =>
  Response.json({ error: "Contact service unavailable." }, { status: 503 });

function isFilledHoneypot(payload: unknown) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }
  const website = (payload as Record<string, unknown>).website;
  return typeof website === "string" && website.trim().length > 0;
}

function singleForwardedValue(request: Request, headerName: string) {
  if (!request.headers.has(headerName)) return { state: "absent" } as const;

  const value = request.headers.get(headerName)?.trim();
  if (!value || value.includes(",")) return { state: "invalid" } as const;

  return { state: "valid", value } as const;
}

function canonicalTargetOrigin(request: Request) {
  const forwardedProtocol = singleForwardedValue(request, "x-forwarded-proto");
  if (forwardedProtocol.state === "invalid") return undefined;

  const protocol =
    forwardedProtocol.state === "valid"
      ? forwardedProtocol.value
      : new URL(request.url).protocol.slice(0, -1);
  if (protocol !== "http" && protocol !== "https") return undefined;

  const forwardedHost = singleForwardedValue(request, "x-forwarded-host");
  if (forwardedHost.state === "invalid") return undefined;

  const host =
    forwardedHost.state === "valid"
      ? forwardedHost.value
      : request.headers.get("host")?.trim() || new URL(request.url).host;
  if (!host || host.includes(",")) return undefined;

  const candidateOrigin = `${protocol}://${host}`;
  try {
    const parsedTarget = new URL(candidateOrigin);
    return parsedTarget.origin === candidateOrigin ? parsedTarget.origin : undefined;
  } catch {
    return undefined;
  }
}

function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  let parsedOrigin: URL;
  try {
    parsedOrigin = new URL(origin);
  } catch {
    return false;
  }

  if (
    (parsedOrigin.protocol !== "http:" && parsedOrigin.protocol !== "https:") ||
    origin !== parsedOrigin.origin
  ) {
    return false;
  }

  const targetOrigin = canonicalTargetOrigin(request);
  const canonicalOrigin = new URL(siteConfig.url).origin;
  return (
    parsedOrigin.origin === canonicalOrigin && targetOrigin === canonicalOrigin
  );
}

export function createContactPostHandler(dependencies: ContactHandlerDependencies) {
  return async function post(request: Request) {
    const mediaType = request.headers
      .get("content-type")
      ?.split(";", 1)[0]
      ?.trim()
      .toLowerCase();
    if (mediaType !== "application/json") return invalidResponse();

    if (!hasSameOrigin(request)) return rejectedResponse();

    const declaredLength = request.headers.get("content-length");
    if (declaredLength !== null) {
      const parsedLength = Number(declaredLength);
      if (!Number.isSafeInteger(parsedLength) || parsedLength < 0) {
        return invalidResponse();
      }
      if (parsedLength > MAX_CONTACT_BODY_BYTES) return tooLargeResponse();
    }

    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch {
      return invalidResponse();
    }
    if (new TextEncoder().encode(rawBody).byteLength > MAX_CONTACT_BODY_BYTES) {
      return tooLargeResponse();
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return invalidResponse();
    }
    if (isFilledHoneypot(payload)) return rejectedResponse();

    const parsed = quoteRequestSchema.safeParse(payload);
    if (!parsed.success) return invalidResponse();

    try {
      await dependencies.deliver({
        to: contactLinks.email,
        replyTo: parsed.data.email,
        subject: quoteRequestSubject(parsed.data.productType),
        html: renderQuoteRequestHtml(parsed.data),
      });
      return Response.json({ ok: true });
    } catch (error) {
      dependencies.reportFailure?.(
        error instanceof GraphMailError
          ? { stage: error.stage, status: error.status, code: error.code }
          : { stage: "unknown" },
      );
      return unavailableResponse();
    }
  };
}
