import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsSource = fs.readFileSync(path.join(root, "lib/products.ts"), "utf8");
const productPageSource = fs.readFileSync(
  path.join(root, "app/shop/[slug]/page.tsx"),
  "utf8"
);
const shopClientSource = fs.readFileSync(path.join(root, "app/shop/ShopClient.tsx"), "utf8");

const requiredSnippets = [
  'subcategory?: string;',
  'import { polarCamelProducts } from "./polar-camel-products";',
  "polarCamelSubcategoryGroups",
  "polarCamelSubcategories",
  "...polarCamelProducts",
  '{ slug: "home-goods", label: "Home Goods" }',
];

for (const snippet of requiredSnippets) {
  if (!productsSource.includes(snippet)) {
    throw new Error(`Missing product data snippet: ${snippet}`);
  }
}

if (!productPageSource.includes("export function generateMetadata")) {
  throw new Error("Product detail page is missing generateMetadata for product SEO.");
}

if (shopClientSource.includes("categories.map((cat)")) {
  throw new Error("Shop client may be rendering the hidden All Products category.");
}

if (!shopClientSource.includes('cat.slug !== "all"')) {
  throw new Error("Shop client must hide the All Products category from navigation.");
}

if (!shopClientSource.includes("polarCamelSubcategories")) {
  throw new Error("Shop client is missing Polar Camel subcategory navigation.");
}

if (!shopClientSource.includes("polarCamelSubcategoryGroups")) {
  throw new Error("Shop client is missing grouped Polar Camel navigation.");
}

if (!shopClientSource.includes("subcategory")) {
  throw new Error("Shop client is missing subcategory filtering.");
}

const polarCamelSource = fs.readFileSync(
  path.join(root, "lib/polar-camel-products.ts"),
  "utf8"
);

const productMatches = polarCamelSource.match(/supplierSku:/g) ?? [];
if (productMatches.length !== 583) {
  throw new Error(`Expected 583 Polar Camel products, found ${productMatches.length}.`);
}

const subcategoryMatches = polarCamelSource.match(/groupLabel:/g) ?? [];
if (subcategoryMatches.length < 38) {
  throw new Error(`Expected at least 38 Polar Camel subcategories, found ${subcategoryMatches.length}.`);
}

const requiredCatalogSnippets = [
  "export const polarCamelSubcategories",
  "export const polarCamelSubcategoryGroups",
  "export const drinkwareSubcategories",
  "export const drinkwareSubcategoryGroups",
  'slug: "20-oz-ringneck-tumblers"',
  'slug: "drinkware-accessories"',
  'slug: "decanter-sets-decanters-rocks-glasses"',
  'slug: "wine-chillers"',
  'supplierSku: "LTM7201"',
  'supplierSku: "LTM7269"',
  'supplierSku: "SST257"',
  'subcategory: "20-oz-ringneck-tumblers"',
  'subcategory: "straws"',
  'category: "glassware"',
  'category: "home-goods"',
  '"Catalog listed price: $24.75"',
  '"Catalog listed price: $29.00"',
  '"Catalog listed price: $3.75"',
  '"Personalization costs extra and is confirmed before production"',
];

for (const snippet of requiredCatalogSnippets) {
  if (!polarCamelSource.includes(snippet)) {
    throw new Error(`Missing Polar Camel catalog snippet: ${snippet}`);
  }
}

const duplicateSlugMatches = polarCamelSource.match(/slug: "([^"]+)"/g) ?? [];
const uniqueSlugs = new Set(duplicateSlugMatches);
if (duplicateSlugMatches.length !== uniqueSlugs.size) {
  throw new Error("Polar Camel catalog contains duplicate product slugs.");
}

const productCategoryCounts = {
  drinkware: (polarCamelSource.match(/    category: "drinkware"/g) ?? []).length,
  glassware: (polarCamelSource.match(/    category: "glassware"/g) ?? []).length,
  homeGoods: (polarCamelSource.match(/    category: "home-goods"/g) ?? []).length,
};

if (
  productCategoryCounts.drinkware !== 518 ||
  productCategoryCounts.glassware !== 35 ||
  productCategoryCounts.homeGoods !== 30
) {
  throw new Error(
    `Unexpected Polar Camel category counts: ${JSON.stringify(productCategoryCounts)}`
  );
}

console.log("Polar Camel full catalog product data and navigation checks passed.");
