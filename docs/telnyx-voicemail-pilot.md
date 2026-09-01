# Telnyx 24x7 AI Gather voicemail — operator note (John)

Inbound TeXML for **+13143500006** only. Do not merge. Do not deploy. Do not buy numbers. Do not raise the existing $5 auto-recharge. Do not install or use Twilio. Do not assign this app to any other number.

## Paste into Telnyx Mission Control

1. Create (or open) a **TeXML application**. Voice method: **POST**.
2. **Webhook URL** (inbound TeXML fetch): `https://www.stlouiscreations.com/api/telnyx/voice`
3. Bind that TeXML / Voice app to **+13143500006 only**.
4. Leave the gather and record action URLs alone; the app returns them:
   - Gather callback: `https://www.stlouiscreations.com/api/telnyx/gather`
   - Record action (single lead-delivery path; no `recordingStatusCallback`): `https://www.stlouiscreations.com/api/telnyx/record`
5. Copy the account **Public Key** (Keys & Credentials) for Vercel. Do not paste secret values into git.

## Paste into Vercel env (names + purpose, no secret values)

| Name | Value / purpose |
| --- | --- |
| `TELNYX_FROM_NUMBER` | `+13143500006` — Creations DID this inbound app answers. |
| `TELNYX_PUBLIC_KEY` | Mission Control Ed25519 public key. Verifies inbound Telnyx signatures. |
| `TELNYX_API_KEY` | Mission Control API key. Server-only; keep it out of git and the browser. |
| `TELNYX_WEBHOOK_URL` | HTTPS URL for the structured JSON lead body (Milo → HubSpot + a note to `contact@stlouiscreations.com`). If this is unset and nothing injects `deliverLead`, a successful AI Gather is a **config failure**: we do not play the success line or discard the lead as delivered. The call fails over to voicemail instead. Failover Record still hangs up without promising a follow-up. |

`TELNYX_FROM_NUMBER=+13143500006` is required. The handler answers that DID only.

## Call flow (locked STL Creations_Bot copy)

1. Greeting: “Thanks for calling St. Louis Creations. This call may be recorded. I just need your name, a number we can call back, and an email.”
2. If AI Gather gets name, phone, and email: “Got it. Thanks for calling. We’ll follow up.” Then hang up.
3. If AI Gather fails or times out: “Please leave a short message after the tone.” Record, hang up.

Capture only name, phone, email. No quoting, pricing, SMS, or email to the caller.

## Example JSON webhook body (Milo)

Gather success:

```json
{
  "name": "Ada Lovelace",
  "phone": "314-555-0188",
  "email": "ada@example.com",
  "callId": "CA-gather-1",
  "recordingUrl": null,
  "status": "gathered"
}
```

Failover voicemail:

```json
{
  "name": null,
  "phone": null,
  "email": null,
  "callId": "CA-record-1",
  "recordingUrl": "https://recordings.example/ca-record-1.mp3",
  "status": "voicemail"
}
```
