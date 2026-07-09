# Local Search Rankings And Content Design

## Goal

Improve Google local search readiness for St. Louis Creations by aligning the live `www` host across technical SEO signals and adding useful local proof content for buyers looking for laser engraving, 3D printing, custom awards, corporate gifts, fundraiser products, and small-batch fabrication in the St. Louis area.

## Approved Direction

Use the recommended combined approach:

- Make `https://www.stlouiscreations.com` the canonical host because the live Vercel deployment resolves non-`www` traffic to `www`.
- Keep the existing Next.js App Router SEO foundation and update the source-of-truth helpers instead of scattering one-off metadata strings.
- Strengthen local relevance with content that helps real quote buyers, not doorway pages or repeated city-keyword copy.
- Keep Google Search Console URL Inspection in scope as a verification step, but treat it as blocked until `GoogleCloudSearch/credentials/oauth-client.json` exists in the ignored workflow repo.

## Current Baseline

The repo is a clean `main` checkout for a Next.js App Router site using `next@14.2.35`, npm, and Vercel. Existing SEO assets include:

- `lib/seo.ts` with canonical helpers and JSON-LD builders.
- `app/layout.tsx` with root metadata and site-level JSON-LD.
- `app/sitemap.ts` and `app/robots.ts`.
- `public/llms.txt`.
- Topic hubs in `lib/topic-hubs.ts`.
- A prior GEO audit in `docs/GEO-AUDIT-REPORT.md`.

Public checks on July 9, 2026:

- `https://www.stlouiscreations.com/` returns HTTP 200.
- `https://stlouiscreations.com` redirects to `https://www.stlouiscreations.com/` with HTTP 307.
- The rendered `www` homepage currently declares `https://stlouiscreations.com` as canonical.
- The live sitemap served from `https://www.stlouiscreations.com/sitemap.xml` currently emits non-`www` URLs.
- `https://www.stlouiscreations.com/robots.txt` returns HTTP 200 and mentions the sitemap.
- `https://www.stlouiscreations.com/sitemap.xml` returns HTTP 200 and looks like XML.

Google Search Console URL Inspection did not run because the local workflow has no OAuth client file at `GoogleCloudSearch/credentials/oauth-client.json`. A temporary isolated Python environment successfully installed the workflow dependencies, so the remaining blocker is credentials, not package installation.

## Design Principles

1. The canonical host must match the live resolving host: `https://www.stlouiscreations.com`.
2. Source-of-truth constants should drive canonical URLs, sitemap URLs, JSON-LD URLs, Open Graph URLs, and `/llms.txt` entries where practical.
3. Local search copy should answer customer questions about real St. Louis services, quote inputs, materials, timelines, and buyer fit.
4. Do not create thin location pages for towns, neighborhoods, or services without specific proof, examples, or useful decision guidance.
5. Do not claim Google ranking improvement, Google Business Profile verification, reviews, physical storefront access, or Search Console index status unless verified.

## Architecture

The implementation should stay inside the existing App Router structure.

`lib/constants.ts` remains the business facts layer: site name, descriptor, description, social links, contact links, services, product categories, and value propositions. If a canonical URL constant is needed there, it should be the single exported value used by the rest of the site.

`lib/seo.ts` remains the SEO assembly layer: `canonicalHost`, `absoluteUrl`, metadata helpers, and JSON-LD builders. The canonical host should change to `https://www.stlouiscreations.com`, and downstream JSON-LD should inherit that change.

`app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` should consume or mirror the same canonical host decision. The root metadata, sitemap locations, and robots sitemap URL should not disagree.

`public/llms.txt` should use `www` URLs so AI and search systems see the same preferred host as users and Vercel.

Local proof content should be added to existing page surfaces first:

- Services page: clearer St. Louis service summary and quote-fit guidance.
- Contact page: stronger local quote readiness details and visible consistency for phone, email, location, hours, and response expectations.
- About or homepage trust section if needed: concise proof of who the studio serves and what types of local projects it handles.
- Topic hubs only when the content answers a specific buyer question already represented in `lib/topic-hubs.ts`.

## Content Design

The content should use a practical local buyer voice:

- Name the audience: St. Louis businesses, schools, teams, nonprofits, event organizers, local makers, and gift buyers.
- Name the work: laser engraving, additive manufacturing, custom awards, branded drinkware, sponsor gifts, fundraiser products, prototypes, fixtures, displays, and small-batch production.
- Explain quote readiness: artwork files, product or material, quantity, deadline, personalization data, intended use, and any durability or finish constraints.
- Make service fit clear: engraving marks existing items; 3D printing creates new objects; custom production can combine materials, finishing, and fulfillment.
- Use claims already supported by the site. The existing contact page supports St. Louis, MO, `contact@stlouiscreations.com`, `(573) 500-0064`, Monday-Friday hours, and 24-hour business-day response language.

Avoid:

- Repeating "St. Louis" in every sentence.
- Inventing reviews, awards, customers, storefront visits, or certifications.
- Adding large generic introductions.
- Creating pages whose only unique element is a city or service keyword.

## Data Flow

1. Business facts live in `lib/constants.ts`.
2. URL helpers and schema builders in `lib/seo.ts` format those facts into metadata and JSON-LD.
3. App Router metadata exports in route files use `createPageMetadata`.
4. `app/sitemap.ts` emits crawlable public URLs with the canonical host.
5. `app/robots.ts` points crawlers to the canonical sitemap.
6. Page components render customer-facing content and JSON-LD through `components/seo/JsonLd.tsx`.
7. Public verification checks inspect rendered HTML, sitemap XML, robots output, and JSON-LD script output.

## Error Handling And Boundaries

If a canonical host helper is changed, every generated URL surface must be checked for mixed host output.

If Search Console credentials are still missing, record URL Inspection as blocked and run public checks instead. Do not copy OAuth secrets into this repo.

If Google Business Profile status, reviews, storefront details, or map listing URLs are not available from verified source material, leave them out of code and content.

If implementation touches UI copy, verify desktop and mobile rendering because the current design uses dense dark sections, image-backed heroes, and compact cards.

## Verification

Implementation must include these local checks:

- `npm run lint`
- `npm run build`
- `npm run test`
- `git diff --check`
- Local or preview checks for `/`, `/services`, `/contact`, `/robots.txt`, `/sitemap.xml`, and `/llms.txt`.
- Rendered HTML check that canonical links use `https://www.stlouiscreations.com`.
- Sitemap check that emitted `<loc>` values use `https://www.stlouiscreations.com`.
- JSON-LD check that `url`, `@id`, logo, image, and service links use the `www` host.

Production or preview verification should include:

- `curl -I -L https://www.stlouiscreations.com`
- `curl -I -L https://stlouiscreations.com`
- `curl -fsSL https://www.stlouiscreations.com/sitemap.xml`
- `curl -fsSL https://www.stlouiscreations.com/robots.txt`
- Google Search Console URL Inspection for `https://www.stlouiscreations.com/` once credentials are present.

## Acceptance Criteria

- `https://www.stlouiscreations.com` is the only canonical host emitted by metadata, schema, sitemap, robots, and `/llms.txt`.
- The site still serves `www` successfully and the non-`www` redirect behavior is documented in verification notes.
- Local business schema remains valid and uses only supported, visible business facts.
- Services and contact content give a St. Louis buyer clear next steps without search-engine-first filler.
- Existing tests and build checks pass.
- Any Search Console URL Inspection result is either recorded from the authenticated workflow or explicitly marked blocked by missing OAuth credentials.

## Source References

- Google Business Profile local ranking guidance: `https://support.google.com/business/answer/7091`
- Google LocalBusiness structured data guidance: `https://developers.google.com/search/docs/appearance/structured-data/local-business`
- Google helpful content guidance: `https://developers.google.com/search/docs/fundamentals/creating-helpful-content`
- Google AI search optimization guidance: `https://developers.google.com/search/docs/fundamentals/ai-optimization-guide`
- Next.js App Router metadata, sitemap, robots, and JSON-LD guidance queried through Context7 library `/vercel/next.js`.
