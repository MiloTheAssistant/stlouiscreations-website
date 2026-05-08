import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

const productsSource = read("lib/products.ts");
const polarCamelSource = read("lib/polar-camel-products.ts");
const navigationSource = read("lib/shop-navigation.ts");
const shopClientSource = read("app/shop/ShopClient.tsx");
const shopPageSource = read("app/shop/page.tsx");
const shopCatalogSource = read("lib/catalog/shop.ts");
const nextConfigSource = read("next.config.mjs");

function productBlock(source, slug) {
  const start = source.indexOf(`slug: "${slug}`);
  if (start === -1) {
    throw new Error(`Missing product slug: ${slug}`);
  }

  const end = source.indexOf("\n  },", start);
  return source.slice(start, end);
}

for (const slug of ["stllc-slt030", "stllc-slt042", "stllc-slt051"]) {
  const block = productBlock(productsSource, slug);
  if (!block.includes('category: "wood-slate"')) {
    throw new Error(`${slug} is not categorized as wood-slate.`);
  }
}

if (!navigationSource.includes('slug: "20-oz-ringneck-tumblers-slider-lid"')) {
  throw new Error("Missing slider-lid product line navigation entry.");
}

if (!navigationSource.includes("20 oz. Ringneck Tumblers with Slider Lid")) {
  throw new Error("Missing slider-lid product line label.");
}

for (const sku of ["LTM7251", "LTM7269"]) {
  const block = productBlock(polarCamelSource, `polar-camel-${sku.toLowerCase()}`);
  if (!block.includes('subcategory: "20-oz-ringneck-tumblers-slider-lid"')) {
    throw new Error(`${sku} was not moved into the slider-lid product line.`);
  }
}

for (const sku of ["LTM7201", "LTM7219"]) {
  const block = productBlock(polarCamelSource, `polar-camel-${sku.toLowerCase()}`);
  if (!block.includes('subcategory: "20-oz-ringneck-tumblers"')) {
    throw new Error(`${sku} should remain in the standard 20 oz. product line.`);
  }
}

for (const sku of ["LTM7201", "LTM7219", "LTM7251", "LTM7269"]) {
  const block = productBlock(polarCamelSource, `polar-camel-${sku.toLowerCase()}`);
  const expectedImage = `/images/products/polar-camel/${sku.toLowerCase()}.png`;
  if (!block.includes(expectedImage)) {
    throw new Error(`${sku} should use the local product image: ${expectedImage}`);
  }
}

if (!shopClientSource.includes('from "next/image"')) {
  throw new Error("ShopClient is not using Next Image for product-line cards.");
}

if (shopClientSource.includes("/images/product-lines/${subcategory.slug}.svg")) {
  throw new Error("ShopClient is still rendering generated SVG product-line images.");
}

if (!shopClientSource.includes("subcategoryImages[subcategory.slug]")) {
  throw new Error("ShopClient does not render real product photos for product-line cards.");
}

if (!shopPageSource.includes("subcategoryImages={catalog.subcategoryImages}")) {
  throw new Error("Shop page does not pass product-line images into ShopClient.");
}

if (!shopCatalogSource.includes("getSubcategoryImages")) {
  throw new Error("Shop catalog does not load real product-line images from the database.");
}

for (const hostname of ["res.cloudinary.com", "cdn.shopify.com"]) {
  if (!nextConfigSource.includes(hostname)) {
    throw new Error(`Next image config does not allow ${hostname}.`);
  }
}

console.log("Shop correction checks passed.");
