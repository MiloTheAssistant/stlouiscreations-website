import { CREATIONS_DID_E164 } from "@/lib/telnyx/script";

export function normalizeE164(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (trimmed.startsWith("+") && digits.length >= 10) return `+${digits}`;
  return undefined;
}

export function isCreationsDid(value: unknown): boolean {
  return normalizeE164(value) === CREATIONS_DID_E164;
}

export function lockedFromNumber(value: unknown): string | undefined {
  return isCreationsDid(value) ? CREATIONS_DID_E164 : undefined;
}
