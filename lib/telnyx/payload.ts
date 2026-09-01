export type VoicemailLeadStatus = "gathered" | "voicemail";

export type VoicemailLeadPayload = {
  name: string | null;
  phone: string | null;
  email: string | null;
  callId: string | null;
  recordingUrl: string | null;
  status: VoicemailLeadStatus;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function cleanEmail(value: unknown): string | null {
  const email = cleanText(value);
  if (!email) return null;
  return EMAIL_PATTERN.test(email) ? email : null;
}

export function cleanPhone(value: unknown): string | null {
  const phone = cleanText(value);
  if (!phone) return null;
  return /\d/.test(phone) ? phone : null;
}

export function cleanName(value: unknown): string | null {
  const name = cleanText(value);
  return name && name.length >= 2 ? name : null;
}

export function buildVoicemailLeadPayload(input: {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  callId?: unknown;
  recordingUrl?: unknown;
  status: VoicemailLeadStatus;
}): VoicemailLeadPayload {
  return {
    name: cleanName(input.name),
    phone: cleanPhone(input.phone),
    email: cleanEmail(input.email),
    callId: cleanText(input.callId),
    recordingUrl: cleanText(input.recordingUrl),
    status: input.status,
  };
}

export function hasGatheredLead(payload: VoicemailLeadPayload): boolean {
  return Boolean(payload.name && payload.phone && payload.email);
}
