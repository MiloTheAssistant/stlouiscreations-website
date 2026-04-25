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
const shopPageSource = fs.readFileSync(path.join(process.cwd(), "app/shop/page.tsx"), "utf8");
const shopClientSource = fs.readFileSync(path.join(process.cwd(), "app/shop/ShopClient.tsx"), "utf8");
const constantsSource = fs.readFileSync(path.join(process.cwd(), "lib/constants.ts"), "utf8");
assert(
  sitemapSource.includes("blogPosts") && sitemapSource.includes("products"),
  "Sitemap should be generated from real blog and product data"
);
assert(
  !sitemapSource.includes("custom-tumblers-bulk-orders"),
  "Sitemap should not include nonexistent blog slugs"
);
assert(
  shopClientSource.includes("useSearchParams") && shopPageSource.includes("<Suspense"),
  "Shop page should honor category query-string navigation"
);

const navHrefMatches = [...constantsSource.matchAll(/href: "([^"]+)"/g)];
const navHrefs = navHrefMatches
  .map((match) => match[1])
  .filter((href) => href.startsWith("/") && !href.includes("?") && !href.includes("#"));

for (const href of navHrefs) {
  if (href === "/") continue;
  assert(sitemapSource.includes(`${href}`), `Sitemap should include nav route ${href}`);
}

const vercelConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), "vercel.json"), "utf8"));
const redirects = vercelConfig.redirects ?? [];
const destinations = new Set(redirects.map((redirect) => redirect.destination));
const redirectBySource = new Map(redirects.map((redirect) => [redirect.source, redirect.destination]));

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

for (const [source, destination] of [
  ["/pages/about-us", "/about"],
  ["/pages/contact-us", "/contact"],
  ["/pages/engraving-materials", "/materials"],
  ["/pages/catalogs", "/catalogs"],
  ["/pages/fundraisers", "/fundraisers"],
  ["/pages/fundraiser-water-bottles-accessories", "/fundraisers/water-bottles-accessories"],
  ["/pages/billing-terms-and-conditions", "/terms"],
  ["/pages/data-sale-opt-out", "/privacy-policy"],
  ["/pages/pick-up-local-delivery", "/shipping"],
]) {
  assert(
    redirectBySource.get(source) === destination,
    `Expected ${source} to redirect to ${destination}`
  );
}

if (failures > 0) {
  process.exit(1);
}

console.log("Content parity routes and redirect config look good.");
