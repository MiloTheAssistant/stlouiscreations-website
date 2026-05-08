import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import {
  markCatalogProductSynced,
  type CatalogProductSyncUpdate,
} from "@/lib/catalog/repository";

export interface CatalogProductRecord {
  sku: string;
  slug?: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string | null;
  supplier: string;
  images: string[];
  tags: string[];
  basePrice: number;
  quoteRequired: boolean;
  personalizationAvailable: boolean;
  personalizationNote: string | null;
  personalizationCostExtra: boolean;
  sourceCatalog: string;
  stripeProductId: string | null;
  stripePriceId: string | null;
  status?: string;
  lastSyncedAt?: string | Date | null;
}

export interface StripeCatalogState {
  stripeProductId: string;
  stripePriceId: string | null;
  stripePriceAmount: number | null;
}

type ProductAction =
  | { type: "create" }
  | { type: "update"; stripeProductId: string };

type PriceAction =
  | { type: "create"; amount: number }
  | { type: "keep"; stripePriceId: string }
  | { type: "replace"; oldStripePriceId: string; amount: number };

export interface StripeCatalogSyncPlan {
  productAction: ProductAction;
  priceAction: PriceAction;
  localUpdate: {
    stripeProductId: string | null;
    stripePriceId: string | null;
  };
}

export interface StripeCatalogSyncResult extends CatalogProductSyncUpdate {
  productAction: ProductAction["type"];
  priceAction: PriceAction["type"];
}

export function buildStripeIdempotencyKey(
  operation: string,
  sku: string,
  version: string
): string {
  return `catalog-sync:${operation}:${sku}:${version}`;
}

export function buildStripeCatalogSyncPlan(
  product: CatalogProductRecord,
  stripeState: StripeCatalogState | null
): StripeCatalogSyncPlan {
  const stripeProductId = stripeState?.stripeProductId ?? product.stripeProductId;
  const stripePriceId = stripeState?.stripePriceId ?? product.stripePriceId;
  const stripePriceAmount = stripeState?.stripePriceAmount ?? null;

  const productAction: ProductAction = stripeProductId
    ? { type: "update", stripeProductId }
    : { type: "create" };

  if (stripePriceId && stripePriceAmount === product.basePrice) {
    return {
      productAction,
      priceAction: { type: "keep", stripePriceId },
      localUpdate: {
        stripeProductId: stripeProductId ?? null,
        stripePriceId,
      },
    };
  }

  if (stripePriceId) {
    return {
      productAction,
      priceAction: {
        type: "replace",
        oldStripePriceId: stripePriceId,
        amount: product.basePrice,
      },
      localUpdate: {
        stripeProductId: stripeProductId ?? null,
        stripePriceId: null,
      },
    };
  }

  return {
    productAction,
    priceAction: { type: "create", amount: product.basePrice },
    localUpdate: {
      stripeProductId: stripeProductId ?? null,
      stripePriceId: null,
    },
  };
}

function productMetadata(product: CatalogProductRecord): Stripe.MetadataParam {
  return {
    sku: product.sku,
    supplier: product.supplier,
    category: product.category,
    source_catalog: product.sourceCatalog,
    quote_required: String(product.quoteRequired),
    personalization_available: String(product.personalizationAvailable),
    personalization_cost_extra: String(product.personalizationCostExtra),
  };
}

export function buildStripeProductImageUrls(
  images: string[],
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL
): string[] {
  const baseUrl = siteUrl?.trim();

  return images
    .map((image) => {
      try {
        const url = baseUrl ? new URL(image, baseUrl) : new URL(image);
        return url.protocol === "https:" || url.protocol === "http:"
          ? url.toString()
          : null;
      } catch {
        return null;
      }
    })
    .filter((image): image is string => Boolean(image))
    .slice(0, 8);
}

function productParams(product: CatalogProductRecord): Stripe.ProductUpdateParams {
  return {
    name: product.title,
    description: product.description,
    images: buildStripeProductImageUrls(product.images),
    active: product.status !== "archived",
    metadata: productMetadata(product),
  };
}

async function findStripeProductBySku(
  stripe: Stripe,
  product: CatalogProductRecord
): Promise<Stripe.Product | null> {
  const query = `metadata['sku']:'${product.sku}' AND metadata['source_catalog']:'${product.sourceCatalog}'`;
  const result = await stripe.products.search(
    { query, limit: 1 },
    {
      idempotencyKey: buildStripeIdempotencyKey(
        "product.search",
        product.sku,
        product.sourceCatalog
      ),
    }
  );

  return result.data[0] ?? null;
}

async function getStripeCatalogState(
  stripe: Stripe,
  product: CatalogProductRecord
): Promise<StripeCatalogState | null> {
  const stripeProduct =
    (product.stripeProductId
      ? await stripe.products.retrieve(product.stripeProductId)
      : null) || (await findStripeProductBySku(stripe, product));

  if (!stripeProduct || stripeProduct.deleted) {
    return null;
  }

  const priceId =
    typeof stripeProduct.default_price === "string"
      ? stripeProduct.default_price
      : product.stripePriceId;

  if (!priceId) {
    return {
      stripeProductId: stripeProduct.id,
      stripePriceId: null,
      stripePriceAmount: null,
    };
  }

  const price = await stripe.prices.retrieve(priceId);

  return {
    stripeProductId: stripeProduct.id,
    stripePriceId: price.id,
    stripePriceAmount: price.unit_amount,
  };
}

async function ensureStripeProduct(
  stripe: Stripe,
  product: CatalogProductRecord,
  action: ProductAction
): Promise<string> {
  if (action.type === "update") {
    const updated = await stripe.products.update(
      action.stripeProductId,
      productParams(product),
      {
        idempotencyKey: buildStripeIdempotencyKey(
          "product.update",
          product.sku,
          product.sourceCatalog
        ),
      }
    );

    return updated.id;
  }

  const created = await stripe.products.create(
    productParams(product) as Stripe.ProductCreateParams,
    {
      idempotencyKey: buildStripeIdempotencyKey(
        "product.create",
        product.sku,
        product.sourceCatalog
      ),
    }
  );

  return created.id;
}

async function ensureStripePrice(
  stripe: Stripe,
  product: CatalogProductRecord,
  stripeProductId: string,
  action: PriceAction
): Promise<string> {
  if (action.type === "keep") {
    return action.stripePriceId;
  }

  if (action.type === "replace") {
    await stripe.prices.update(
      action.oldStripePriceId,
      { active: false },
      {
        idempotencyKey: buildStripeIdempotencyKey(
          "price.deactivate",
          product.sku,
          action.oldStripePriceId
        ),
      }
    );
  }

  const amount = action.amount;
  const price = await stripe.prices.create(
    {
      currency: "usd",
      unit_amount: amount,
      product: stripeProductId,
      metadata: productMetadata(product),
    },
    {
      idempotencyKey: buildStripeIdempotencyKey(
        "price.create",
        product.sku,
        String(amount)
      ),
    }
  );

  await stripe.products.update(
    stripeProductId,
    { default_price: price.id },
    {
      idempotencyKey: buildStripeIdempotencyKey(
        "product.default_price",
        product.sku,
        price.id
      ),
    }
  );

  return price.id;
}

export async function syncCatalogProductToStripe(
  product: CatalogProductRecord,
  stripe = getStripe()
): Promise<StripeCatalogSyncResult> {
  const stripeState = await getStripeCatalogState(stripe, product);
  const plan = buildStripeCatalogSyncPlan(product, stripeState);
  const stripeProductId = await ensureStripeProduct(
    stripe,
    product,
    plan.productAction
  );
  const stripePriceId = await ensureStripePrice(
    stripe,
    product,
    stripeProductId,
    plan.priceAction
  );
  const syncedAt = new Date();

  await markCatalogProductSynced({
    sku: product.sku,
    stripeProductId,
    stripePriceId,
    syncedAt,
  });

  return {
    sku: product.sku,
    stripeProductId,
    stripePriceId,
    syncedAt,
    productAction: plan.productAction.type,
    priceAction: plan.priceAction.type,
  };
}

