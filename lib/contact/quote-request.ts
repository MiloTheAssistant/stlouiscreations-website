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
