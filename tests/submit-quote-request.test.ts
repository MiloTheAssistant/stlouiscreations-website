import assert from "node:assert/strict";
import test from "node:test";
import { submitQuoteRequest } from "@/lib/contact/submit-quote-request";
import type { QuoteRequest } from "@/lib/contact/quote-request";

const quote: QuoteRequest = {
  name: "Ada Lovelace",
  company: "Analytical Engines",
  email: "ada@example.com",
  phone: "314-555-0188",
  productType: "Laser Cutting",
  quantity: "24",
  message: "Please quote engraved identification plates for our equipment.",
  website: "",
};

test("posts only quote JSON to the same-origin contact endpoint", async () => {
  let observed: { input: string; init?: RequestInit } | undefined;
  const sent = await submitQuoteRequest(quote, async (input, init) => {
    observed = { input, init };
    return Response.json({ ok: true });
  });

  assert.equal(sent, true);
  assert.equal(observed?.input, "/api/contact");
  assert.equal(observed?.init?.method, "POST");
  assert.deepEqual(observed?.init?.headers, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  assert.deepEqual(JSON.parse(String(observed?.init?.body)), quote);
  assert.equal("_replyto" in JSON.parse(String(observed?.init?.body)), false);
  assert.equal("_subject" in JSON.parse(String(observed?.init?.body)), false);
});

test("reports a non-success response without throwing", async () => {
  const sent = await submitQuoteRequest(
    quote,
    async () => Response.json({ error: "Unavailable" }, { status: 503 }),
  );
  assert.equal(sent, false);
});
