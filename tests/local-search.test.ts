import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { businessFacts, siteConfig } from "@/lib/constants";
import {
  absoluteUrl,
  canonicalHost,
  createPageMetadata,
  getSiteJsonLd,
} from "@/lib/seo";

const expectedHost = "https://www.stlouiscreations.com";
const nonCanonicalHostPattern = /https:\/\/stlouiscreations\.com(?:\/|\b)/;

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
}

test("uses the resolving www host for metadata and structured data", () => {
  assert.equal(siteConfig.url, expectedHost);
  assert.equal(canonicalHost, expectedHost);
  assert.equal(absoluteUrl(), `${expectedHost}/`);
  assert.equal(absoluteUrl("services"), `${expectedHost}/services`);

  const metadata = createPageMetadata({
    title: "Services",
    description: "Local fabrication services",
    path: "/services",
  });
  assert.equal(metadata.alternates?.canonical, `${expectedHost}/services`);
  assert.equal(
    (metadata.openGraph as { url?: string } | undefined)?.url,
    `${expectedHost}/services`
  );

  const siteUrls = collectStrings(getSiteJsonLd()).filter((value) =>
    /^https?:\/\/(?:www\.)?stlouiscreations\.com(?:\/|$)/.test(value)
  );
  assert.ok(siteUrls.length > 0);
  for (const url of siteUrls) {
    assert.ok(url.startsWith(expectedHost), `non-canonical schema URL: ${url}`);
  }
});

test("publishes only confirmed visible local business facts in schema", () => {
  const graph = getSiteJsonLd()["@graph"] as Array<Record<string, unknown>>;
  const business = graph.find((node) =>
    Array.isArray(node["@type"]) &&
    (node["@type"] as string[]).includes("LocalBusiness")
  );

  assert.ok(business);
  assert.equal(business.telephone, businessFacts.phone.schema);
  assert.deepEqual(business.address, {
    "@type": "PostalAddress",
    addressLocality: businessFacts.location.locality,
    addressRegion: businessFacts.location.region,
    addressCountry: businessFacts.location.country,
  });
  assert.deepEqual(business.openingHoursSpecification, [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: businessFacts.hours.weekdays,
      opens: businessFacts.hours.opens,
      closes: businessFacts.hours.closes,
    },
  ]);
});

test("renders the footer bottom-bar location from business facts", async () => {
  const source = await readFile(
    resolve(process.cwd(), "components/layout/Footer.tsx"),
    "utf8"
  );

  assert.match(
    source,
    /Creatively engineered in \{businessFacts\.location\.label\}/
  );
});

test("uses the www host for every sitemap entry and robots sitemap", () => {
  const entries = sitemap();
  assert.ok(entries.length > 0);
  for (const entry of entries) {
    assert.ok(entry.url.startsWith(expectedHost), `non-canonical sitemap URL: ${entry.url}`);
  }
  assert.equal(robots().sitemap, `${expectedHost}/sitemap.xml`);
});

test("keeps public and runtime site links free of the non-www host", async () => {
  const files = [
    "app/layout.tsx",
    "app/privacy-policy/page.tsx",
    "public/llms.txt",
    "public/brand/README.md",
    ".env.example",
  ];

  for (const file of files) {
    const source = await readFile(resolve(process.cwd(), file), "utf8");
    assert.doesNotMatch(source, nonCanonicalHostPattern, `${file} contains a non-www URL`);
  }
});

test("publishes concrete local service-fit and quote-readiness guidance", async () => {
  const servicesSource = await readFile(
    resolve(process.cwd(), "app/services/page.tsx"),
    "utf8"
  );
  const contactSource = await readFile(
    resolve(process.cwd(), "app/contact/page.tsx"),
    "utf8"
  );
  const combined = `${servicesSource}\n${contactSource}`.toLowerCase();

  assert.match(servicesSource, /St\. Louis businesses, schools, teams, nonprofits/);
  assert.match(servicesSource, /Laser engraving marks an existing item/);
  assert.match(servicesSource, /3D printing creates a new object/);
  assert.match(contactSource, /Request a St\. Louis fabrication quote/);
  assert.match(contactSource, /Artwork or a 3D model/);
  assert.match(contactSource, /Quantity and personalization/);
  assert.match(contactSource, /Intended use and finish/);
  assert.match(siteConfig.description, /St\. Louis digital fabrication studio/);
  assert.match(siteConfig.description, /laser engraving/);
  assert.match(siteConfig.description, /3D printing/);

  for (const phrase of [
    "in today's fast-paced",
    "game-changer",
    "unlock your potential",
    "elevate your brand",
    "seamless experience",
  ]) {
    assert.equal(combined.includes(phrase), false, `local copy contains filler: ${phrase}`);
  }
});
