import crypto from "node:crypto";

export interface VercelTokenResponse {
  access_token: string;
  token_type: string;
  id_token?: string;
  expires_in: number;
  scope?: string;
  refresh_token?: string;
}

export interface VercelUserInfo {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  preferred_username?: string;
  picture?: string;
}

export function generateSecureRandomString(length = 43): string {
  return crypto.randomBytes(length).toString("base64url").slice(0, length);
}

export function createCodeChallenge(codeVerifier: string): string {
  return crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");
}

export function getVercelClientId(): string {
  const clientId = process.env.NEXT_PUBLIC_VERCEL_APP_CLIENT_ID;
  if (!clientId) {
    throw new Error("NEXT_PUBLIC_VERCEL_APP_CLIENT_ID is required.");
  }
  return clientId;
}

export function getVercelClientSecret(): string {
  const clientSecret = process.env.VERCEL_APP_CLIENT_SECRET;
  if (!clientSecret) {
    throw new Error("VERCEL_APP_CLIENT_SECRET is required.");
  }
  return clientSecret;
}

export function buildVercelAuthorizationUrl({
  origin,
  state,
  nonce,
  codeChallenge,
}: {
  origin: string;
  state: string;
  nonce: string;
  codeChallenge: string;
}): string {
  const params = new URLSearchParams({
    client_id: getVercelClientId(),
    redirect_uri: `${origin}/api/auth/callback`,
    response_type: "code",
    scope: "openid email profile",
    state,
    nonce,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  return `https://vercel.com/oauth/authorize?${params.toString()}`;
}

export async function exchangeVercelCodeForToken({
  code,
  codeVerifier,
  origin,
}: {
  code: string;
  codeVerifier: string;
  origin: string;
}): Promise<VercelTokenResponse> {
  const response = await fetch("https://api.vercel.com/login/oauth/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: getVercelClientId(),
      client_secret: getVercelClientSecret(),
      code,
      code_verifier: codeVerifier,
      redirect_uri: `${origin}/api/auth/callback`,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Vercel token exchange failed: ${response.status} ${body}`);
  }

  return (await response.json()) as VercelTokenResponse;
}

export async function getVercelUserInfo(
  accessToken: string
): Promise<VercelUserInfo> {
  const response = await fetch("https://api.vercel.com/login/oauth/userinfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Vercel userinfo failed: ${response.status} ${body}`);
  }

  return (await response.json()) as VercelUserInfo;
}
