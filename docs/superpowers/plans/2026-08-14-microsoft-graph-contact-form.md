# Microsoft Graph Contact Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Formspree with a tested same-origin contact endpoint that sends quote requests through mailbox-scoped Microsoft Graph access to `contact@stlouiscreations.com`.

**Architecture:** The client posts a strict quote payload to a Next.js Route Handler. Focused contact modules validate and render the request, acquire an app-only token, and call Graph `sendMail`; Exchange then applies the existing server-side rule and moves the delivered message to `_StLouisCreations`. Microsoft 365 authorization comes only from Exchange Application RBAC scoped to the sender mailbox, never from an unscoped Entra `Mail.Send` grant.

**Tech Stack:** Next.js 14.2.35 App Router, React 18, TypeScript 5, Zod 4.3.6, Node's built-in test runner through `tsx`, Microsoft Graph REST, Exchange Online PowerShell, Vercel Production environment variables.

## Global Constraints

- Use red-green-refactor for every production behavior: write the focused test, run it and observe the expected failure, implement the minimum code, then rerun it.
- Add no Graph, MSAL, email, validation, or testing dependency; use the installed Zod package, native `fetch`, and `node:test`.
- Keep the recipient fixed in server code as `contact@stlouiscreations.com`; the browser may supply only quote fields and the visitor `Reply-To` address.
- Preserve all current form fields, product labels, analytics events, loading/success/error behavior, and the direct-email fallback.
- Accept only Graph HTTP `202 Accepted` as successful delivery submission.
- Never persist quote data or log complete submissions, access tokens, credential values, tenant output, or raw Graph error bodies.
- Keep `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET`, and `MS_FROM_EMAIL` server-only and Production-only in Vercel.
- Do not grant Microsoft Graph `Mail.Send` in Entra. Grant `Application Mail.Send` only through Exchange Application RBAC scoped to `Media@digitalenergymedia.com`.
- Do not modify the `contact@stlouiscreations.com` alias, the enabled Exchange rule, rule priority, `_StLouisCreations`, or existing folder contents.
- Do not remove `NEXT_PUBLIC_FORMSPREE_ENDPOINT` from Vercel until one controlled Production quote is found in `_StLouisCreations`.
- Every Microsoft 365 write, Vercel environment write/removal, Production deployment, test submission, and Git push requires its explicit action-time approval.

## File Map

- Create `lib/contact/quote-request.ts`: product allowlist, strict quote schema, subject builder, HTML escaping, and email renderer.
- Create `lib/microsoft-graph-mail.ts`: client-credentials token request, narrow safe errors, and Graph `sendMail` request.
- Create `lib/contact/contact-handler.ts`: HTTP guards, JSON parsing, quote validation, fixed routing, delivery invocation, and public responses.
- Create `app/api/contact/route.ts`: Node.js Route Handler that binds environment configuration and safe logging to the contact handler.
- Create `lib/contact/submit-quote-request.ts`: client-side same-origin submission helper.
- Modify `components/contact/QuoteForm.tsx`: consume the shared schema and submit through the helper.
- Create `tests/quote-request.test.ts`: quote contract and safe-rendering tests.
- Create `tests/microsoft-graph-mail.test.ts`: token and Graph boundary tests.
- Create `tests/contact-api.test.ts`: Route Handler behavior and fixed-routing tests.
- Create `tests/submit-quote-request.test.ts`: browser submission contract tests.
- Modify `package.json`: include all four new test files in the full test command.
- Modify `.env.example`: document the four server-only variable names with non-secret example values.
- Modify `README.md`: document the Graph delivery path and Production-only configuration boundary.

---

### Task 1: Strict Quote Contract and Safe Email Rendering

**Files:**
- Create: `lib/contact/quote-request.ts`
- Test: `tests/quote-request.test.ts`

**Interfaces:**
- Consumes: `z` from Zod and `siteConfig.url` from `lib/constants.ts`.
- Produces: `productTypes`, `quoteRequestSchema`, `QuoteRequest`, `quoteRequestSubject(productType)`, and `renderQuoteRequestHtml(data)`.

- [ ] **Step 1: Write the failing quote-contract tests**

Create `tests/quote-request.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the quote-contract test and verify RED**

Run:

```bash
node --import tsx --test tests/quote-request.test.ts
```

Expected: FAIL with module-not-found for `@/lib/contact/quote-request`.

- [ ] **Step 3: Implement the quote contract and renderer**

Create `lib/contact/quote-request.ts`:

```ts
import { z } from "zod";
import { siteConfig } from "@/lib/constants";

export const productTypes = [
  "Precision Laser Engraving",
  "3D Printing / Design Services",
  "Custom Design & Production",
  "Branded Drinkware",
  "Awards & Recognition",
  "Corporate Gifts",
  "Fundraiser Items",
  "Laser Cutting",
  "Other",
] as const;

export const quoteRequestSchema = z.strictObject({
  name: z.string().trim().min(2, "Name is required").max(120),
  company: z.string().trim().min(1, "Company name is required").max(160),
  email: z.string().trim().max(254).email("Valid email is required"),
  phone: z.string().trim().max(40).optional(),
  productType: z.enum(productTypes, { message: "Please select a product type" }),
  quantity: z.string().trim().min(1, "Estimated quantity is required").max(80),
  message: z
    .string()
    .trim()
    .min(10, "Please provide some project details")
    .max(5_000),
  website: z.literal("").optional(),
});

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function quoteRequestSubject(productType: QuoteRequest["productType"]) {
  return `St. Louis Creations quote request: ${productType}`;
}

export function renderQuoteRequestHtml(data: QuoteRequest) {
  const rows = [
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["Phone", data.phone || "Not provided"],
    ["Product type", data.productType],
    ["Estimated quantity", data.quantity],
    ["Project details", data.message],
    ["Source", `${siteConfig.url}/contact`],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #111827;">
      <h1 style="font-size: 22px;">New St. Louis Creations quote request</h1>
      <table style="border-collapse: collapse; width: 100%;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: 700; width: 170px;">${escapeHtml(label)}</td>
                <td style="border: 1px solid #e5e7eb; padding: 10px; white-space: pre-wrap;">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
    </div>
  `;
}
```

- [ ] **Step 4: Run the quote-contract test and verify GREEN**

Run:

```bash
node --import tsx --test tests/quote-request.test.ts
```

Expected: 3 tests PASS with no warnings.

- [ ] **Step 5: Commit the quote contract**

```bash
git add lib/contact/quote-request.ts tests/quote-request.test.ts
git commit -m "feat: validate and render quote requests"
```

---

### Task 2: Hardened Microsoft Graph Mail Boundary

**Files:**
- Create: `lib/microsoft-graph-mail.ts`
- Test: `tests/microsoft-graph-mail.test.ts`

**Interfaces:**
- Consumes: native `fetch`, Microsoft identity token endpoint, and Graph `sendMail`.
- Produces: `GraphMailConfig`, `GraphMailMessage`, `GraphMailError`, and `sendGraphMail(message, config, fetcher?)`.

- [ ] **Step 1: Write the failing Graph boundary tests**

Create `tests/microsoft-graph-mail.test.ts`:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import {
  GraphMailError,
  sendGraphMail,
  type GraphFetch,
} from "@/lib/microsoft-graph-mail";

const message = {
  to: "contact@stlouiscreations.com",
  replyTo: "visitor@example.com",
  subject: "St. Louis Creations quote request: Laser Cutting",
  html: "<p>Escaped quote</p>",
};

const config = {
  tenantId: "tenant/id",
  clientId: "client-id",
  clientSecret: "client-secret",
  fromEmail: "Media@digitalenergymedia.com",
};

test("rejects incomplete Graph configuration before making a request", async () => {
  let calls = 0;
  const fetcher: GraphFetch = async () => {
    calls += 1;
    return new Response(null, { status: 500 });
  };

  await assert.rejects(
    sendGraphMail(message, { ...config, clientSecret: "" }, fetcher),
    (error: unknown) =>
      error instanceof GraphMailError && error.stage === "configuration",
  );
  assert.equal(calls, 0);
});

test("requests an app token and sends the fixed Graph mail payload", async () => {
  const calls: Array<{ input: string; init?: RequestInit }> = [];
  const fetcher: GraphFetch = async (input, init) => {
    calls.push({ input, init });
    if (calls.length === 1) {
      return Response.json({ access_token: "test-access-token" });
    }
    return new Response(null, { status: 202 });
  };

  await sendGraphMail(message, config, fetcher);

  assert.equal(
    calls[0]?.input,
    "https://login.microsoftonline.com/tenant%2Fid/oauth2/v2.0/token",
  );
  const tokenBody = new URLSearchParams(String(calls[0]?.init?.body));
  assert.equal(tokenBody.get("client_id"), "client-id");
  assert.equal(tokenBody.get("client_secret"), "client-secret");
  assert.equal(tokenBody.get("grant_type"), "client_credentials");
  assert.equal(tokenBody.get("scope"), "https://graph.microsoft.com/.default");

  assert.equal(
    calls[1]?.input,
    "https://graph.microsoft.com/v1.0/users/Media%40digitalenergymedia.com/sendMail",
  );
  assert.equal(
    (calls[1]?.init?.headers as Record<string, string>).Authorization,
    "Bearer test-access-token",
  );
  assert.deepEqual(JSON.parse(String(calls[1]?.init?.body)), {
    message: {
      subject: message.subject,
      body: { contentType: "HTML", content: message.html },
      replyTo: [{ emailAddress: { address: "visitor@example.com" } }],
      toRecipients: [
        { emailAddress: { address: "contact@stlouiscreations.com" } },
      ],
    },
    saveToSentItems: true,
  });
});

test("rejects missing tokens and non-202 Graph responses without raw details", async () => {
  const rejectedTokenFetcher: GraphFetch = async () =>
    Response.json(
      {
        error: "invalid_client",
        error_description: "private credential details must not appear",
      },
      { status: 401 },
    );
  await assert.rejects(
    sendGraphMail(message, config, rejectedTokenFetcher),
    (error: unknown) => {
      assert.ok(error instanceof GraphMailError);
      assert.equal(error.stage, "token");
      assert.equal(error.status, 401);
      assert.equal(error.code, "invalid_client");
      assert.doesNotMatch(error.message, /private credential details/);
      return true;
    },
  );

  const missingTokenFetcher: GraphFetch = async () => Response.json({});
  await assert.rejects(
    sendGraphMail(message, config, missingTokenFetcher),
    (error: unknown) =>
      error instanceof GraphMailError &&
      error.stage === "token" &&
      error.code === "missing_access_token",
  );

  let call = 0;
  const rejectedSendFetcher: GraphFetch = async () => {
    call += 1;
    if (call === 1) {
      return Response.json({ access_token: "test-access-token" });
    }
    return Response.json(
      {
        error: {
          code: "ErrorAccessDenied",
          message: "private mailbox details must not appear",
        },
      },
      { status: 403 },
    );
  };

  await assert.rejects(
    sendGraphMail(message, config, rejectedSendFetcher),
    (error: unknown) => {
      assert.ok(error instanceof GraphMailError);
      assert.equal(error.stage, "send");
      assert.equal(error.status, 403);
      assert.equal(error.code, "ErrorAccessDenied");
      assert.doesNotMatch(error.message, /private mailbox details/);
      return true;
    },
  );
});

test("does not accept a Graph 200 response as sendMail success", async () => {
  let call = 0;
  const fetcher: GraphFetch = async () => {
    call += 1;
    return call === 1
      ? Response.json({ access_token: "test-access-token" })
      : Response.json({ id: "unexpected" }, { status: 200 });
  };

  await assert.rejects(
    sendGraphMail(message, config, fetcher),
    (error: unknown) => error instanceof GraphMailError && error.stage === "send",
  );
});
```

- [ ] **Step 2: Run the Graph test and verify RED**

Run:

```bash
node --import tsx --test tests/microsoft-graph-mail.test.ts
```

Expected: FAIL with module-not-found for `@/lib/microsoft-graph-mail`.

- [ ] **Step 3: Implement the Graph helper**

Create `lib/microsoft-graph-mail.ts`:

```ts
export type GraphMailConfig = {
  tenantId?: string;
  clientId?: string;
  clientSecret?: string;
  fromEmail?: string;
};

export type GraphMailMessage = {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
};

export type GraphFetch = (
  input: string,
  init?: RequestInit,
) => Promise<Response>;

export type GraphMailStage = "configuration" | "token" | "send";

export class GraphMailError extends Error {
  constructor(
    public readonly stage: GraphMailStage,
    public readonly status?: number,
    public readonly code?: string,
  ) {
    super(`Microsoft Graph mail failed during ${stage}.`);
    this.name = "GraphMailError";
  }
}

function requiredConfig(config: GraphMailConfig) {
  const tenantId = config.tenantId?.trim();
  const clientId = config.clientId?.trim();
  const clientSecret = config.clientSecret?.trim();
  const fromEmail = config.fromEmail?.trim();

  if (!tenantId || !clientId || !clientSecret || !fromEmail) {
    throw new GraphMailError("configuration");
  }

  return { tenantId, clientId, clientSecret, fromEmail };
}

function safeCode(value: unknown) {
  return typeof value === "string" && /^[A-Za-z0-9_.-]{1,100}$/.test(value)
    ? value
    : undefined;
}

async function responseErrorCode(response: Response) {
  try {
    const payload = (await response.json()) as {
      error?: string | { code?: unknown };
    };
    return safeCode(
      typeof payload.error === "string" ? payload.error : payload.error?.code,
    );
  } catch {
    return undefined;
  }
}

export async function sendGraphMail(
  message: GraphMailMessage,
  config: GraphMailConfig,
  fetcher: GraphFetch = (input, init) => fetch(input, init),
) {
  const resolved = requiredConfig(config);
  const tokenBody = new URLSearchParams({
    client_id: resolved.clientId,
    client_secret: resolved.clientSecret,
    grant_type: "client_credentials",
    scope: "https://graph.microsoft.com/.default",
  });

  const tokenResponse = await fetcher(
    `https://login.microsoftonline.com/${encodeURIComponent(resolved.tenantId)}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenBody,
    },
  );

  if (!tokenResponse.ok) {
    throw new GraphMailError(
      "token",
      tokenResponse.status,
      await responseErrorCode(tokenResponse),
    );
  }

  const tokenPayload = (await tokenResponse.json()) as { access_token?: unknown };
  if (
    typeof tokenPayload.access_token !== "string" ||
    tokenPayload.access_token.length === 0
  ) {
    throw new GraphMailError("token", tokenResponse.status, "missing_access_token");
  }

  const sendResponse = await fetcher(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(resolved.fromEmail)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenPayload.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: message.subject,
          body: { contentType: "HTML", content: message.html },
          replyTo: [{ emailAddress: { address: message.replyTo } }],
          toRecipients: [{ emailAddress: { address: message.to } }],
        },
        saveToSentItems: true,
      }),
    },
  );

  if (sendResponse.status !== 202) {
    throw new GraphMailError(
      "send",
      sendResponse.status,
      await responseErrorCode(sendResponse),
    );
  }
}
```

- [ ] **Step 4: Run the Graph test and verify GREEN**

Run:

```bash
node --import tsx --test tests/microsoft-graph-mail.test.ts
```

Expected: 4 tests PASS; no raw response content is printed.

- [ ] **Step 5: Commit the Graph boundary**

```bash
git add lib/microsoft-graph-mail.ts tests/microsoft-graph-mail.test.ts
git commit -m "feat: send contact mail with Microsoft Graph"
```

---

### Task 3: Same-Origin Contact Route Handler

**Files:**
- Create: `lib/contact/contact-handler.ts`
- Create: `app/api/contact/route.ts`
- Test: `tests/contact-api.test.ts`

**Interfaces:**
- Consumes: `quoteRequestSchema`, `quoteRequestSubject`, `renderQuoteRequestHtml`, `contactLinks.email`, `GraphMailMessage`, `GraphMailError`, and `sendGraphMail`.
- Produces: `MAX_CONTACT_BODY_BYTES`, `ContactFailure`, `createContactPostHandler(dependencies)`, and Next.js `POST(request)`.

- [ ] **Step 1: Write failing HTTP guard tests**

Start `tests/contact-api.test.ts` with:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_CONTACT_BODY_BYTES,
  createContactPostHandler,
  type ContactFailure,
} from "@/lib/contact/contact-handler";
import { GraphMailError, type GraphMailMessage } from "@/lib/microsoft-graph-mail";

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

function quoteRequest(
  body: string,
  headers: Record<string, string> = {},
) {
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
  for (const [index, request] of cases.entries()) {
    const response = await post(request);
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
```

- [ ] **Step 2: Run the contact API test and verify RED**

Run:

```bash
node --import tsx --test tests/contact-api.test.ts
```

Expected: FAIL with module-not-found for `@/lib/contact/contact-handler`.

- [ ] **Step 3: Implement the HTTP guards only**

Create this deliberately incomplete first version of `lib/contact/contact-handler.ts`. A valid request returns 503 for now, so the delivery behavior can receive its own failing test before implementation:

```ts
import { quoteRequestSchema } from "@/lib/contact/quote-request";
import type { GraphMailMessage } from "@/lib/microsoft-graph-mail";

export const MAX_CONTACT_BODY_BYTES = 32 * 1024;

export type ContactFailure = {
  stage: "configuration" | "token" | "send" | "unknown";
  status?: number;
  code?: string;
};

type ContactHandlerDependencies = {
  deliver(message: GraphMailMessage): Promise<void>;
  reportFailure?(failure: ContactFailure): void;
};

const invalidResponse = () =>
  Response.json({ error: "Invalid submission." }, { status: 400 });
const rejectedResponse = () =>
  Response.json({ error: "Submission rejected." }, { status: 403 });
const tooLargeResponse = () =>
  Response.json({ error: "Invalid submission." }, { status: 413 });
const unavailableResponse = () =>
  Response.json({ error: "Contact service unavailable." }, { status: 503 });

function isFilledHoneypot(payload: unknown) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }
  const website = (payload as Record<string, unknown>).website;
  return typeof website === "string" && website.trim().length > 0;
}

export function createContactPostHandler(
  _dependencies: ContactHandlerDependencies,
) {
  return async function post(request: Request) {
    const mediaType = request.headers
      .get("content-type")
      ?.split(";", 1)[0]
      ?.trim()
      .toLowerCase();
    if (mediaType !== "application/json") return invalidResponse();

    if (request.headers.get("origin") !== new URL(request.url).origin) {
      return rejectedResponse();
    }

    const declaredLength = request.headers.get("content-length");
    if (declaredLength !== null) {
      const parsedLength = Number(declaredLength);
      if (!Number.isSafeInteger(parsedLength) || parsedLength < 0) {
        return invalidResponse();
      }
      if (parsedLength > MAX_CONTACT_BODY_BYTES) return tooLargeResponse();
    }

    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch {
      return invalidResponse();
    }
    if (new TextEncoder().encode(rawBody).byteLength > MAX_CONTACT_BODY_BYTES) {
      return tooLargeResponse();
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return invalidResponse();
    }
    if (isFilledHoneypot(payload)) return rejectedResponse();
    if (!quoteRequestSchema.safeParse(payload).success) return invalidResponse();

    return unavailableResponse();
  };
}
```

- [ ] **Step 4: Run the guard tests and verify GREEN**

Run:

```bash
node --import tsx --test tests/contact-api.test.ts
```

Expected: 2 tests PASS.

- [ ] **Step 5: Add the failing success and safe-failure tests**

Append to `tests/contact-api.test.ts`:

```ts
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
  assert.doesNotMatch(JSON.stringify(failures), /Ada|ada@example|identification plates/);
});
```

- [ ] **Step 6: Run the contact API test and verify RED for delivery**

Run:

```bash
node --import tsx --test tests/contact-api.test.ts
```

Expected: the two guard tests PASS; the success and safe-failure tests FAIL because validation/delivery has not been implemented.

- [ ] **Step 7: Complete the contact handler**

Replace `lib/contact/contact-handler.ts` with:

```ts
import { contactLinks } from "@/lib/constants";
import {
  quoteRequestSchema,
  quoteRequestSubject,
  renderQuoteRequestHtml,
} from "@/lib/contact/quote-request";
import {
  GraphMailError,
  type GraphMailMessage,
} from "@/lib/microsoft-graph-mail";

export const MAX_CONTACT_BODY_BYTES = 32 * 1024;

export type ContactFailure = {
  stage: "configuration" | "token" | "send" | "unknown";
  status?: number;
  code?: string;
};

type ContactHandlerDependencies = {
  deliver(message: GraphMailMessage): Promise<void>;
  reportFailure?(failure: ContactFailure): void;
};

const invalidResponse = () =>
  Response.json({ error: "Invalid submission." }, { status: 400 });
const rejectedResponse = () =>
  Response.json({ error: "Submission rejected." }, { status: 403 });
const tooLargeResponse = () =>
  Response.json({ error: "Invalid submission." }, { status: 413 });
const unavailableResponse = () =>
  Response.json({ error: "Contact service unavailable." }, { status: 503 });

function isFilledHoneypot(payload: unknown) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }
  const website = (payload as Record<string, unknown>).website;
  return typeof website === "string" && website.trim().length > 0;
}

export function createContactPostHandler(
  dependencies: ContactHandlerDependencies,
) {
  return async function post(request: Request) {
    const mediaType = request.headers
      .get("content-type")
      ?.split(";", 1)[0]
      ?.trim()
      .toLowerCase();
    if (mediaType !== "application/json") return invalidResponse();

    if (request.headers.get("origin") !== new URL(request.url).origin) {
      return rejectedResponse();
    }

    const declaredLength = request.headers.get("content-length");
    if (declaredLength !== null) {
      const parsedLength = Number(declaredLength);
      if (!Number.isSafeInteger(parsedLength) || parsedLength < 0) {
        return invalidResponse();
      }
      if (parsedLength > MAX_CONTACT_BODY_BYTES) return tooLargeResponse();
    }

    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch {
      return invalidResponse();
    }
    if (new TextEncoder().encode(rawBody).byteLength > MAX_CONTACT_BODY_BYTES) {
      return tooLargeResponse();
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return invalidResponse();
    }
    if (isFilledHoneypot(payload)) return rejectedResponse();

    const parsed = quoteRequestSchema.safeParse(payload);
    if (!parsed.success) return invalidResponse();

    try {
      await dependencies.deliver({
        to: contactLinks.email,
        replyTo: parsed.data.email,
        subject: quoteRequestSubject(parsed.data.productType),
        html: renderQuoteRequestHtml(parsed.data),
      });
      return Response.json({ ok: true });
    } catch (error) {
      dependencies.reportFailure?.(
        error instanceof GraphMailError
          ? { stage: error.stage, status: error.status, code: error.code }
          : { stage: "unknown" },
      );
      return unavailableResponse();
    }
  };
}
```

- [ ] **Step 8: Add the thin Next.js route binding**

Create `app/api/contact/route.ts`:

```ts
import { createContactPostHandler } from "@/lib/contact/contact-handler";
import { sendGraphMail } from "@/lib/microsoft-graph-mail";

export const runtime = "nodejs";

const post = createContactPostHandler({
  deliver: (message) =>
    sendGraphMail(message, {
      tenantId: process.env.MS_TENANT_ID,
      clientId: process.env.MS_CLIENT_ID,
      clientSecret: process.env.MS_CLIENT_SECRET,
      fromEmail: process.env.MS_FROM_EMAIL,
    }),
  reportFailure: (failure) => {
    console.error("Contact delivery failed", failure);
  },
});

export async function POST(request: Request) {
  return post(request);
}
```

- [ ] **Step 9: Run the contact API test and verify GREEN**

Run:

```bash
node --import tsx --test tests/contact-api.test.ts
```

Expected: 4 tests PASS; delivery is fixed to `contact@stlouiscreations.com` and failure output contains no customer data.

- [ ] **Step 10: Commit the contact API**

```bash
git add app/api/contact/route.ts lib/contact/contact-handler.ts tests/contact-api.test.ts
git commit -m "feat: add secure contact form endpoint"
```

---

### Task 4: Client Submission and Quote Form Migration

**Files:**
- Create: `lib/contact/submit-quote-request.ts`
- Test: `tests/submit-quote-request.test.ts`
- Modify: `components/contact/QuoteForm.tsx:1-96`

**Interfaces:**
- Consumes: `QuoteRequest`, `quoteRequestSchema`, `productTypes`, native browser `fetch`, and existing analytics helpers.
- Produces: `submitQuoteRequest(data, fetcher?)` returning `Promise<boolean>` and a form that no longer reads `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.

- [ ] **Step 1: Write the failing client submission tests**

Create `tests/submit-quote-request.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the client submission test and verify RED**

Run:

```bash
node --import tsx --test tests/submit-quote-request.test.ts
```

Expected: FAIL with module-not-found for `@/lib/contact/submit-quote-request`.

- [ ] **Step 3: Implement the client submission helper**

Create `lib/contact/submit-quote-request.ts`:

```ts
import type { QuoteRequest } from "@/lib/contact/quote-request";

export type ContactFetch = (
  input: string,
  init?: RequestInit,
) => Promise<Response>;

export async function submitQuoteRequest(
  data: QuoteRequest,
  fetcher: ContactFetch = (input, init) => fetch(input, init),
) {
  const response = await fetcher("/api/contact", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.ok;
}
```

- [ ] **Step 4: Run the client submission test and verify GREEN**

Run:

```bash
node --import tsx --test tests/submit-quote-request.test.ts
```

Expected: 2 tests PASS.

- [ ] **Step 5: Migrate `QuoteForm` to the shared contract and helper**

In `components/contact/QuoteForm.tsx`:

1. Remove the local `z` import, local schema, local `FormData` type, and duplicated `productTypes` array.
2. Add:

```ts
import {
  productTypes,
  quoteRequestSchema,
  type QuoteRequest,
} from "@/lib/contact/quote-request";
import { submitQuoteRequest } from "@/lib/contact/submit-quote-request";
```

3. Change `useForm<FormData>` to `useForm<QuoteRequest>` and `zodResolver(schema)` to `zodResolver(quoteRequestSchema)`.
4. Replace `onSubmit` with:

```ts
const onSubmit = async (data: QuoteRequest) => {
  setStatus("loading");
  try {
    trackAnalyticsEvent(ANALYTICS_EVENTS.quoteFormSubmit, {
      productType: data.productType,
      quantity: data.quantity,
    });

    if (await submitQuoteRequest(data)) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  } catch {
    setStatus("error");
  }
};
```

5. Add this honeypot immediately inside `<motion.form>` before the visible grid:

```tsx
<div
  aria-hidden="true"
  className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
>
  <label htmlFor="quote-website">Website</label>
  <input
    id="quote-website"
    {...register("website")}
    tabIndex={-1}
    autoComplete="off"
  />
</div>
```

- [ ] **Step 6: Run focused tests and compile the migrated form**

Run:

```bash
node --import tsx --test tests/quote-request.test.ts tests/submit-quote-request.test.ts tests/contact-api.test.ts
./node_modules/.bin/tsc --noEmit
```

Expected: all focused tests PASS and TypeScript exits 0.

- [ ] **Step 7: Commit the client migration**

```bash
git add components/contact/QuoteForm.tsx lib/contact/submit-quote-request.ts tests/submit-quote-request.test.ts
git commit -m "feat: submit quotes through the contact API"
```

---

### Task 5: Repository Configuration, Documentation, and Full Verification

**Files:**
- Modify: `package.json:8-10`
- Modify: `.env.example`
- Modify: `README.md`

**Interfaces:**
- Consumes: all four new test files and the four Production environment variable names.
- Produces: a full test command that exercises the feature and durable non-secret setup documentation.

- [ ] **Step 1: Register the new tests in the full suite**

Replace the `test` script in `package.json` with:

```json
"test": "node --import tsx --test tests/local-search.test.ts tests/admin-jds-import.test.ts tests/analytics-events.test.ts tests/shop-category-navigation.test.ts tests/stripe-catalog-sync.test.ts tests/topic-hubs.test.ts tests/quote-request.test.ts tests/microsoft-graph-mail.test.ts tests/contact-api.test.ts tests/submit-quote-request.test.ts"
```

- [ ] **Step 2: Document server-only environment names**

Append to `.env.example`:

```dotenv
MS_TENANT_ID="00000000-0000-0000-0000-000000000000"
MS_CLIENT_ID="00000000-0000-0000-0000-000000000000"
MS_CLIENT_SECRET="set-only-in-vercel-production"
MS_FROM_EMAIL="Media@digitalenergymedia.com"
```

- [ ] **Step 3: Document the quote-delivery boundary**

Add this section before `## Learn More` in `README.md`:

```md
## Quote Delivery

The public quote form posts to the same-origin `/api/contact` Route Handler. Production sends the validated request through Microsoft Graph to `contact@stlouiscreations.com`; the existing Exchange rule moves delivered messages into `_StLouisCreations`.

The Graph application is authorized only through Exchange Application RBAC scoped to the sender mailbox. Do not grant tenant-wide Microsoft Graph `Mail.Send` in Entra.

Vercel Production requires these server-only variables: `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET`, and `MS_FROM_EMAIL`. Preview deployments intentionally do not receive them. Never prefix these variables with `NEXT_PUBLIC_` or commit their real values.
```

- [ ] **Step 4: Verify no application source still references Formspree**

Run:

```bash
rg -n "FORMSPREE|NEXT_PUBLIC_FORMSPREE_ENDPOINT" app components lib package.json .env.example
```

Expected: no matches and exit status 1.

- [ ] **Step 5: Run all repository checks**

Run each command separately and require exit status 0:

```bash
npm test
npm run lint
./node_modules/.bin/tsc --noEmit
npm run build
git diff --check
```

Expected: all tests pass, lint is clean, TypeScript is clean, the Next.js Production build completes, and the diff has no whitespace errors.

- [ ] **Step 6: Perform the scoped secret-hygiene review**

Run:

```bash
git status --short
git diff -- .env.example README.md package.json app/api/contact/route.ts components/contact/QuoteForm.tsx lib/contact tests
```

Inspect the diff without copying values into chat. Confirm:

- Only variable names and non-secret example values appear.
- No token, client-secret value, bearer header value, private key, `.env.local`, provider response, customer submission, or Vercel account output is present.
- `.vercel/` remains ignored and untracked.

- [ ] **Step 7: Run the focused manual browser check without Production credentials**

Run:

```bash
npm run dev -- -p 3001
```

At `http://localhost:3001/contact`, verify visible validation, keyboard navigation, submit loading, the generic unavailable state, and the direct `contact@stlouiscreations.com` fallback. Do not configure real Microsoft credentials locally and do not claim successful delivery from this check.

- [ ] **Step 8: Commit repository configuration and docs**

```bash
git add .env.example README.md package.json
git commit -m "docs: configure Graph quote delivery"
```

---

### Task 6: Provision Mailbox-Scoped Microsoft and Vercel Configuration

**Files:**
- No repository files. This task changes live Entra, Exchange Online, and Vercel Production configuration only after exact approval.

**Interfaces:**
- Consumes: Entra app name `St. Louis Creations Website`, sender `Media@digitalenergymedia.com`, Vercel project `stlouiscreations-website`, and four environment variable names.
- Produces: a 12-month app credential stored only in Vercel Production and an Exchange `Application Mail.Send` assignment that is true for the sender mailbox and false for another mailbox.

- [ ] **Step 1: Apply governance and secret-hygiene preflight**

Use `governance-review`, `m365-admin`, `vercel-control`, and `secret-hygiene`. State that this is a high-impact live write. Confirm the target tenant from the connected Microsoft context and the target Vercel project from `.vercel/project.json` without printing tenant, project, org, or credential identifiers into chat.

- [ ] **Step 2: Perform read-only collision and tool checks**

From the project directory:

```bash
vercel whoami
vercel env ls production
vercel env ls preview
vercel env ls development
```

In PowerShell, connect read-only first and check for collisions:

```powershell
Get-Module -ListAvailable Microsoft.Graph.Authentication,Microsoft.Graph.Applications
Get-Module -ListAvailable ExchangeOnlineManagement
Connect-MgGraph -Scopes "Application.Read.All"
Get-MgContext | Select-Object TenantId,Account,Scopes
Get-MgApplication -Filter "displayName eq 'St. Louis Creations Website'"
Connect-ExchangeOnline
Get-ManagementScope -Identity "St Louis Creations Website Mailbox" -ErrorAction SilentlyContinue
Get-ManagementRoleAssignment -Identity "St Louis Creations Website Mail.Send" -ErrorAction SilentlyContinue
```

Summarize only whether the expected tools, connections, app, scope, assignment, and four Vercel variable names exist. If any named object already exists, stop and reconcile it instead of creating a duplicate. If a required PowerShell module is absent, request approval before installing it.

- [ ] **Step 3: Present the exact live change for approval**

Request explicit approval for this single coordinated operation:

- Create Entra app and enterprise application `St. Louis Creations Website` with no Entra Graph API permissions.
- Create one `Vercel Production` client credential expiring 12 months after creation.
- Create Exchange service-principal pointer `St. Louis Creations Website`.
- Create Exchange management scope `St Louis Creations Website Mailbox` restricted to primary SMTP `Media@digitalenergymedia.com`.
- Create role assignment `St Louis Creations Website Mail.Send` using `Application Mail.Send` and that scope.
- Add `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET`, and `MS_FROM_EMAIL` to Vercel project `stlouiscreations-website`, Production only.
- Verify the sender is in scope and one other mailbox is out of scope.

State rollback: remove the role assignment, scope, Exchange service-principal pointer, app credential, and four Vercel variables. Removing the Entra app itself remains a separately approved destructive step.

- [ ] **Step 4: Create the dedicated app and credential without exposing the secret**

After approval, keep one PowerShell session open and run:

```powershell
Disconnect-MgGraph
Connect-MgGraph -Scopes "Application.ReadWrite.All"
$AppName = "St. Louis Creations Website"
$SenderMailbox = "Media@digitalenergymedia.com"
$ScopeName = "St Louis Creations Website Mailbox"
$AssignmentName = "St Louis Creations Website Mail.Send"
$App = New-MgApplication -DisplayName $AppName -SignInAudience "AzureADMyOrg"
$ServicePrincipal = New-MgServicePrincipal -AppId $App.AppId
$Credential = Add-MgApplicationPassword `
  -ApplicationId $App.Id `
  -PasswordCredential @{ `
    DisplayName = "Vercel Production"; `
    EndDateTime = (Get-Date).ToUniversalTime().AddMonths(12) `
  }
$TenantId = (Get-MgContext).TenantId
$ConfiguredApp = Get-MgApplication -ApplicationId $App.Id -Property RequiredResourceAccess
if ($ConfiguredApp.RequiredResourceAccess.Count -ne 0) {
  throw "The dedicated app unexpectedly has Entra API permissions."
}
```

Do not output `$Credential`, `$Credential.SecretText`, tokens, or raw application objects.

- [ ] **Step 5: Transfer the four values directly into Vercel Production**

In the same PowerShell session and project directory:

```powershell
$TenantId | vercel env add MS_TENANT_ID production
$App.AppId | vercel env add MS_CLIENT_ID production
$Credential.SecretText | vercel env add MS_CLIENT_SECRET production --sensitive
$SenderMailbox | vercel env add MS_FROM_EMAIL production
$CredentialKeyId = $Credential.KeyId
$CredentialEndDateTime = $Credential.EndDateTime
Remove-Variable Credential
vercel env ls production
```

Expected: Vercel lists all four names for Production and does not display values. If any variable already exists, stop before replacement and request approval for the exact replacement operation.

- [ ] **Step 6: Create and verify Exchange Application RBAC**

In the same PowerShell session:

```powershell
Connect-ExchangeOnline
New-ServicePrincipal `
  -AppId $App.AppId `
  -ObjectId $ServicePrincipal.Id `
  -DisplayName $AppName
New-ManagementScope `
  -Name $ScopeName `
  -RecipientRestrictionFilter "PrimarySmtpAddress -eq '$SenderMailbox'"
New-ManagementRoleAssignment `
  -Name $AssignmentName `
  -Role "Application Mail.Send" `
  -App $App.AppId `
  -CustomResourceScope $ScopeName
$Allowed = Test-ServicePrincipalAuthorization `
  -Identity $App.AppId `
  -Resource $SenderMailbox
$OtherMailbox = Get-EXOMailbox -ResultSize 20 | Where-Object {
  $_.PrimarySmtpAddress.ToString() -ne $SenderMailbox
} | Select-Object -First 1
if (-not $OtherMailbox) {
  throw "A second mailbox is required for the negative authorization check."
}
$Denied = Test-ServicePrincipalAuthorization `
  -Identity $App.AppId `
  -Resource $OtherMailbox.PrimarySmtpAddress
if (-not ($Allowed | Where-Object { $_.RoleName -eq "Application Mail.Send" -and $_.InScope })) {
  throw "The sender mailbox is not authorized for Application Mail.Send."
}
if ($Denied | Where-Object { $_.RoleName -eq "Application Mail.Send" -and $_.InScope }) {
  throw "An out-of-scope mailbox was unexpectedly authorized."
}
```

Report only the allowed/denied result, not the second mailbox address or broad directory output.

- [ ] **Step 7: Record rollback identifiers without secrets**

Keep the app ID, service-principal object ID, `$CredentialKeyId`, scope name, assignment name, and `$CredentialEndDateTime` in the approved admin work record. Assign rotation ownership to the Microsoft 365 administrator responsible for the `Media@digitalenergymedia.com` mailbox. Do not commit that record to this repository or paste it into chat.

- [ ] **Step 8: Retain the exact rollback recipe and end admin sessions**

Record these commands with the non-secret identifiers. Do not run them unless rollback receives explicit approval:

```powershell
Remove-ManagementRoleAssignment -Identity "St Louis Creations Website Mail.Send" -Confirm:$false
Remove-ManagementScope -Identity "St Louis Creations Website Mailbox" -Confirm:$false
Remove-ServicePrincipal -Identity $App.AppId -Confirm:$false
Remove-MgApplicationPassword -ApplicationId $App.Id -KeyId $CredentialKeyId
```

The corresponding Vercel rollback removes only the four Production variables:

```bash
vercel env rm MS_TENANT_ID production
vercel env rm MS_CLIENT_ID production
vercel env rm MS_CLIENT_SECRET production
vercel env rm MS_FROM_EMAIL production
```

Removing the Entra application or enterprise application is intentionally excluded and requires separate destructive-action approval. Disconnect the Graph and Exchange sessions after the approved work is verified.

---

### Task 7: Production Deployment, Mailbox Proof, and Formspree Retirement

**Files:**
- No source changes expected. This task deploys the reviewed commit and performs controlled production verification.

**Interfaces:**
- Consumes: verified repository checks, four Vercel Production variables, scoped Graph authorization, and the enabled Exchange rule.
- Produces: a verified Production deployment, one controlled quote in `_StLouisCreations`, and removal of the obsolete Production Formspree variable.

- [ ] **Step 1: Re-run the release preflight**

Run:

```bash
git status --short --branch
git log -6 --oneline
npm test
npm run lint
./node_modules/.bin/tsc --noEmit
npm run build
vercel env ls production
vercel env ls preview
vercel env ls development
```

Expected: clean worktree, all checks pass, and the four Microsoft variables appear under Production but not Preview or Development. Summarize names and environment only.

- [ ] **Step 2: Request explicit Production deployment approval**

Present the exact commit SHA, Vercel project `stlouiscreations-website`, Production target, expected effect, rollback deployment, and verification route `/contact`. State that no DNS, domain, mailbox rule, alias, or Formspree account change is included.

- [ ] **Step 3: Build and deploy the reviewed code to Production**

After approval:

```bash
vercel build --prod
vercel deploy --prebuilt --prod
```

Capture the public deployment URL without exposing private project metadata. Verify the deployment represents the reviewed commit and returns a healthy `/contact` page.

- [ ] **Step 4: Request confirmation for one controlled customer-form submission**

Before pressing the Production form's submit button, request action-time confirmation because the submission sends an external email. Use clearly synthetic but recognizable test values and no real customer data.

- [ ] **Step 5: Submit and verify the end-to-end route**

After confirmation:

1. Submit one quote at `https://www.stlouiscreations.com/contact`.
2. Confirm the page reaches the existing success state.
3. Use read-only Outlook inspection to confirm one matching message arrived at `contact@stlouiscreations.com` and is present in `_StLouisCreations`.
4. Confirm the existing rule is still enabled, remains fourth of nine, and still targets `_StLouisCreations`.
5. Inspect Vercel runtime logs only if the form fails; report safe stage/status/code metadata and never quote the submission or credentials.

- [ ] **Step 6: Request approval to remove the obsolete Formspree variable**

Present the exact destructive configuration operation: remove `NEXT_PUBLIC_FORMSPREE_ENDPOINT` from the Production environment of Vercel project `stlouiscreations-website`. State rollback: re-add the variable from the approved secret store and restore the previous deployment. The Formspree account and historical submissions remain untouched.

- [ ] **Step 7: Remove and verify the Production variable**

After approval:

```bash
vercel env rm NEXT_PUBLIC_FORMSPREE_ENDPOINT production
vercel env ls production
```

Expected: the Formspree variable name is absent; the four Microsoft variable names remain present. No redeployment is required because the deployed application no longer reads the removed variable.

- [ ] **Step 8: Request and perform the Git push**

Present the current branch, commit list, remote, and whether the connected Git integration will create another Production deployment. After approval, push the reviewed branch with a non-force push. If `main` is still the current branch:

```bash
git push origin main
```

Verify remote parity and, if Vercel creates another deployment, verify that deployment uses the same source commit and keeps `/contact` healthy.

- [ ] **Step 9: Final completion report**

Report:

- Focused and full test/build results.
- Deployed commit and verified public route.
- Mail delivery to `contact@stlouiscreations.com` and placement in `_StLouisCreations`.
- Mailbox-scoped authorization allowed/denied checks.
- Removal of the Production Formspree variable.
- Confirmation that no alias, rule, priority, folder, DNS, Formspree account, or historical submission changed.
- Credential expiration and rotation owner without exposing any identifier or secret value.
