import {
  type JdsInventoryDetails,
  type JdsProductDetails,
} from "@/lib/jds/import";

const JDS_PRODUCT_DETAILS_ENDPOINT =
  "https://api.jdsapp.com/get-product-details-by-skus";
const JDS_INVENTORY_ENDPOINT = "https://api.jdsapp.com/get-inventory-by-skus";

interface JdsApiPayload {
  token: string;
  skus: string[];
}

type Fetcher = typeof fetch;

function getJdsApiToken(): string {
  const token = process.env.JDS_API_TOKEN;
  if (!token) {
    throw new Error("JDS_API_TOKEN is required for JDS API calls.");
  }
  return token;
}

function unwrapArrayResponse<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const candidate =
      record.products ?? record.items ?? record.data ?? record.inventory ?? null;

    if (Array.isArray(candidate)) {
      return candidate as T[];
    }
  }

  return [];
}

function normalizeSkuRecord<T extends { sku: string }>(record: T): T {
  return {
    ...record,
    sku: record.sku.trim().toUpperCase(),
  };
}

async function postJdsApi<T>(
  endpoint: string,
  skus: string[],
  fetcher: Fetcher = fetch
): Promise<T[]> {
  const body: JdsApiPayload = {
    token: getJdsApiToken(),
    skus,
  };
  const response = await fetcher(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    redirect: "follow",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`JDS API request failed: ${response.status} ${text}`);
  }

  return unwrapArrayResponse<T>(await response.json());
}

export async function fetchJdsProductDetails(
  skus: string[],
  fetcher?: Fetcher
): Promise<JdsProductDetails[]> {
  const products = await postJdsApi<JdsProductDetails>(
    JDS_PRODUCT_DETAILS_ENDPOINT,
    skus,
    fetcher
  );

  return products
    .filter((product) => product.sku && product.name)
    .map(normalizeSkuRecord);
}

export async function fetchJdsInventory(
  skus: string[],
  fetcher?: Fetcher
): Promise<JdsInventoryDetails[]> {
  const inventory = await postJdsApi<JdsInventoryDetails>(
    JDS_INVENTORY_ENDPOINT,
    skus,
    fetcher
  );

  return inventory.filter((item) => item.sku).map(normalizeSkuRecord);
}
