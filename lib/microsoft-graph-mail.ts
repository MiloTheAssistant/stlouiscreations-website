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

  const tokenResponse = await fetcher(
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

  const tokenPayload = (await tokenResponse.json()) as { access_token?: unknown };
  if (
    typeof tokenPayload.access_token !== "string" ||
    tokenPayload.access_token.length === 0
  ) {
    throw new GraphMailError("token", tokenResponse.status, "missing_access_token");
  }

  const sendResponse = await fetcher(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(resolved.fromEmail)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenPayload.access_token}`,
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
