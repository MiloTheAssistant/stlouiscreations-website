import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { siteConfig } from "@/lib/constants";
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
