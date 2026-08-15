import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_CONTACT_BODY_BYTES,
  createContactPostHandler,
  type ContactFailure,
} from "@/lib/contact/contact-handler";
import {
  GraphMailError,
  type GraphMailMessage,
} from "@/lib/microsoft-graph-mail";

const origin = "https://www.stlouiscreations.com";
const validQuote = {
  name: "Ada Lovelace",
  company: "Analytical Engines",
  email: "ada@example.com",
  phone: "314-555-0188",
  productType: "Laser Cutting",
  quantity: "24",
  message: "Please quote engraved identification plates for our equipment.",
  website: "",
};

function quoteRequest(body: string, headers: Record<string, string> = {}) {
  return new Request(`${origin}/api/contact`, {
    method: "POST",
    headers: {
      origin,
      "content-type": "application/json",
      ...headers,
    },
    body,
  });
}

test("rejects invalid request boundaries before delivery", async () => {
  const deliveries: GraphMailMessage[] = [];
  const post = createContactPostHandler({
    deliver: async (message) => {
      deliveries.push(message);
    },
  });

  const cases = [
    new Request(`${origin}/api/contact`, {
      method: "POST",
      headers: { origin, "content-type": "text/plain" },
      body: JSON.stringify(validQuote),
    }),
    quoteRequest(JSON.stringify(validQuote), {
      origin: "https://attacker.example",
    }),
    quoteRequest("{invalid-json"),
    quoteRequest(JSON.stringify({ ...validQuote, recipient: "attacker@example.com" })),
    quoteRequest(JSON.stringify({ ...validQuote, website: "https://spam.example" })),
  ];

  const expectedStatuses = [400, 403, 400, 400, 403];
  for (let index = 0; index < cases.length; index += 1) {
    const response = await post(cases[index]!);
    assert.equal(response.status, expectedStatuses[index]);
  }
  assert.equal(deliveries.length, 0);
});

test("rejects declared and actual bodies larger than 32 KiB", async () => {
  const post = createContactPostHandler({ deliver: async () => undefined });

  const declared = await post(
    quoteRequest(JSON.stringify(validQuote), {
      "content-length": String(MAX_CONTACT_BODY_BYTES + 1),
    }),
  );
  assert.equal(declared.status, 413);

  const actualRequest = quoteRequest(
    JSON.stringify({
      ...validQuote,
      message: "x".repeat(MAX_CONTACT_BODY_BYTES),
    }),
  );
  assert.equal(actualRequest.headers.has("content-length"), false);
  const actual = await post(actualRequest);
  assert.equal(actual.status, 413);
});

test("stops an oversized stream before consuming its remaining body", async () => {
  let deliveries = 0;
  let emittedChunks = 0;
  let cancelled = false;
  const chunks = [
    new Uint8Array(MAX_CONTACT_BODY_BYTES),
    new Uint8Array([0]),
    new Uint8Array([0]),
  ];
  const body = new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        if (emittedChunks === chunks.length) {
          controller.close();
          return;
        }
        controller.enqueue(chunks[emittedChunks]!);
        emittedChunks += 1;
      },
      cancel() {
        cancelled = true;
      },
    },
    { highWaterMark: 0 },
  );
  const post = createContactPostHandler({
    deliver: async () => {
      deliveries += 1;
    },
  });
  const request = new Request(`${origin}/api/contact`, {
    method: "POST",
    headers: {
      origin,
      "content-type": "application/json",
    },
    body,
    duplex: "half",
  });

  assert.equal(request.headers.has("content-length"), false);
  const response = await post(request);

  assert.equal(response.status, 413);
  assert.equal(cancelled, true);
  assert.equal(emittedChunks, 2);
  assert.equal(deliveries, 0);
});

test("routes a valid quote only to the public contact address", async () => {
  const deliveries: GraphMailMessage[] = [];
  const post = createContactPostHandler({
    deliver: async (message) => {
      deliveries.push(message);
    },
  });

  const response = await post(quoteRequest(JSON.stringify(validQuote)));

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(deliveries.length, 1);
  assert.equal(deliveries[0]?.to, "contact@stlouiscreations.com");
  assert.equal(deliveries[0]?.replyTo, "ada@example.com");
  assert.equal(
    deliveries[0]?.subject,
    "St. Louis Creations quote request: Laser Cutting",
  );
  assert.match(deliveries[0]?.html || "", /Ada Lovelace/);
  assert.equal("recipient" in validQuote, false);
});

test("accepts the canonical forwarded origin when it matches the browser origin", async () => {
  const deliveries: GraphMailMessage[] = [];
  const post = createContactPostHandler({
    deliver: async (message) => {
      deliveries.push(message);
    },
  });
  const request = new Request("http://internal-router/api/contact", {
    method: "POST",
    headers: {
      origin,
      "content-type": "application/json",
      "x-forwarded-host": "www.stlouiscreations.com",
      "x-forwarded-proto": "https",
    },
    body: JSON.stringify(validQuote),
  });

  const response = await post(request);

  assert.equal(response.status, 200);
  assert.equal(deliveries.length, 1);
});

test("returns a generic 503 and reports only safe Graph metadata", async () => {
  const failures: ContactFailure[] = [];
  const post = createContactPostHandler({
    deliver: async () => {
      throw new GraphMailError("send", 403, "ErrorAccessDenied");
    },
    reportFailure: (failure) => failures.push(failure),
  });

  const response = await post(quoteRequest(JSON.stringify(validQuote)));

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    error: "Contact service unavailable.",
  });
  assert.deepEqual(failures, [
    { stage: "send", status: 403, code: "ErrorAccessDenied" },
  ]);
  assert.doesNotMatch(
    JSON.stringify(failures),
    /Ada|ada@example|identification plates/,
  );
});

test("rejects malformed or ambiguous forwarded origin metadata before delivery", async () => {
  const deliveries: GraphMailMessage[] = [];
  const post = createContactPostHandler({
    deliver: async (message) => {
      deliveries.push(message);
    },
  });

  const response = await post(
    quoteRequest(JSON.stringify(validQuote), {
      "x-forwarded-host": "www.stlouiscreations.com, internal-router",
      "x-forwarded-proto": "https",
    }),
  );

  assert.equal(response.status, 403);
  assert.equal(deliveries.length, 0);
});

test("rejects matching attacker-controlled forwarded origins before delivery", async () => {
  const deliveries: GraphMailMessage[] = [];
  const post = createContactPostHandler({
    deliver: async (message) => {
      deliveries.push(message);
    },
  });
  const attackerOrigin = "https://attacker.example";
  const request = new Request("http://internal-router/api/contact", {
    method: "POST",
    headers: {
      origin: attackerOrigin,
      "content-type": "application/json",
      "x-forwarded-host": "attacker.example",
      "x-forwarded-proto": "https",
    },
    body: JSON.stringify(validQuote),
  });

  const response = await post(request);

  assert.equal(response.status, 403);
  assert.equal(deliveries.length, 0);
});
