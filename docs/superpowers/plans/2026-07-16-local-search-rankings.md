# Local Search Rankings And Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `https://www.stlouiscreations.com` the site's single public URL identity and add practical local quote guidance backed only by visible St. Louis Creations business facts.

**Architecture:** `siteConfig.url` becomes the canonical URL source, while `lib/seo.ts` continues to assemble metadata and structured data for the App Router. A new `businessFacts` object centralizes the location, phone, hours, and response-time values shared by schema and visible contact surfaces. Existing services and contact layouts receive compact buyer guidance without new routes, dependencies, or unsupported claims.

**Tech Stack:** Next.js 14.2 App Router, React 18, TypeScript 5, Tailwind CSS 3, Node test runner with `tsx`, Vercel.

## Global Constraints

- The canonical host is exactly `https://www.stlouiscreations.com`.
- Use the existing App Router metadata, sitemap, robots, and JSON-LD architecture.
- Keep business facts in `lib/constants.ts` and URL/schema assembly in `lib/seo.ts`.
- Do not add thin location pages or repeated city-keyword copy.
- Do not claim ranking gains, Google Business Profile status, reviews, storefront access, or Search Console index status.
- Use only the visible facts already supported by the site: St. Louis, MO; `contact@stlouiscreations.com`; `(573) 500-0064`; Monday-Friday, 8am-5pm CT; weekends closed; replies within 24 hours on business days.
- Keep the current visual system and dependencies; add no package.
- Treat Google Search Console URL Inspection as blocked while `/Volumes/BotCentral/Users/milo/repos/GoogleCloudSearch/credentials/oauth-client.json` is absent.

## File Map

- `lib/constants.ts`: Own the canonical site URL and visible business facts.
- `lib/seo.ts`: Turn those facts into absolute URLs, route metadata, and schema graphs.
- `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`: Expose the shared URL contract through Next.js App Router metadata routes.
- `app/services/page.tsx`, `app/contact/page.tsx`: Render local service-fit and quote-readiness guidance.
- `components/layout/Footer.tsx`, `app/privacy-policy/page.tsx`: Reuse shared public facts and links instead of hardcoded values.
- `public/llms.txt`, `public/brand/README.md`, `.env.example`, `BrandImageLibrary.md`, `docs/stripe-catalog-sync.md`: Keep public and operational URL guidance aligned with the resolving host.
- `tests/local-search.test.ts`, `package.json`: Protect the URL, schema, and buyer-guidance contracts in the standard test command.

---

### Task 1: Establish One Canonical URL Contract

**Files:**
- Create: `tests/local-search.test.ts`
- Modify: `package.json`
- Modify: `.env.example`
- Modify: `lib/constants.ts:1-8`
- Modify: `lib/seo.ts:1-20`
- Modify: `app/layout.tsx:8-34`
- Modify: `app/sitemap.ts:1-80`
- Modify: `app/robots.ts:1-12`
- Modify: `app/privacy-policy/page.tsx:1-50`
- Modify: `public/llms.txt`
- Modify: `public/brand/README.md:66-73`
- Modify: `BrandImageLibrary.md`
- Modify: `docs/stripe-catalog-sync.md:45-52`

**Interfaces:**
- Consumes: Existing `siteConfig`, `absoluteUrl(path?: string): string`, `createPageMetadata(...)`, App Router metadata route functions, and static public documents.
- Produces: `siteConfig.url === "https://www.stlouiscreations.com"`; `canonicalHost` as an alias of `siteConfig.url`; canonical metadata, sitemap entries, robots sitemap, JSON-LD URLs, environment examples, and public links that all use the same host.

- [ ] **Step 1: Write the failing canonical-host regression test**

Create `tests/local-search.test.ts` with:

```ts
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
```

- [ ] **Step 2: Register the new test and verify the red state**

Change `package.json` so the test command includes the new file:

```json
"test": "node --import tsx --test tests/local-search.test.ts tests/admin-jds-import.test.ts tests/analytics-events.test.ts tests/shop-category-navigation.test.ts tests/stripe-catalog-sync.test.ts tests/topic-hubs.test.ts"
```

Run:

```bash
node --import tsx --test tests/local-search.test.ts
```

Expected: FAIL because `siteConfig.url`, `canonicalHost`, sitemap URLs, robots sitemap, root metadata, and public files still use `https://stlouiscreations.com`.

- [ ] **Step 3: Make `siteConfig.url` the canonical source**

In `lib/constants.ts`, change the site URL:

```ts
export const siteConfig = {
  name: "St. Louis Creations",
  descriptor: "Digital Fabrication Studio",
  description:
    "A digital fabrication studio engineering ideas into precision-crafted physical products for brands, creators, and innovators.",
  url: "https://www.stlouiscreations.com",
  tagline: "Local Craft. Real Materials. Studio Precision.",
};
```

In `lib/seo.ts`, derive the existing public export from that source:

```ts
import type { Metadata } from "next";
import { contactLinks, productCategories, services, siteConfig, socialLinks } from "@/lib/constants";
import type { Product } from "@/lib/products";

export const canonicalHost = siteConfig.url;
```

Keep the existing `absoluteUrl` implementation so every relative route inherits the new host.

- [ ] **Step 4: Route App Router metadata files through the canonical helper**

In `app/layout.tsx`, import and use `canonicalHost`:

```ts
import { canonicalHost, getSiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "St. Louis Creations | Digital Fabrication Studio",
    template: "%s | St. Louis Creations",
  },
  description:
    "Creatively Engineered Reality. A St. Louis digital fabrication studio for precision laser engraving, additive manufacturing, and custom production.",
  metadataBase: new URL(canonicalHost),
  alternates: {
    canonical: canonicalHost,
  },
  openGraph: {
    type: "website",
    siteName: "St. Louis Creations",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "St. Louis Creations - Digital Fabrication Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "St. Louis Creations",
    description:
      "Creatively Engineered Reality. Precision laser engraving, additive manufacturing, and custom production.",
    images: ["/og-image.png"],
  },
};
```

In `app/sitemap.ts`, remove `baseUrl`, import `absoluteUrl` and `canonicalHost`, and construct every URL through those helpers:

```ts
import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { materials } from "@/lib/constants";
import { products } from "@/lib/products";
import { absoluteUrl, canonicalHost } from "@/lib/seo";
import { getTopicProofRoutes, topicHubs } from "@/lib/topic-hubs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { url: canonicalHost, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: absoluteUrl("/materials"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: absoluteUrl("/catalogs"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 },
    { url: absoluteUrl("/fundraisers"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: absoluteUrl("/fundraisers/water-bottles-accessories"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 },
    { url: absoluteUrl("/shop"), lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: absoluteUrl("/topics"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: absoluteUrl("/terms"), lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: absoluteUrl("/privacy-policy"), lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: absoluteUrl("/refund-policy"), lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: absoluteUrl("/shipping"), lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
  ];

  const materialPages = materials.map((material) => ({
    url: absoluteUrl(`/materials/${material.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const productPages = products.map((product) => ({
    url: absoluteUrl(`/shop/${product.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: product.status === "draft" ? 0.45 : 0.65,
  }));
  const blogPages = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const topicPages = topicHubs.map((hub) => ({
    url: absoluteUrl(`/topics/${hub.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
  const topicProofPages = getTopicProofRoutes().map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [
    ...staticPages,
    ...materialPages,
    ...productPages,
    ...topicPages,
    ...topicProofPages,
    ...blogPages,
  ];
}
```

In `app/robots.ts`, use the helper because Next.js does not apply `metadataBase` to the sitemap field:

```ts
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
```

- [ ] **Step 5: Align public links and environment guidance**

In `app/privacy-policy/page.tsx`, import `siteConfig` and replace the hardcoded policy link:

```tsx
import { siteConfig } from "@/lib/constants";

<a
  href={siteConfig.url}
  className="text-primary underline hover:no-underline"
>
  stlouiscreations.com
</a>
```

Replace every `https://stlouiscreations.com` occurrence with `https://www.stlouiscreations.com` in these text/configuration files:

```text
.env.example
public/llms.txt
public/brand/README.md
BrandImageLibrary.md
docs/stripe-catalog-sync.md
```

Do not rewrite historical findings in `docs/GEO-AUDIT-REPORT.md` or the approved design spec; those files record the previous state.

- [ ] **Step 6: Run the canonical regression suite**

Run:

```bash
node --import tsx --test tests/local-search.test.ts
npm test
```

Expected: the local-search tests pass, followed by the complete test script with no failures.

- [ ] **Step 7: Commit the canonical contract**

```bash
git add .env.example BrandImageLibrary.md app/layout.tsx app/privacy-policy/page.tsx app/robots.ts app/sitemap.ts docs/stripe-catalog-sync.md lib/constants.ts lib/seo.ts package.json public/brand/README.md public/llms.txt tests/local-search.test.ts
git commit -m "fix: align canonical site host"
```

---

### Task 2: Centralize Visible Business Facts And LocalBusiness Schema

**Files:**
- Modify: `tests/local-search.test.ts`
- Modify: `lib/constants.ts:165-176`
- Modify: `lib/seo.ts:1-124`
- Modify: `app/contact/page.tsx:1-130`
- Modify: `components/layout/Footer.tsx:1-120`

**Interfaces:**
- Consumes: `contactLinks.email`, the confirmed visible contact page facts, and `getSiteJsonLd()`.
- Produces: `businessFacts` with `location`, `phone`, `hours`, and `responseTime`; LocalBusiness JSON-LD with matching address, telephone, and `openingHoursSpecification`; contact page and footer values rendered from the same object.

- [ ] **Step 1: Add a failing schema contract test**

Extend the constants import in `tests/local-search.test.ts`:

```ts
import { businessFacts, siteConfig } from "@/lib/constants";
```

Add this test:

```ts
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
```

- [ ] **Step 2: Run the schema test to verify it fails**

Run:

```bash
node --import tsx --test tests/local-search.test.ts
```

Expected: FAIL because `businessFacts` and `openingHoursSpecification` do not exist yet.

- [ ] **Step 3: Add the confirmed facts object**

Add this after `contactLinks` in `lib/constants.ts`:

```ts
export const businessFacts = {
  location: {
    label: "St. Louis, MO",
    locality: "St. Louis",
    region: "MO",
    country: "US",
  },
  phone: {
    display: "(573) 500-0064",
    href: "tel:+15735000064",
    schema: "+1-573-500-0064",
  },
  hours: {
    weekdayLabel: "Monday - Friday: 8am - 5pm CT",
    weekendLabel: "Saturday - Sunday: Closed",
    weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  responseTime:
    "We respond to fabrication and quote inquiries within 24 hours during business days.",
} as const;
```

- [ ] **Step 4: Build LocalBusiness schema from the confirmed facts**

Add `businessFacts` to the import from `@/lib/constants` in `lib/seo.ts`, then update the LocalBusiness node:

```ts
telephone: businessFacts.phone.schema,
priceRange: "$$",
sameAs,
address: {
  "@type": "PostalAddress",
  addressLocality: businessFacts.location.locality,
  addressRegion: businessFacts.location.region,
  addressCountry: businessFacts.location.country,
},
openingHoursSpecification: [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: businessFacts.hours.weekdays,
    opens: businessFacts.hours.opens,
    closes: businessFacts.hours.closes,
  },
],
areaServed: [
  {
    "@type": "City",
    name: businessFacts.location.locality,
  },
  {
    "@type": "State",
    name: "Missouri",
  },
],
```

Do not add a street address, map URL, review rating, storefront hours, or Google Business Profile identifier.

- [ ] **Step 5: Render the same facts on contact and footer surfaces**

In `app/contact/page.tsx`, import both constants:

```ts
import { businessFacts, contactLinks } from "@/lib/constants";
```

Replace the contact values with:

```tsx
<p className="text-muted text-sm">{businessFacts.location.label}</p>

<a
  href={`mailto:${contactLinks.email}`}
  className="text-primary text-sm hover:underline"
>
  {contactLinks.email}
</a>

<a
  href={businessFacts.phone.href}
  className="text-primary text-sm hover:underline"
>
  {businessFacts.phone.display}
</a>

<div className="text-muted text-sm space-y-1">
  <p>{businessFacts.hours.weekdayLabel}</p>
  <p>{businessFacts.hours.weekendLabel}</p>
</div>

<p className="text-muted text-sm">{businessFacts.responseTime}</p>
```

In `components/layout/Footer.tsx`, update the import and contact list:

```ts
import { businessFacts, contactLinks, navLinks, siteConfig, socialLinks } from "@/lib/constants";
```

```tsx
<ul className="space-y-3 text-muted text-sm">
  <li>{businessFacts.location.label}</li>
  <li>
    <a
      href={`mailto:${contactLinks.email}`}
      className="hover:text-primary transition-colors"
    >
      {contactLinks.email}
    </a>
  </li>
  <li>
    <a
      href={businessFacts.phone.href}
      className="hover:text-primary transition-colors"
    >
      {businessFacts.phone.display}
    </a>
  </li>
</ul>
```

- [ ] **Step 6: Verify and commit the business-facts contract**

Run:

```bash
node --import tsx --test tests/local-search.test.ts
npm run build
```

Expected: all local-search tests pass and Next.js completes a production build without type or metadata errors.

Commit:

```bash
git add app/contact/page.tsx components/layout/Footer.tsx lib/constants.ts lib/seo.ts tests/local-search.test.ts
git commit -m "feat: centralize local business facts"
```

---

### Task 3: Add Human Local Quote Guidance

**Files:**
- Modify: `tests/local-search.test.ts`
- Modify: `lib/constants.ts:1-8`
- Modify: `app/services/page.tsx:205-225`
- Modify: `app/contact/page.tsx:9-70`

**Interfaces:**
- Consumes: Existing `FadeUpSection`, `SectionLabel`, services-page summary surface, contact-page quote flow, and confirmed service capabilities.
- Produces: A service-fit summary for St. Louis buyers and a five-item quote checklist covering artwork/model, product/material, quantity/personalization, deadline, and use/finish constraints.

- [ ] **Step 1: Add a failing people-first content test**

Append this test to `tests/local-search.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the content test to verify it fails**

Run:

```bash
node --import tsx --test tests/local-search.test.ts
```

Expected: FAIL because the service-fit distinctions and five quote checklist labels are not yet present.

- [ ] **Step 3: Make the shared studio and contact descriptions locally specific**

In `lib/constants.ts`, update the shared description used by the footer and LocalBusiness schema:

```ts
description:
  "A St. Louis digital fabrication studio for laser engraving, 3D printing, custom awards, branded products, prototypes, and small-batch production.",
```

In `app/contact/page.tsx`, update the route description while keeping the existing title, path, and keywords:

```ts
description:
  "Request a St. Louis fabrication quote for laser engraving, 3D printing, custom awards, branded products, prototypes, and custom production.",
```

- [ ] **Step 4: Strengthen the existing services summary**

Replace the current `Service Summary` block in `app/services/page.tsx` with:

```tsx
<FadeUpSection className="mt-24 bg-surface border border-white/5 p-8 md:p-12">
  <SectionLabel>Service Summary</SectionLabel>
  <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
    Laser engraving, 3D printing, and custom production in St. Louis
  </h2>
  <p className="text-muted leading-relaxed mt-5 max-w-4xl">
    St. Louis businesses, schools, teams, nonprofits, event organizers,
    local makers, and gift buyers can bring us branded products, awards,
    fundraiser items, prototypes, fixtures, displays, and small production
    runs. A project can start with finished artwork, a 3D model, a catalog
    item, a material question, or a clear description of the result you need.
  </p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/10">
    <div>
      <h3 className="font-display text-sm uppercase tracking-wider mb-3">
        Choose The Process
      </h3>
      <p className="text-muted text-sm leading-relaxed">
        Laser engraving marks an existing item. 3D printing creates a new
        object. Custom production can combine materials, finishing, and
        fulfillment when the job needs more than one step.
      </p>
    </div>
    <div>
      <h3 className="font-display text-sm uppercase tracking-wider mb-3">
        Bring The Details
      </h3>
      <p className="text-muted text-sm leading-relaxed">
        Send the artwork or model, product or material, quantity, deadline,
        personalization data, intended use, and any durability or finish
        constraints that could affect production.
      </p>
    </div>
    <div>
      <h3 className="font-display text-sm uppercase tracking-wider mb-3">
        Confirm The Fit
      </h3>
      <p className="text-muted text-sm leading-relaxed">
        We review the request for material compatibility, file readiness,
        production steps, and timing before recommending a practical path.
      </p>
    </div>
  </div>
</FadeUpSection>
```

- [ ] **Step 5: Add a five-detail quote checklist to the contact page**

Add this constant after `faqs` in `app/contact/page.tsx`:

```ts
const quoteChecklist = [
  {
    title: "Artwork or a 3D model",
    detail: "Send AI, EPS, SVG, PDF, PNG, JPG, STL, STEP, OBJ, or the best source file you have.",
  },
  {
    title: "Product or material",
    detail: "Name the catalog item, material, dimensions, or object you want engraved, printed, cut, or produced.",
  },
  {
    title: "Quantity and personalization",
    detail: "Include the total count and any names, numbers, dates, sponsor marks, or other variable details.",
  },
  {
    title: "Deadline",
    detail: "Share the event date or delivery need so artwork review, proofing, production, and shipping can be assessed.",
  },
  {
    title: "Intended use and finish",
    detail: "Explain where the item will be used and any strength, heat, durability, appearance, or finish constraints.",
  },
] as const;
```

Insert this section between `StampedPageHero` and the form/contact grid:

```tsx
<FadeUpSection className="mb-20 py-10 border-y border-white/10">
  <div className="max-w-3xl mb-8">
    <SectionLabel>Quote Checklist</SectionLabel>
    <h2 className="font-display text-2xl md:text-3xl font-bold mt-4">
      Five details that make a fabrication quote useful
    </h2>
    <p className="text-muted leading-relaxed mt-4">
      For a St. Louis business order, fundraiser, one-off gift, or prototype,
      these details help us review the material, production steps, and timing.
    </p>
  </div>
  <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
    {quoteChecklist.map((item, index) => (
      <li key={item.title} className="min-w-0">
        <span className="text-primary text-xs font-display uppercase tracking-[0.2em]">
          0{index + 1}
        </span>
        <h3 className="font-display text-base font-bold mt-2">
          {item.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mt-2">
          {item.detail}
        </p>
      </li>
    ))}
  </ol>
</FadeUpSection>
```

- [ ] **Step 6: Verify the copy and commit the content change**

Run:

```bash
node --import tsx --test tests/local-search.test.ts
npm run lint
```

Expected: the local-search tests pass and Next lint completes without errors.

Commit:

```bash
git add app/contact/page.tsx app/services/page.tsx lib/constants.ts tests/local-search.test.ts
git commit -m "feat: add local quote guidance"
```

---

### Task 4: Verify Generated Output And Public Boundaries

**Files:**
- Verify: `/`, `/services`, `/contact`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`
- Verify: `docs/superpowers/specs/2026-07-09-local-search-rankings-design.md`

**Interfaces:**
- Consumes: The completed canonical contract, LocalBusiness schema, page copy, test suite, Next.js build, local HTTP output, and public host behavior.
- Produces: Evidence that local output uses only the `www` host, the two changed pages remain readable at desktop and mobile widths, public redirects still resolve to `www`, and authenticated URL Inspection is either run or named as blocked by the missing OAuth client.

- [ ] **Step 1: Run the complete repository verification suite**

Run:

```bash
npm run lint
npm test
npm run build
git diff --check
```

Expected: lint, all Node tests, and the Next.js production build pass; `git diff --check` prints no output.

- [ ] **Step 2: Start the local site and check all required routes**

First confirm port `3017` is free:

```bash
lsof -nP -iTCP:3017 -sTCP:LISTEN
```

Expected: no output. Then start the server in a persistent terminal:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3017
```

Check the required routes:

```bash
curl -fsS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3017/
curl -fsS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3017/services
curl -fsS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3017/contact
curl -fsS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3017/robots.txt
curl -fsS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3017/sitemap.xml
curl -fsS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3017/llms.txt
```

Expected: six `200` responses.

- [ ] **Step 3: Assert rendered canonical, sitemap, robots, llms, and JSON-LD output**

Run this read-only assertion against the local server:

```bash
node --input-type=module <<'NODE'
const host = "https://www.stlouiscreations.com";
const oldHost = "https://stlouiscreations.com";
const paths = ["/", "/services", "/contact", "/robots.txt", "/sitemap.xml", "/llms.txt"];

for (const path of paths) {
  const response = await fetch(`http://127.0.0.1:3017${path}`);
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  const body = await response.text();
  if (body.includes(oldHost)) throw new Error(`${path} contains ${oldHost}`);
  if (!body.includes(host)) throw new Error(`${path} does not contain ${host}`);
}

const home = await fetch("http://127.0.0.1:3017/").then((response) => response.text());
if (!home.includes(`<link rel="canonical" href="${host}"`)) {
  throw new Error("homepage canonical link is missing the www host");
}
if (!home.includes(`${host}/#organization`) || !home.includes(`${host}/brand/logo.png`)) {
  throw new Error("homepage JSON-LD does not use canonical organization and logo URLs");
}

console.log("local canonical output verified");
NODE
```

Expected: `local canonical output verified`.

- [ ] **Step 4: Check desktop and mobile rendering**

Use browser verification at `1440x900` and `390x844` for:

```text
http://127.0.0.1:3017/services
http://127.0.0.1:3017/contact
```

Expected on both viewports:

- The services summary has three readable columns on desktop and one stacked column on mobile.
- The contact quote checklist has five readable columns on wide desktop and stacked responsive rows on mobile.
- No heading, checklist item, contact detail, or CTA overlaps or clips.
- Existing hero images, quote form, footer, and navigation remain visible and usable.

- [ ] **Step 5: Recheck the public host and credential-free Google preflight**

Run:

```bash
curl -I -L https://www.stlouiscreations.com
curl -I -L https://stlouiscreations.com
python3 /Volumes/BotCentral/Users/milo/repos/GoogleCloudSearch/scripts/gsc_workflow.py preflight https://www.stlouiscreations.com
```

Expected before deployment: `www` resolves successfully, non-`www` redirects to `www`, and public homepage/robots/sitemap checks run. Production canonical and sitemap content can remain on the old release until these commits are deployed.

- [ ] **Step 6: Preserve the authenticated Search Console boundary**

Check for the ignored OAuth client:

```bash
test -f /Volumes/BotCentral/Users/milo/repos/GoogleCloudSearch/credentials/oauth-client.json
```

Current expected result: exit status `1`, meaning authenticated URL Inspection remains blocked. Record exactly this in the implementation handoff:

```text
Google Search Console URL Inspection was not run because
/Volumes/BotCentral/Users/milo/repos/GoogleCloudSearch/credentials/oauth-client.json
is absent. Credential-free public preflight was used instead.
```

If the credential file is present at execution time, run the requested inspection through the GCS wrapper and report the returned verdict without copying OAuth data into this repository.

- [ ] **Step 7: Review the final implementation against the approved acceptance criteria**

Confirm each item directly:

```text
- Metadata, schema, sitemap, robots, llms.txt, and public site links use https://www.stlouiscreations.com.
- Non-www public traffic redirects to www.
- LocalBusiness schema contains only visible location, phone, email, hours, service, and area-served facts.
- Services and contact pages tell St. Louis buyers what work fits and what to send for a quote.
- No thin location route, review claim, storefront claim, ranking promise, or Google profile claim was added.
- Lint, tests, build, whitespace checks, route checks, rendered-output checks, and responsive visual checks passed.
- Search Console URL Inspection is reported as completed or blocked with the exact credential reason.
```
