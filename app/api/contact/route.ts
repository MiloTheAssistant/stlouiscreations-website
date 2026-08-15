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
