import assert from "node:assert/strict";
import test from "node:test";
import {
  productTypes,
  quoteRequestSchema,
  quoteRequestSubject,
  renderQuoteRequestHtml,
  type QuoteRequest,
} from "@/lib/contact/quote-request";

const validQuote: QuoteRequest = {
  name: "Ada Lovelace",
  company: "Analytical Engines",
  email: "ada@example.com",
  phone: "314-555-0188",
  productType: "Laser Cutting",
  quantity: "24",
  message: "Please quote engraved identification plates for our equipment.",
  website: "",
};

test("normalizes a valid quote and accepts every displayed product type", () => {
  for (const productType of productTypes) {
    const parsed = quoteRequestSchema.parse({
      ...validQuote,
      name: "  Ada Lovelace  ",
      productType,
    });
    assert.equal(parsed.name, "Ada Lovelace");
    assert.equal(parsed.productType, productType);
  }
});

test("rejects invalid, unknown, overlong, and honeypot quote fields", () => {
  const invalidQuotes = [
    { ...validQuote, name: "" },
    { ...validQuote, company: "" },
    { ...validQuote, quantity: "" },
    { ...validQuote, email: "not-an-email" },
    { ...validQuote, productType: "Unlisted service" },
    { ...validQuote, message: "short" },
    { ...validQuote, name: "x".repeat(121) },
    { ...validQuote, company: "x".repeat(161) },
    { ...validQuote, email: `${"x".repeat(243)}@example.com` },
    { ...validQuote, phone: "x".repeat(41) },
    { ...validQuote, quantity: "x".repeat(81) },
    { ...validQuote, message: "x".repeat(5_001) },
    { ...validQuote, website: "https://spam.example" },
    { ...validQuote, recipient: "attacker@example.com" },
  ];

  for (const input of invalidQuotes) {
    assert.equal(quoteRequestSchema.safeParse(input).success, false);
  }
});

test("builds a fixed subject and escapes every rendered customer value", () => {
  const unsafeQuote: QuoteRequest = {
    ...validQuote,
    name: `<img src=x onerror="alert(1)">`,
    company: `A & B "Company"`,
    email: "ada+quotes@example.com",
    phone: "<script>alert(2)</script>",
    quantity: "10 < 20",
    message: "Use 'single quotes' & <b>no markup</b>.",
  };

  const html = renderQuoteRequestHtml(unsafeQuote);

  assert.equal(
    quoteRequestSubject("Laser Cutting"),
    "St. Louis Creations quote request: Laser Cutting",
  );
  assert.doesNotMatch(html, /<img|<script|<b>/);
  assert.match(html, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
  assert.match(html, /A &amp; B &quot;Company&quot;/);
  assert.match(html, /10 &lt; 20/);
  assert.match(html, /&#39;single quotes&#39; &amp; &lt;b&gt;no markup&lt;\/b&gt;/);
  assert.match(html, /https:\/\/www\.stlouiscreations\.com\/contact/);
});
