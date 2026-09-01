import { createPublicKey, verify } from "node:crypto";

export const TELNYX_SIGNATURE_TOLERANCE_MS = 5 * 60 * 1000;
const ED25519_SPKI_PREFIX = Buffer.from("302a300506032b6570032100", "hex");

export class TelnyxSignatureError extends Error {
  constructor(message = "Invalid Telnyx signature.") {
    super(message);
    this.name = "TelnyxSignatureError";
  }
}

function ed25519PublicKeyFromBase64(publicKeyB64: string) {
  const raw = Buffer.from(publicKeyB64, "base64");
  if (raw.length !== 32) {
    throw new TelnyxSignatureError();
  }

  return createPublicKey({
    key: Buffer.concat([ED25519_SPKI_PREFIX, raw]),
    format: "der",
    type: "spki",
  });
}

export function verifyTelnyxSignature(options: {
  publicKey: string;
  rawBody: string;
  signature: string | null;
  timestamp: string | null;
  nowMs?: number;
}): boolean {
  const publicKey = options.publicKey.trim();
  const signature = options.signature?.trim() ?? "";
  const timestamp = options.timestamp?.trim() ?? "";
  if (!publicKey || !signature || !timestamp) return false;

  const timestampSeconds = Number(timestamp);
  if (!Number.isFinite(timestampSeconds)) return false;

  const ageMs = Math.abs((options.nowMs ?? Date.now()) - timestampSeconds * 1000);
  if (ageMs > TELNYX_SIGNATURE_TOLERANCE_MS) return false;

  let key: ReturnType<typeof createPublicKey>;
  let signatureBytes: Buffer;
  try {
    key = ed25519PublicKeyFromBase64(publicKey);
    signatureBytes = Buffer.from(signature, "base64");
  } catch {
    return false;
  }
  if (signatureBytes.length !== 64) return false;

  try {
    return verify(
      null,
      Buffer.from(`${timestamp}|${options.rawBody}`, "utf8"),
      key,
      signatureBytes,
    );
  } catch {
    return false;
  }
}
