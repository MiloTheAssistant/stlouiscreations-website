import { NextResponse, type NextRequest } from "next/server";
import {
  buildVercelAuthorizationUrl,
  createCodeChallenge,
  generateSecureRandomString,
} from "@/lib/admin/vercel-oauth";

const OAUTH_COOKIE_MAX_AGE = 10 * 60;

function cookieOptions() {
  return {
    httpOnly: true,
    maxAge: OAUTH_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export async function GET(request: NextRequest) {
  const state = generateSecureRandomString();
  const nonce = generateSecureRandomString();
  const codeVerifier = generateSecureRandomString(64);
  const codeChallenge = createCodeChallenge(codeVerifier);
  const authorizationUrl = buildVercelAuthorizationUrl({
    origin: request.nextUrl.origin,
    state,
    nonce,
    codeChallenge,
  });
  const response = NextResponse.redirect(authorizationUrl);

  response.cookies.set("vercel_oauth_state", state, cookieOptions());
  response.cookies.set("vercel_oauth_nonce", nonce, cookieOptions());
  response.cookies.set(
    "vercel_oauth_code_verifier",
    codeVerifier,
    cookieOptions()
  );

  return response;
}
