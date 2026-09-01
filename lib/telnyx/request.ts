export const MAX_TELNYX_BODY_BYTES = 64 * 1024;

export type TelnyxBodyRead =
  | { ok: true; rawBody: string }
  | { ok: false; status: 400 | 413 };

function mediaType(contentType: string | null) {
  return contentType?.split(";", 1)[0]?.trim().toLowerCase() ?? "";
}

export async function readTelnyxRawBody(request: Request): Promise<TelnyxBodyRead> {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null) {
    const parsedLength = Number(declaredLength);
    if (!Number.isSafeInteger(parsedLength) || parsedLength < 0) {
      return { ok: false, status: 400 };
    }
    if (parsedLength > MAX_TELNYX_BODY_BYTES) return { ok: false, status: 413 };
  }

  if (!request.body) return { ok: true, rawBody: "" };

  let reader: ReadableStreamDefaultReader<Uint8Array>;
  try {
    reader = request.body.getReader();
  } catch {
    return { ok: false, status: 400 };
  }

  const chunks: Uint8Array[] = [];
  let bodyLength = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      if (value.byteLength > MAX_TELNYX_BODY_BYTES - bodyLength) {
        void reader.cancel().catch(() => undefined);
        return { ok: false, status: 413 };
      }

      chunks.push(value);
      bodyLength += value.byteLength;
    }
  } catch {
    return { ok: false, status: 400 };
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(bodyLength);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return { ok: true, rawBody: new TextDecoder().decode(bytes) };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function firstDefined(
  record: Record<string, unknown>,
  keys: string[],
): unknown {
  for (const key of keys) {
    if (key in record && record[key] !== undefined && record[key] !== null) {
      return record[key];
    }
  }
  return undefined;
}

function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseMaybeJson(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (
    !(trimmed.startsWith("{") && trimmed.endsWith("}")) &&
    !(trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    return value;
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
}

export function parseTelnyxCallback(
  rawBody: string,
  contentType: string | null,
  requestUrl: string,
): Record<string, unknown> {
  const params: Record<string, unknown> = {};
  const query = new URL(requestUrl).searchParams;
  query.forEach((value, key) => {
    params[key] = value;
  });

  const media = mediaType(contentType);
  if (media === "application/json" && rawBody.trim()) {
    const parsed = parseMaybeJson(rawBody);
    const record = asRecord(parsed);
    if (record) Object.assign(params, record);
    return params;
  }

  if (rawBody) {
    const form = new URLSearchParams(rawBody);
    form.forEach((value, key) => {
      params[key] = value;
    });
  }

  return params;
}

export function callbackString(
  payload: Record<string, unknown>,
  keys: string[],
): string | undefined {
  return asNonEmptyString(firstDefined(payload, keys));
}

export function callbackResult(payload: Record<string, unknown>): Record<string, unknown> {
  const nestedEvent = asRecord(payload.data);
  const nestedPayload = asRecord(nestedEvent?.payload) ?? asRecord(payload.payload);
  const candidates = [
    firstDefined(payload, ["Result", "result", "AIGatherResult", "MessageResult"]),
    nestedPayload ? firstDefined(nestedPayload, ["result", "Result"]) : undefined,
  ];

  for (const candidate of candidates) {
    const parsed = parseMaybeJson(candidate);
    const record = asRecord(parsed);
    if (record) return record;
  }

  return {};
}

export function callbackStatus(payload: Record<string, unknown>): string | undefined {
  const nestedEvent = asRecord(payload.data);
  const nestedPayload = asRecord(nestedEvent?.payload) ?? asRecord(payload.payload);
  return asNonEmptyString(
    firstDefined(payload, ["Status", "status", "GatherStatus", "AIGatherStatus"]) ??
      (nestedPayload
        ? firstDefined(nestedPayload, ["status", "Status"])
        : undefined),
  )?.toLowerCase();
}

export function callbackCallId(payload: Record<string, unknown>): string | undefined {
  const nestedEvent = asRecord(payload.data);
  const nestedPayload = asRecord(nestedEvent?.payload) ?? asRecord(payload.payload);
  return (
    callbackString(payload, ["CallSid", "CallSidLegacy", "call_control_id", "callId"]) ??
    (nestedPayload
      ? callbackString(nestedPayload, [
          "call_control_id",
          "CallSid",
          "call_leg_id",
          "call_session_id",
        ])
      : undefined)
  );
}
