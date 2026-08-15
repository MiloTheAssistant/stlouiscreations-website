# Microsoft Graph Contact Form Design

Status: Approved on 2026-08-14

## Summary

Replace the public quote form's Formspree submission with a same-origin Next.js Route Handler deployed on Vercel. The handler validates the quote, renders a safe email, acquires an app-only Microsoft token, and calls Microsoft Graph `sendMail` so the message is delivered to `contact@stlouiscreations.com`. The existing enabled Exchange rule remains responsible for moving the delivered message into `_StLouisCreations`.

The implementation will follow the proven direct-REST Graph helper used in the Digital Energy Media and Digital Energy Holdings projects. STL-Lawns itself currently uses a `mailto:` handoff and is not the Graph reference implementation.

## Goals

- Remove Formspree from the live quote-submission path.
- Deliver every accepted website quote to `contact@stlouiscreations.com`.
- Preserve the existing Exchange inbox rule and `_StLouisCreations` folder.
- Keep Microsoft credentials server-only.
- Restrict the website application to sending from only the mailbox that owns the St. Louis Creations contact alias.
- Preserve the current form fields, analytics events, and success/error experience.
- Provide automated tests for validation, rendering, routing, Graph requests, and failure behavior.

## Non-goals

- Do not change aliases, mailbox rules, rule priority, or folder contents.
- Do not store quote submissions in the website database.
- Do not send a customer confirmation email.
- Do not delete the Formspree account or historical Formspree submissions.
- Do not grant tenant-wide Microsoft Graph mail permissions.
- Do not configure Graph credentials for Vercel Preview deployments.
- Do not deploy or remove the existing Formspree environment variable until the new production path has been verified end to end.

## Selected Approach

Use a Next.js App Router `POST /api/contact` Route Handler and direct `fetch` calls to the Microsoft identity platform and Microsoft Graph. This matches the existing internal Graph pattern, avoids an additional SDK dependency, and creates a clear server-side trust boundary for the current client-side form.

Rejected alternatives:

- Microsoft Graph JavaScript SDK or MSAL: unnecessary dependencies for one token request and one Graph request.
- Server Action: viable, but replacing the current JSON submission with a Route Handler is a smaller UI change and yields a straightforward HTTP contract for tests.
- Resend or another transactional provider: not required because the selected delivery path is Microsoft Graph.

## Architecture and Components

### Shared quote contract

Create a focused quote-request module that exports the strict Zod schema, TypeScript type, product-type allowlist, and HTML renderer. Both the client and server use the same field constraints, but the server remains authoritative.

Accepted fields and limits:

| Field | Rule |
| --- | --- |
| `name` | Trimmed, 2-120 characters |
| `company` | Trimmed, 1-160 characters |
| `email` | Trimmed valid email, maximum 254 characters |
| `phone` | Optional trimmed string, maximum 40 characters |
| `productType` | One of the existing displayed product types |
| `quantity` | Trimmed, 1-80 characters |
| `message` | Trimmed, 10-5,000 characters |
| `website` | Honeypot; must be absent or empty |

The schema is strict: unknown fields are rejected. Every customer-controlled value is HTML-escaped before insertion into the email body.

### Client form

Update `components/contact/QuoteForm.tsx` to submit JSON to `/api/contact`. Keep the existing loading, success, error, reset, and analytics behavior. Add an inaccessible-to-normal-users honeypot input named `website`; it must not affect keyboard or screen-reader navigation.

The browser sends quote fields only. It does not send the destination address, Graph sender, arbitrary subject, or credentials.

### Contact Route Handler

Add `app/api/contact/route.ts` with the Node.js runtime. The handler:

1. Requires `Content-Type: application/json`.
2. Rejects a declared body larger than 32 KiB before reading, then rejects the actual UTF-8 body if it exceeds 32 KiB even when `Content-Length` is absent or inaccurate.
3. Requires the request `Origin` to match the request URL origin.
4. Parses the JSON body and validates it with the strict quote schema.
5. Rejects a filled honeypot without calling Graph.
6. Builds a fixed subject beginning with `St. Louis Creations quote request:`.
7. Renders an escaped HTML table containing the quote details and source page.
8. Calls the Graph mail helper with a fixed recipient of `contact@stlouiscreations.com` and the visitor email as `Reply-To`.
9. Returns success only after Graph responds with `202 Accepted`.

Responses:

| Condition | Status | Public response |
| --- | --- | --- |
| Accepted by Graph | 200 | `{ "ok": true }` |
| Invalid content type or schema | 400 | Generic invalid-submission response |
| Oversized request | 413 | Generic invalid-submission response |
| Origin mismatch or filled honeypot | 403 | Generic rejected-submission response |
| Missing server configuration | 503 | Generic unavailable response |
| Token or Graph failure | 503 | Generic unavailable response |

No response exposes Microsoft status details, configuration values, or customer data.

### Microsoft Graph helper

Add `lib/microsoft-graph-mail.ts`, adapted from the hardened Digital Energy Media helper. It:

- Requires non-empty tenant ID, client ID, client secret, and sender mailbox configuration.
- Requests an app-only token using OAuth client credentials and `https://graph.microsoft.com/.default`.
- URL-encodes the tenant and sender identifiers used in endpoint paths.
- Calls `POST /v1.0/users/{sender}/sendMail`.
- Sets one fixed `toRecipient`, the visitor as `replyTo`, an HTML body, and `saveToSentItems: true`.
- Accepts only Graph `202 Accepted` as success.
- Converts Graph errors into a narrow internal stage/status/code error without returning the raw response body.

The access token exists only in memory for the duration of the request and is never logged or returned.

## Data Flow

1. A visitor submits the quote form on `stlouiscreations.com`.
2. The browser posts JSON to the same-origin `/api/contact` endpoint.
3. The route validates the request and renders safe email content.
4. The Vercel Function reads server-only Microsoft configuration.
5. The helper obtains an app-only token and calls Graph `sendMail` as the configured Microsoft 365 mailbox.
6. Graph sends the message to `contact@stlouiscreations.com` with the visitor as `Reply-To`.
7. Exchange delivers the message and the existing header rule moves it to `_StLouisCreations`.
8. The form shows success after Graph accepts the send request.

Graph `202 Accepted` proves only that Microsoft accepted the send operation. Production completion additionally requires confirming the message arrived in `_StLouisCreations`.

## Abuse and Security Controls

- Validate independently on the server even though the client uses the same schema.
- Use a fixed recipient and fixed subject prefix; never honor client-supplied routing fields.
- Escape all values inserted into HTML.
- Enforce content type, declared and actual body size, same-origin, strict field limits, and a honeypot.
- Do not persist quote data or log complete submissions.
- Log only a safe failure stage, HTTP status, and Microsoft error code when available.
- Keep credentials out of `NEXT_PUBLIC_*`, source control, local reports, and chat.
- Configure Microsoft credentials only for Vercel Production. Preview deployments fail closed with the existing direct-email fallback in the UI.
- Treat hosting-level rate limiting as a follow-up control if observed traffic shows abuse; do not claim the application-level controls provide distributed rate limiting.

## Microsoft 365 Authorization Design

Target objects:

- Entra application display name: `St. Louis Creations Website`
- Sender resource: the Microsoft 365 mailbox whose primary identity is `Media@digitalenergymedia.com`
- Delivery alias: `contact@stlouiscreations.com`
- Exchange application role: `Application Mail.Send`

The dedicated application uses Exchange Online RBAC for Applications as the sole `Mail.Send` authorization source:

1. Create the Entra app registration and its home-tenant enterprise application.
2. Do **not** grant Microsoft Graph `Mail.Send` application permission in Entra and do not grant tenant-wide Graph admin consent.
3. Create one 12-month client credential and record its rotation date outside the repository.
4. Register the enterprise application's service-principal pointer in Exchange Online using the enterprise application object ID, not the app-registration object ID.
5. Create a management scope restricted to the sender mailbox's primary SMTP address.
6. Assign `Application Mail.Send` to the application with that custom resource scope.
7. Verify `Test-ServicePrincipalAuthorization` reports the sender mailbox in scope.
8. Verify a different tenant mailbox is out of scope.
9. Perform a Graph send test only after both authorization checks pass.

Microsoft documents that Entra permissions and Exchange Application RBAC assignments are additive. Granting unscoped Entra `Mail.Send` would defeat the mailbox restriction, so the design intentionally omits that Entra permission. Reference: <https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac>.

## Vercel Configuration

Production-only server variables:

- `MS_TENANT_ID`
- `MS_CLIENT_ID`
- `MS_CLIENT_SECRET`
- `MS_FROM_EMAIL`

`MS_FROM_EMAIL` contains the actual Microsoft 365 sender mailbox identity. The destination is fixed in server code from the site's public contact constant rather than configured through a mutable public variable.

No Microsoft variable may use a `NEXT_PUBLIC_` prefix. `.env*.local` remains ignored for optional local manual testing, and real values must never be added to `.env.example` or committed files.

## Error Handling and Observability

- The client retains its current generic error message and direct-email fallback.
- Validation and abuse rejections do not call the token or Graph endpoints.
- Configuration failures fail closed and do not attempt partial delivery.
- Token and Graph failures return 503 and log only safe diagnostic metadata.
- Customer names, email addresses, phone numbers, companies, and message bodies are not written to application logs.
- The successful route response contains no Graph message identifier or internal configuration.

## Test Strategy

Implementation follows red-green-refactor. Each behavior receives a failing test before production code.

Unit tests:

- Accept every valid product type and normalized valid quote.
- Reject unknown fields, invalid email, invalid product type, empty required fields, overlong values, and a filled honeypot.
- Escape markup and HTML attributes in every rendered customer field.
- Reject incomplete Graph configuration.
- Request a token with client credentials and the Graph `.default` scope.
- Send to the configured Graph sender endpoint with the fixed recipient and correct `Reply-To`.
- Reject token failures, missing access tokens, and Graph responses other than 202 without exposing raw response bodies.

Route tests:

- Reject wrong content type, oversized requests with and without `Content-Length`, origin mismatches, invalid JSON, invalid schema data, and honeypot submissions before any delivery call.
- Return 200 only when the delivery dependency succeeds.
- Return a generic 503 when configuration or delivery fails.

Verification:

- Run the focused new tests after each red-green cycle.
- Run the full repository test suite, lint, TypeScript/build checks, and `git diff --check`.
- Verify the local form's validation, loading, error, keyboard, and direct-email fallback behavior. The controlled production drill verifies the successful delivery state.
- After deployment, submit one controlled production quote and confirm it appears in `_StLouisCreations`.

## Production Change Plan and Approval Boundaries

Local code and tests may be implemented after this specification and its implementation plan are approved. Each live provider change remains separately gated.

Before Microsoft 365 writes, present the exact app, service principal, management scope, role assignment, credential lifetime, verification commands, and rollback commands for explicit approval. Creating the app, credential, Exchange service-principal pointer, management scope, and role assignment are production writes.

Before Vercel writes, present the exact project, environment variable names, target environment, and deployment operation for explicit approval. Secret values are entered or transferred only through approved provider interfaces and are never printed.

The Formspree variable is removed only after the deployed Graph path and mailbox-folder routing are confirmed. The Formspree account and historical data remain untouched.

## Rollback

- Application rollback: restore the Formspree variable first if it was already removed, then restore the previous known-good Vercel deployment so the Formspree code path is configured when it resumes.
- Vercel rollback: remove or disable the four Microsoft variables after the application rollback if requested.
- Microsoft rollback: remove the scoped role assignment, management scope, Exchange service-principal pointer, and client credential; remove the dedicated Entra app only with separate destructive-action approval.
- Mailbox rollback: none expected because the alias, rule, priority, folder identity, and folder contents are unchanged.

## Completion Criteria

- All focused and full repository checks pass.
- No secret value is present in tracked or untracked repository changes intended for commit.
- Exchange authorization is true for the sender mailbox and false for another mailbox.
- Production Vercel has the four server-only variables.
- The deployed form no longer calls Formspree.
- One controlled production quote is accepted by the website, arrives at `contact@stlouiscreations.com`, and is found in `_StLouisCreations`.
- The existing Exchange rule remains enabled and unchanged.
- Only after these checks is the Formspree endpoint variable removed from the Vercel project.
