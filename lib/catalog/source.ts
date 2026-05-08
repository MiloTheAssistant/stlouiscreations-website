import { products, type Product } from "@/lib/products";
import type { CatalogProductRecord } from "@/lib/stripe/catalog-sync";

function sourceCatalogForProduct(product: Product): string {
  if (product.supplier === "Polar Camel") {
    return "polar_camel_catalog";
  }

  if (product.shopifyId) {
    return "legacy_shopify_catalog";
  }

  return "st_louis_creations_catalog";
}

function skuForProduct(product: Product): string {
  return (product.supplierSku ?? product.slug).trim().toUpperCase();
}

function personalizationNoteForProduct(product: Product): string | null {
  const personalizationDetail = product.details.find((detail) =>
    detail.toLowerCase().includes("personalization")
  );

  return personalizationDetail ?? null;
}

export function toCatalogProductRecord(product: Product): CatalogProductRecord {
  const quoteRequired = product.purchaseMode === "quote";
  const personalizationNote = personalizationNoteForProduct(product);

  return {
    sku: skuForProduct(product),
    slug: product.slug,
    title: product.name,
    description: product.description,
    category: product.category,
    subcategory: product.subcategory ?? null,
    supplier: product.supplier ?? "St. Louis Creations",
    images: product.images,
    tags: product.tags ?? [],
    basePrice: product.price,
    quoteRequired,
    personalizationAvailable: Boolean(personalizationNote),
    personalizationNote,
    personalizationCostExtra:
      quoteRequired && Boolean(personalizationNote?.toLowerCase().includes("costs extra")),
    sourceCatalog: sourceCatalogForProduct(product),
    stripeProductId: null,
    stripePriceId:
      product.stripePriceId && !["quote", "free"].includes(product.stripePriceId)
        ? product.stripePriceId
        : null,
    status: product.status ?? "active",
    lastSyncedAt: null,
  };
}

export function getLocalCatalogRecords(): CatalogProductRecord[] {
  return products
    .filter((product) => product.status !== "draft")
    .map(toCatalogProductRecord);
}

