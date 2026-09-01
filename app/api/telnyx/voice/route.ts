import { createTelnyxVoiceHandlers } from "@/lib/telnyx/voice-handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handlers = createTelnyxVoiceHandlers({
  publicKey: process.env.TELNYX_PUBLIC_KEY,
  fromNumber: process.env.TELNYX_FROM_NUMBER,
  leadWebhookUrl: process.env.TELNYX_WEBHOOK_URL,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  reportFailure: (failure) => {
    console.error("Telnyx inbound voice failed", failure);
  },
});

export async function POST(request: Request) {
  return handlers.inbound(request);
}

export async function GET(request: Request) {
  return handlers.inbound(request);
}
