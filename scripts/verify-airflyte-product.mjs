import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsSource = fs.readFileSync(path.join(root, "lib/products.ts"), "utf8");
const productPageSource = fs.readFileSync(
  path.join(root, "app/shop/[slug]/page.tsx"),
  "utf8"
);

const requiredSnippets = [
  'slug: "airflyte-p5473-rosewood-gold-sunburst-plaque"',
  'category: "awards"',
  'supplier: "Airflyte"',
  'supplierSku: "P5473"',
  'tags: [',
  '"corporate awards"',
  '"rosewood plaque"',
  '"laser engraved plaque"',
  'seo: {',
  'title: "Airflyte P5473 Rosewood Gold Sunburst Plaque"',
  '"/images/products/airflyte/p5473.png"',
];

for (const snippet of requiredSnippets) {
  if (!productsSource.includes(snippet)) {
    throw new Error(`Missing product data snippet: ${snippet}`);
  }
}

if (
  !/description:\s*"Personalized Airflyte P5473 rosewood piano finish plaque with gold sunburst frame casting for corporate awards, service recognition, and milestone honors\."/s.test(
    productsSource
  )
) {
  throw new Error("Missing product SEO description.");
}

if (!productPageSource.includes("export function generateMetadata")) {
  throw new Error("Product detail page is missing generateMetadata for product SEO.");
}

const imagePath = path.join(root, "public/images/products/airflyte/p5473.png");
if (!fs.existsSync(imagePath)) {
  throw new Error(`Missing extracted product image: ${imagePath}`);
}

console.log("Airflyte product data and SEO checks passed.");
