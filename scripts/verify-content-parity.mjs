import fs from "node:fs";
import path from "node:path";

const requiredRoutes = [
  "app/materials/page.tsx",
  "app/materials/[slug]/page.tsx",
  "app/catalogs/page.tsx",
  "app/fundraisers/page.tsx",
  "app/fundraisers/water-bottles-accessories/page.tsx",
];

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`FAIL ${message}`);
  }
}

for (const route of requiredRoutes) {
  assert(fs.existsSync(path.join(process.cwd(), route)), `Missing route ${route}`);
}

const sitemapSource = fs.readFileSync(path.join(process.cwd(), "app/sitemap.ts"), "utf8");
assert(
  sitemapSource.includes("blogPosts") && sitemapSource.includes("products"),
  "Sitemap should be generated from real blog and product data"
);
assert(
  !sitemapSource.includes("custom-tumblers-bulk-orders"),
  "Sitemap should not include nonexistent blog slugs"
);

const vercelConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), "vercel.json"), "utf8"));
const redirects = vercelConfig.redirects ?? [];
const destinations = new Set(redirects.map((redirect) => redirect.destination));

for (const destination of [
  "/materials",
  "/materials/acrylic",
  "/materials/wood",
  "/materials/glass",
  "/materials/metal",
  "/materials/rubber",
  "/materials/fabric",
  "/materials/leather",
  "/materials/stone-slate-tile",
  "/catalogs",
  "/fundraisers",
  "/fundraisers/water-bottles-accessories",
]) {
  assert(destinations.has(destination), `Missing redirect destination ${destination}`);
}

if (failures > 0) {
  process.exit(1);
}

console.log("Content parity routes and redirect config look good.");
