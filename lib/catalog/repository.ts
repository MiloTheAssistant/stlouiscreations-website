import { getSql } from "@/lib/db";
import type { CatalogProductRecord } from "@/lib/stripe/catalog-sync";

interface CatalogProductRow {
  sku: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  subcategory: string | null;
  supplier: string;
  images: string[] | null;
  tags: string[] | null;
  base_price: number;
  quote_required: boolean;
  personalization_available: boolean;
  personalization_note: string | null;
  personalization_cost_extra: boolean;
  source_catalog: string;
  stripe_product_id: string | null;
  stripe_price_id: string | null;
  status: string;
  last_synced_at: string | null;
}

export interface CatalogProductSyncUpdate {
  sku: string;
  stripeProductId: string;
  stripePriceId: string;
  syncedAt: Date;
}

export async function upsertCatalogProduct(
  product: CatalogProductRecord
): Promise<void> {
  const sql = getSql();

  await sql`
    insert into product_catalog (
      sku,
      slug,
      title,
      description,
      category,
      subcategory,
      supplier,
      images,
      tags,
      base_price,
      quote_required,
      personalization_available,
      personalization_note,
      personalization_cost_extra,
      source_catalog,
      stripe_product_id,
      stripe_price_id,
      status
    ) values (
      ${product.sku},
      ${product.slug},
      ${product.title},
      ${product.description},
      ${product.category},
      ${product.subcategory ?? null},
      ${product.supplier},
      ${JSON.stringify(product.images)}::jsonb,
      ${JSON.stringify(product.tags)}::jsonb,
      ${product.basePrice},
      ${product.quoteRequired},
      ${product.personalizationAvailable},
      ${product.personalizationNote},
      ${product.personalizationCostExtra},
      ${product.sourceCatalog},
      ${product.stripeProductId},
      ${product.stripePriceId},
      ${product.status}
    )
    on conflict (sku) do update set
      slug = excluded.slug,
      title = excluded.title,
      description = excluded.description,
      category = excluded.category,
      subcategory = excluded.subcategory,
      supplier = excluded.supplier,
      images = excluded.images,
      tags = excluded.tags,
      base_price = excluded.base_price,
      quote_required = excluded.quote_required,
      personalization_available = excluded.personalization_available,
      personalization_note = excluded.personalization_note,
      personalization_cost_extra = excluded.personalization_cost_extra,
      source_catalog = excluded.source_catalog,
      stripe_product_id = coalesce(product_catalog.stripe_product_id, excluded.stripe_product_id),
      stripe_price_id = coalesce(product_catalog.stripe_price_id, excluded.stripe_price_id),
      status = excluded.status,
      updated_at = now()
  `;
}

export async function upsertCatalogProducts(
  products: CatalogProductRecord[]
): Promise<void> {
  for (const product of products) {
    await upsertCatalogProduct(product);
  }
}

export async function getCatalogProductsForStripeSync(): Promise<
  CatalogProductRecord[]
> {
  const sql = getSql();
  const rows = (await sql`
    select
      sku,
      slug,
      title,
      description,
      category,
      subcategory,
      supplier,
      images,
      tags,
      base_price,
      quote_required,
      personalization_available,
      personalization_note,
      personalization_cost_extra,
      source_catalog,
      stripe_product_id,
      stripe_price_id,
      status,
      last_synced_at
    from product_catalog
    where status = 'active'
    order by sku asc
  `) as CatalogProductRow[];

  return rows.map((row) => ({
    sku: row.sku,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    subcategory: row.subcategory,
    supplier: row.supplier,
    images: row.images ?? [],
    tags: row.tags ?? [],
    basePrice: row.base_price,
    quoteRequired: row.quote_required,
    personalizationAvailable: row.personalization_available,
    personalizationNote: row.personalization_note,
    personalizationCostExtra: row.personalization_cost_extra,
    sourceCatalog: row.source_catalog,
    stripeProductId: row.stripe_product_id,
    stripePriceId: row.stripe_price_id,
    status: row.status,
    lastSyncedAt: row.last_synced_at,
  }));
}

export async function markCatalogProductSynced({
  sku,
  stripeProductId,
  stripePriceId,
  syncedAt,
}: CatalogProductSyncUpdate): Promise<void> {
  const sql = getSql();

  await sql`
    update product_catalog
    set
      stripe_product_id = ${stripeProductId},
      stripe_price_id = ${stripePriceId},
      last_synced_at = ${syncedAt.toISOString()},
      updated_at = now()
    where sku = ${sku}
  `;
}

