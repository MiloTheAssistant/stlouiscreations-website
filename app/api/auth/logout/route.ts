import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/session";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/admin", request.url));
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}
