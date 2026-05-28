import type { CatalogProductRecord } from "@/lib/stripe/catalog-sync";

export const JDS_SOURCE_CATALOG = "jds_industries_api";

export interface JdsProductDetails {
  sku: string;
  name: string;
  description?: string | null;
  caseQuantity?: number | null;
  lessThanCasePrice?: number | null;
  oneCase?: number | null;
  fiveCases?: number | null;
  tenCases?: number | null;
}

export interface JdsInventoryDetails {
  sku: string;
  available?: number | null;
  quantity?: number | null;
  status?: string | null;
}

export interface JdsImportOptions {
  category: string;
  subcategory?: string | null;
  markupPercent: number;
  status: "draft" | "active";
}

export interface JdsImportPreview {
  sku: string;
  name: string;
  description: string;
  wholesalePrice: number;
  retailPrice: number;
  caseQuantity: number | null;
  inventoryAvailable: number | null;
  inventoryStatus: string | null;
  record: CatalogProductRecord;
}

function toTitleSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 84);
}

function numberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number.parseFloat(value.replace(/[$,]/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function bestWholesalePrice(product: JdsProductDetails): number {
  const price =
    numberOrNull(product.lessThanCasePrice) ??
    numberOrNull(product.oneCase) ??
    numberOrNull(product.fiveCases) ??
    numberOrNull(product.tenCases);

  if (price === null) {
    throw new Error(`JDS product ${product.sku} does not include a usable price.`);
  }

  return price;
}

export function parseSkuInput(input: string): string[] {
  const seen = new Set<string>();

  return input
    .split(/[\s,;]+/)
    .map((sku) => sku.trim().toUpperCase())
    .filter(Boolean)
    .filter((sku) => {
      if (seen.has(sku)) {
        return false;
      }
      seen.add(sku);
      return true;
    });
}

export function retailPriceFromWholesale(
  wholesalePrice: number,
  markupPercent: number
): number {
  const multiplier = 1 + Math.max(markupPercent, 0) / 100;
  return Math.round(wholesalePrice * multiplier * 100);
}

export function buildJdsImportRecord(
  product: JdsProductDetails,
  options: JdsImportOptions
): CatalogProductRecord {
  const sku = product.sku.trim().toUpperCase();
  const name = product.name.trim();
  const wholesalePrice = bestWholesalePrice(product);
  const caseQuantity = numberOrNull(product.caseQuantity);
  const description = [
    product.description?.trim() || `${name} from JDS Industries.`,
    caseQuantity ? `Case quantity: ${caseQuantity}.` : null,
    "Personalization, proofing, current availability, and final pricing are confirmed before production.",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    sku,
    slug: `jds-${sku.toLowerCase()}-${toTitleSlug(name)}`,
    title: name,
    description,
    category: options.category,
    subcategory: options.subcategory || null,
    supplier: "JDS Industries",
    images: [],
    tags: ["JDS Industries", "Imported", "Needs Review"],
    basePrice: retailPriceFromWholesale(wholesalePrice, options.markupPercent),
    quoteRequired: true,
    personalizationAvailable: true,
    personalizationNote:
      "Personalization, setup, proofing, and production timing are confirmed before quote approval.",
    personalizationCostExtra: true,
    sourceCatalog: JDS_SOURCE_CATALOG,
    stripeProductId: null,
    stripePriceId: null,
    status: options.status,
    lastSyncedAt: null,
  };
}

export function buildJdsImportPreview(
  product: JdsProductDetails,
  inventory: JdsInventoryDetails | null,
  options: JdsImportOptions
): JdsImportPreview {
  const record = buildJdsImportRecord(product, options);
  const wholesalePrice = bestWholesalePrice(product);

  return {
    sku: record.sku,
    name: record.title,
    description: record.description,
    wholesalePrice,
    retailPrice: record.basePrice,
    caseQuantity: numberOrNull(product.caseQuantity),
    inventoryAvailable:
      numberOrNull(inventory?.available) ?? numberOrNull(inventory?.quantity),
    inventoryStatus: inventory?.status ?? null,
    record,
  };
}
