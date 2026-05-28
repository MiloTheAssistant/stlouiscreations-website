import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createSignedAdminSession,
  isAdminEmailAllowed,
} from "@/lib/admin/session";
import {
  exchangeVercelCodeForToken,
  getVercelUserInfo,
} from "@/lib/admin/vercel-oauth";

function clearOAuthCookie(response: NextResponse, name: string) {
  response.cookies.set(name, "", {
    maxAge: 0,
    path: "/",
  });
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const storedState = request.cookies.get("vercel_oauth_state")?.value;
  const codeVerifier = request.cookies.get("vercel_oauth_code_verifier")?.value;

  if (!code || !state || !storedState || state !== storedState || !codeVerifier) {
    return NextResponse.redirect(new URL("/admin?error=auth", request.url));
  }

  try {
    const token = await exchangeVercelCodeForToken({
      code,
      codeVerifier,
      origin: request.nextUrl.origin,
    });
    const userInfo = await getVercelUserInfo(token.access_token);

    if (!isAdminEmailAllowed(userInfo.email)) {
      return NextResponse.redirect(new URL("/admin?error=forbidden", request.url));
    }

    const response = NextResponse.redirect(new URL("/admin", request.url));
    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      createSignedAdminSession({
        email: userInfo.email!,
        name: userInfo.name ?? userInfo.preferred_username ?? null,
        picture: userInfo.picture ?? null,
      }),
      {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      }
    );
    clearOAuthCookie(response, "vercel_oauth_state");
    clearOAuthCookie(response, "vercel_oauth_nonce");
    clearOAuthCookie(response, "vercel_oauth_code_verifier");

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/admin?error=auth", request.url));
  }
}
