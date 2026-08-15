export type GraphMailConfig = {
  tenantId?: string;
  clientId?: string;
  clientSecret?: string;
  fromEmail?: string;
};

export type GraphMailMessage = {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
};

export type GraphFetch = (
  input: string,
  init?: RequestInit,
) => Promise<Response>;

export type GraphMailStage = "configuration" | "token" | "send";

const graphRequestTimeoutMs = 10_000;

export class GraphMailError extends Error {
  constructor(
    public readonly stage: GraphMailStage,
    public readonly status?: number,
    public readonly code?: string,
  ) {
    super(`Microsoft Graph mail failed during ${stage}.`);
    this.name = "GraphMailError";
  }
}

function requiredConfig(config: GraphMailConfig) {
  const tenantId = config.tenantId?.trim();
  const clientId = config.clientId?.trim();
  const clientSecret = config.clientSecret?.trim();
  const fromEmail = config.fromEmail?.trim();

  if (!tenantId || !clientId || !clientSecret || !fromEmail) {
    throw new GraphMailError("configuration");
  }

  return { tenantId, clientId, clientSecret, fromEmail };
}

function safeCode(value: unknown) {
  return typeof value === "string" && /^[A-Za-z0-9_.-]{1,100}$/.test(value)
    ? value
    : undefined;
}

async function responseErrorCode(response: Response) {
  try {
    const payload = (await response.json()) as {
      error?: string | { code?: unknown };
    };
    return safeCode(
      typeof payload.error === "string" ? payload.error : payload.error?.code,
    );
  } catch {
    return undefined;
  }
}

async function fetchGraph(
  stage: Extract<GraphMailStage, "token" | "send">,
  fetcher: GraphFetch,
  input: string,
  init: RequestInit,
) {
  try {
    return await fetcher(input, {
      ...init,
      signal: AbortSignal.timeout(graphRequestTimeoutMs),
    });
  } catch {
    throw new GraphMailError(stage, undefined, "request_failed");
  }
}

export async function sendGraphMail(
  message: GraphMailMessage,
  config: GraphMailConfig,
  fetcher: GraphFetch = (input, init) => fetch(input, init),
) {
  const resolved = requiredConfig(config);
  const tokenBody = new URLSearchParams({
    client_id: resolved.clientId,
    client_secret: resolved.clientSecret,
    grant_type: "client_credentials",
    scope: "https://graph.microsoft.com/.default",
  });

  const tokenResponse = await fetchGraph(
    "token",
    fetcher,
    `https://login.microsoftonline.com/${encodeURIComponent(resolved.tenantId)}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenBody,
    },
  );

  if (!tokenResponse.ok) {
    throw new GraphMailError(
      "token",
      tokenResponse.status,
      await responseErrorCode(tokenResponse),
    );
  }

  let tokenPayload: unknown;
  try {
    tokenPayload = await tokenResponse.json();
  } catch {
    throw new GraphMailError("token", tokenResponse.status, "invalid_token_response");
  }
  if (
    typeof tokenPayload !== "object" ||
    tokenPayload === null ||
    Array.isArray(tokenPayload)
  ) {
    throw new GraphMailError("token", tokenResponse.status, "invalid_token_response");
  }

  const accessToken = (tokenPayload as { access_token?: unknown }).access_token;
  if (
    typeof accessToken !== "string" ||
    accessToken.length === 0
  ) {
    throw new GraphMailError("token", tokenResponse.status, "missing_access_token");
  }

  const sendResponse = await fetchGraph(
    "send",
    fetcher,
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(resolved.fromEmail)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: message.subject,
          body: { contentType: "HTML", content: message.html },
          replyTo: [{ emailAddress: { address: message.replyTo } }],
          toRecipients: [{ emailAddress: { address: message.to } }],
        },
        saveToSentItems: true,
      }),
    },
  );

  if (sendResponse.status !== 202) {
    throw new GraphMailError(
      "send",
      sendResponse.status,
      await responseErrorCode(sendResponse),
    );
  }
}
