import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { loadEnvConfig } from "@next/env";
import { getLocalCatalogRecords } from "@/lib/catalog/source";
import { getShopCatalog } from "@/lib/catalog/shop";
import { categories, polarCamelSubcategories } from "@/lib/shop-navigation";
import { products } from "@/lib/products";

loadEnvConfig(process.cwd());

const stlflixSlugs = [
  "burnt-ween",
  "done-ween",
  "golden-ween",
  "raw-ween",
  "simmering-ween",
  "sizzled-ween",
  "smoking-ween",
  "the-skewer",
  "thirsty-ween",
];

const expectedProductImages: Record<string, string> = {
  "burnt-ween": "/images/products/3d-prints/wacky-weenies/burnt-ween/Burnt_Ween1_939f854778.png",
  "done-ween": "/images/products/3d-prints/wacky-weenies/done-ween/Done_Ween1_f9e18f8333.png",
  "golden-ween": "/images/products/3d-prints/wacky-weenies/golden-ween/Golden_Ween1_c6e89f6f97.png",
  "raw-ween": "/images/products/3d-prints/wacky-weenies/raw-ween/Raw_Ween1_f2c83768e8.png",
  "simmering-ween": "/images/products/3d-prints/wacky-weenies/simmering-ween/Simmering_Ween1_01871df78f.png",
  "sizzled-ween": "/images/products/3d-prints/wacky-weenies/sizzled-ween/Sizzled_Ween1_91f1be1cd5.png",
  "smoking-ween": "/images/products/3d-prints/wacky-weenies/smoking-ween/Smoking_Ween_1_a545f64beb.png",
  "the-skewer": "/images/products/3d-prints/wacky-weenies/the-skewer/The_Skewer_1_be301a64ec.png",
  "thirsty-ween": "/images/products/3d-prints/wacky-weenies/thirsty-ween/Thirsty_Ween1_6a657d9d0b.png",
};

test("shop navigation includes a 3D Prints category", () => {
  assert.deepEqual(
    categories.find((category) => category.slug === "3d-prints"),
    { slug: "3d-prints", label: "3D Prints" }
  );
});

test("3D Prints includes a Wacky Weenies submenu category with category art", () => {
  assert.deepEqual(
    polarCamelSubcategories.find((subcategory) => subcategory.slug === "wacky-weenies"),
    {
      slug: "wacky-weenies",
      label: "Wacky Weenies",
      group: "stlflix-3d-prints",
      groupLabel: "STLFlix 3D Prints",
      category: "3d-prints",
      categoryLabel: "3D Prints",
      image: "/images/products/3d-prints/wacky-weenies/WackyWeeniesCategoryImage.webp",
    }
  );
});

test("STLFlix 3D print products launch with placeholder price and zero availability", () => {
  for (const slug of stlflixSlugs) {
    const product = products.find((candidate) => candidate.slug === slug);

    assert.ok(product, `${slug} should exist`);
    assert.equal(product.category, "3d-prints");
    assert.equal(product.subcategory, "wacky-weenies");
    assert.equal(product.status, "active");
    assert.equal(product.price, 0);
    assert.equal(product.purchaseMode, "quote");
    assert.equal(product.images[0], expectedProductImages[slug]);
    assert.ok(product.videos?.[0]?.endsWith(".webm"), `${slug} should have a product video`);
    assert.ok(
      product.details.some((detail) => detail.toLowerCase().includes("0 available")),
      `${slug} should disclose zero availability`
    );
  }
});

test("STLFlix 3D prints seed into the local product catalog source", () => {
  const records = getLocalCatalogRecords().filter(
    (record) => record.category === "3d-prints" && record.subcategory === "wacky-weenies"
  );

  assert.equal(records.length, stlflixSlugs.length);

  for (const record of records) {
    assert.equal(record.subcategory, "wacky-weenies");
    assert.equal(record.basePrice, 0);
    assert.equal(record.inventoryQuantity, 0);
    assert.equal(record.availabilityQuantity, 0);
    assert.equal(record.quoteRequired, true);
    assert.equal(record.sourceCatalog, "stlflix_3d_prints_catalog");
    assert.ok(record.videos?.[0]?.endsWith(".webm"), `${record.slug} should seed a video`);
  }
});

test("3D Prints line picker has a Wacky Weenies representative hover video", async () => {
  const catalog = await getShopCatalog({
    category: "3d-prints",
    subcategory: "",
    query: "",
  });

  assert.ok(
    catalog.subcategoryVideos["wacky-weenies"]?.endsWith(".webm"),
    "Wacky Weenies should expose a hover video for the product-line card"
  );
});

test("product detail view exposes all product images in a scrollable gallery", () => {
  const detailClientSource = readFileSync(
    "app/shop/[slug]/ProductDetailClient.tsx",
    "utf8"
  );

  assert.match(detailClientSource, /product\.images\.map/);
  assert.match(detailClientSource, /overflow-x-auto/);
});
