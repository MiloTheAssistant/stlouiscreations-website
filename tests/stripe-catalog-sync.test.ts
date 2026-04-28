import assert from "node:assert/strict";
import test from "node:test";
import {
  buildStripeCatalogSyncPlan,
  buildStripeIdempotencyKey,
  buildStripeProductImageUrls,
  type CatalogProductRecord,
} from "@/lib/stripe/catalog-sync";

const localProduct: CatalogProductRecord = {
  sku: "DCS301S",
  title: "750 ml Polar Camel Square Decanter Set",
  description: "Decanter set with four rocks glasses.",
  category: "glassware",
  supplier: "Polar Camel",
  images: ["https://example.com/decanter.png"],
  tags: ["Polar Camel", "Glassware"],
  basePrice: 8900,
  quoteRequired: true,
  personalizationAvailable: true,
  personalizationNote: "Personalization costs extra and is confirmed before production",
  personalizationCostExtra: true,
  sourceCatalog: "polar_camel_catalog",
  stripeProductId: "prod_existing",
  stripePriceId: "price_old",
};

test("plans a product update without creating a new price when the amount is unchanged", () => {
  const plan = buildStripeCatalogSyncPlan(localProduct, {
    stripeProductId: "prod_existing",
    stripePriceId: "price_current",
    stripePriceAmount: 8900,
  });

  assert.equal(plan.productAction.type, "update");
  assert.equal(plan.productAction.stripeProductId, "prod_existing");
  assert.equal(plan.priceAction.type, "keep");
  assert.equal(plan.priceAction.stripePriceId, "price_current");
  assert.equal(plan.localUpdate.stripeProductId, "prod_existing");
  assert.equal(plan.localUpdate.stripePriceId, "price_current");
});

test("plans a new price and old price deactivation when the amount changes", () => {
  const plan = buildStripeCatalogSyncPlan(localProduct, {
    stripeProductId: "prod_existing",
    stripePriceId: "price_old",
    stripePriceAmount: 7500,
  });

  assert.equal(plan.productAction.type, "update");
  assert.deepEqual(plan.priceAction, {
    type: "replace",
    oldStripePriceId: "price_old",
    amount: 8900,
  });
  assert.equal(plan.localUpdate.stripeProductId, "prod_existing");
  assert.equal(plan.localUpdate.stripePriceId, null);
});

test("plans product and price creation when SKU is not yet linked to Stripe", () => {
  const plan = buildStripeCatalogSyncPlan(
    { ...localProduct, stripeProductId: null, stripePriceId: null },
    null
  );

  assert.equal(plan.productAction.type, "create");
  assert.equal(plan.priceAction.type, "create");
  assert.equal(plan.priceAction.amount, 8900);
  assert.equal(plan.localUpdate.stripeProductId, null);
  assert.equal(plan.localUpdate.stripePriceId, null);
});

test("uses stable idempotency keys scoped by operation and SKU", () => {
  assert.equal(
    buildStripeIdempotencyKey("price.create", "DCS301S", "8900"),
    "catalog-sync:price.create:DCS301S:8900"
  );
});

test("normalizes Stripe product images to absolute HTTP URLs", () => {
  assert.deepEqual(
    buildStripeProductImageUrls(
      [
        "/images/products/airflyte/p5473.png",
        "https://cdn.example.com/direct.png",
        "notaurl",
        "mailto:test@example.com",
      ],
      "https://www.stlouiscreations.com"
    ),
    [
      "https://www.stlouiscreations.com/images/products/airflyte/p5473.png",
      "https://cdn.example.com/direct.png",
      "https://www.stlouiscreations.com/notaurl",
    ]
  );
});
