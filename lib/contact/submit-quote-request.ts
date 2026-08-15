import type { BrowserQuoteRequest } from "@/lib/contact/quote-request";

export type ContactFetch = (
  input: string,
  init?: RequestInit,
) => Promise<Response>;

export async function submitQuoteRequest(
  data: BrowserQuoteRequest,
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
