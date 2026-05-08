import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsSource = fs.readFileSync(path.join(root, "lib/products.ts"), "utf8");
const polarCamelSource = fs.readFileSync(
  path.join(root, "lib/polar-camel-products.ts"),
  "utf8"
);
const shopClientSource = fs.readFileSync(path.join(root, "app/shop/ShopClient.tsx"), "utf8");
const shopPageSource = fs.readFileSync(path.join(root, "app/shop/page.tsx"), "utf8");

const featuredSetMatch = productsSource.match(
  /const featuredProductSlugs = new Set\(\[([\s\S]*?)\]\);/
);

if (!featuredSetMatch) {
  throw new Error("Missing featuredProductSlugs set.");
}

const featuredSlugs = Array.from(featuredSetMatch[1].matchAll(/"([^"]+)"/g)).map(
  (match) => match[1]
);

if (featuredSlugs.length !== 8) {
  throw new Error(`Expected exactly 8 featured product slugs, found ${featuredSlugs.length}.`);
}

for (const slug of featuredSlugs) {
  const existsInStaticProducts = productsSource.includes(`slug: "${slug}"`);
  const existsInPolarCamel = polarCamelSource.includes(`slug: "${slug}"`);

  if (!existsInStaticProducts && !existsInPolarCamel) {
    throw new Error(`Featured product slug does not exist: ${slug}`);
  }
}

const requiredProductSnippets = [
  '["Featured", ...(product.tags ?? [])]',
  "featured: true",
  "return products.filter((p) => p.tags?.includes(\"Featured\"));",
];

for (const snippet of requiredProductSnippets) {
  if (!productsSource.includes(snippet)) {
    throw new Error(`Missing featured product snippet: ${snippet}`);
  }
}

const requiredShopSnippets = [
  'const isLandingPage = activeCategory === "all" && !isSearching;',
  "featuredProducts",
  "Holiday, Event, and Special Occasion Specials",
  "4th of July, Easter, Halloween, Thanksgiving",
  "Occasion-ready picks",
  'selectCategory("all")',
];

for (const snippet of requiredShopSnippets) {
  if (!shopClientSource.includes(snippet)) {
    throw new Error(`Missing shop landing snippet: ${snippet}`);
  }
}

if (!shopPageSource.includes("Customizable Products Ready for Production")) {
  throw new Error("Shop page hero copy is missing.");
}

console.log("Shop landing page featured product checks passed.");
