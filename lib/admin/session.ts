import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "slc_admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

export interface AdminSessionUser {
  email: string;
  name?: string | null;
  picture?: string | null;
}

interface AdminSessionPayload extends AdminSessionUser {
  exp: number;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function base64UrlJson(value: unknown): string {
  return Buffer.from(JSON.stringify(value), "utf8").toString("base64url");
}

function signPayload(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function isAdminEmailAllowed(
  email: string | null | undefined,
  allowlist = process.env.ADMIN_EMAILS ?? ""
): boolean {
  if (!email) {
    return false;
  }

  const allowedEmails = allowlist
    .split(",")
    .map(normalizeEmail)
    .filter(Boolean);

  return allowedEmails.includes(normalizeEmail(email));
}

export function getAdminSessionSecret(): string {
  const secret =
    process.env.ADMIN_SESSION_SECRET ?? process.env.VERCEL_APP_CLIENT_SECRET;

  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET or VERCEL_APP_CLIENT_SECRET is required for admin sessions."
    );
  }

  return secret;
}

export function createSignedAdminSession(
  user: AdminSessionUser,
  secret?: string,
  issuedAt = new Date()
): string {
  const sessionSecret = secret ?? getAdminSessionSecret();
  const payload: AdminSessionPayload = {
    email: normalizeEmail(user.email),
    name: user.name ?? null,
    picture: user.picture ?? null,
    exp: issuedAt.getTime() + SESSION_TTL_MS,
  };
  const encodedPayload = base64UrlJson(payload);
  const signature = signPayload(encodedPayload, sessionSecret);

  return `${encodedPayload}.${signature}`;
}

export function readSignedAdminSession(
  value: string | undefined,
  secret?: string,
  now = new Date()
): AdminSessionUser | null {
  if (!value) {
    return null;
  }
  const sessionSecret = secret ?? getAdminSessionSecret();

  const [encodedPayload, signature] = value.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload, sessionSecret);
  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as AdminSessionPayload;

    if (!payload.email || payload.exp <= now.getTime()) {
      return null;
    }

    if (!isAdminEmailAllowed(payload.email)) {
      return null;
    }

    return {
      email: payload.email,
      name: payload.name ?? null,
      picture: payload.picture ?? null,
    };
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSessionUser | null> {
  const cookieStore = await cookies();
  return readSignedAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}
