# GEO Audit Report: St. Louis Creations

**Audit Date:** May 13, 2026
**Target:** https://stlouiscreations.com
**Local Repo:** D:\Dev\StLouisCreations-Website
**Business Type:** Local service, ecommerce, and custom fabrication studio
**Pages Checked:** Homepage, services, materials, shop, about, contact, robots.txt, sitemap.xml, llms.txt

## Executive Summary

St. Louis Creations has a crawlable, production-ready Next.js site with a live sitemap, clear public routes, and broad crawler access. The main GEO gap is not basic crawlability; it is machine interpretation. The live site currently lacks JSON-LD schema, lacks canonical links in rendered HTML, had no public llms.txt before this audit, and has weak self-contained answer passages for AI citation.

The practical priority is to make the site easier for ChatGPT, Claude, Perplexity, Gemini, Google Search, and Google AI Overview systems to understand as a named local fabrication business with services, products, material expertise, and contact signals.

## Score Breakdown

Composite GEO score: **60/100**

| Category | Score | Weight | Notes |
| --- | ---: | ---: | --- |
| AI citability and visibility | 55 | 25% | Crawler access is good, but homepage answer blocks are short and weakly self-contained. |
| Brand authority and entity signals | 65 | 20% | Brand, location, contact, and social signals exist, but entity schema and sameAs markup are missing. |
| Content quality and E-E-A-T | 72 | 20% | Good service and material content foundation; needs more explicit proof, FAQs, and cite-ready passages. |
| Technical foundations | 78 | 15% | Homepage, key routes, robots.txt, and sitemap.xml resolve; canonical and host consistency need work. |
| Structured data | 10 | 10% | No JSON-LD schema detected in live rendered HTML. |
| Platform optimization | 62 | 10% | Major crawler access is allowed, but llms.txt and AI-specific entity clarity were missing before this audit. |

## Live Technical Snapshot

| Check | Result |
| --- | --- |
| Homepage | 200 |
| /services | 200 |
| /materials | 200 |
| /shop | 200 |
| /about | 200 |
| /contact | 200 |
| /robots.txt | 200 |
| /sitemap.xml | 200, large generated sitemap present |
| /llms.txt | 404 before this audit; draft added at `public/llms.txt` |
| JSON-LD | 0 schema blocks detected |
| Homepage images | 16 images, 6 missing alt text in audit fetch |
| Quick GEO/SEO score | 76/100 from the skill quick snapshot |
| Citability score | 24/100 average across detected answer blocks |

## AI Crawler Access Matrix

The current live robots.txt is:

```txt
User-Agent: *
Allow: /
Disallow: /api/

Sitemap: https://stlouiscreations.com/sitemap.xml
```

Direct homepage requests using the crawler user-agent tokens below returned HTTP 200 during the audit.

| Platform | User Agent / Control | Access | Notes |
| --- | --- | --- | --- |
| ChatGPT / OpenAI Search | OAI-SearchBot | Allowed | OpenAI recommends allowing OAI-SearchBot for ChatGPT search visibility. |
| OpenAI training crawler | GPTBot | Allowed | Useful if the business wants future OpenAI model training inclusion. |
| ChatGPT user actions | ChatGPT-User | Allowed by HTTP test | OpenAI notes user-initiated actions may not rely on robots.txt in the same way as crawlers. |
| Claude Search | Claude-SearchBot | Allowed | Anthropic describes this as search optimization crawling. |
| Claude training crawler | ClaudeBot | Allowed | Anthropic uses this for model-development crawling. |
| Claude user actions | Claude-User | Allowed | Anthropic describes this as user-directed retrieval. |
| Perplexity Search | PerplexityBot | Allowed | Perplexity recommends allowing this crawler for search-result visibility. |
| Perplexity user actions | Perplexity-User | Allowed by HTTP test | Perplexity describes this as user-requested retrieval. |
| Google Search / AI Overview | Googlebot | Allowed | Google AI Overview eligibility is tied to Google Search systems, not a separate llms.txt switch. |
| Gemini / Vertex AI control | Google-Extended | Allowed by catch-all robots rule | Google says this is a robots.txt control token, not a separate HTTP user agent string. |

## Findings

### Critical

None found. The live site is publicly reachable, core routes resolve, and the robots policy does not block search or AI crawlers.

### High

#### 1. No JSON-LD schema detected

The live homepage audit found zero JSON-LD schema blocks. For this site, that leaves AI systems and search engines to infer the entity, business type, services, location, social profiles, and product catalog from page text alone.

Recommended fix:
- Add `Organization` and `LocalBusiness` schema at the site shell or homepage.
- Add `WebSite` schema with the canonical site URL.
- Add `Service` schema for laser engraving, additive manufacturing, and custom production.
- Add `Product` or `Offer` schema only for real public products with supported data.
- Add `sameAs` links for the established Facebook, Instagram, and other durable profiles.

#### 2. Homepage content has weak AI citation blocks

The citability scorer found an average score of 24/100 across detected homepage answer blocks. The issue is not the visual design; it is that extractable passages are short, brand-heavy, and light on direct question-answer phrasing.

Recommended fix:
- Add concise, self-contained sections that answer obvious AI-search queries:
  - What does St. Louis Creations do?
  - What laser engraving services are available in St. Louis?
  - What materials can St. Louis Creations engrave or fabricate?
  - Does St. Louis Creations support fundraisers, corporate gifts, awards, and custom products?
- Keep these sections visually integrated, not keyword-stuffed.

### Medium

#### 3. Canonical URLs are missing from rendered HTML

The quick audit did not detect a canonical link. The site also showed a `www` final URL in the quick fetch while metadata and sitemap use the non-www domain. That creates avoidable ambiguity for search and AI systems.

Recommended fix:
- Choose the canonical host, likely `https://stlouiscreations.com`.
- Add `alternates.canonical` in App Router metadata for the root and important routes.
- Confirm Vercel/domain redirects consistently resolve to the chosen canonical host.

#### 4. llms.txt was not available

The live URL returned 404 for `/llms.txt` before this audit. A draft has now been generated at `public/llms.txt`.

Recommended fix:
- Review and approve the generated file.
- Deploy it so `https://stlouiscreations.com/llms.txt` returns 200.
- Re-test format after deployment.

#### 5. Image alt text gaps remain

The homepage audit found 6 missing alt attributes among 16 images. At least one decorative hero image intentionally uses empty alt text, which can be valid, but the remaining missing values should be reviewed.

Recommended fix:
- Keep empty alt only for purely decorative imagery.
- Add descriptive alt text to product, material, studio, and catalog imagery that carries meaning.

### Low

#### 6. Sitemap lastmod values are build-time generated

The sitemap is present and comprehensive, but many routes share the same `lastmod` timestamp. This is acceptable for a small site, but less precise as the product catalog grows.

Recommended fix:
- Use real content/product update timestamps when available.
- Keep static legal pages on slower update frequencies.

## Platform Visibility Notes

### ChatGPT

The site is accessible to OAI-SearchBot, GPTBot, and ChatGPT-User in the current test. The key improvement is adding schema and better answer blocks so ChatGPT Search can describe and cite the business accurately.

### Claude

ClaudeBot, Claude-SearchBot, and Claude-User can access the homepage. Claude visibility should improve from clearer service/entity text and direct FAQ-style answers.

### Perplexity

PerplexityBot and Perplexity-User can access the homepage. Perplexity tends to reward pages that can be summarized and cited cleanly, so the same answer-block and schema work helps here.

### Gemini

Google-Extended is allowed by the catch-all robots policy. Google documents Google-Extended as a control token for Gemini Apps, Vertex AI API for Gemini, and related grounding uses, not as a separate request user agent.

### Google AI Overview

Google AI Overview visibility depends on normal Google Search discovery, indexing, content quality, and query relevance. The site is not blocked from Googlebot. Improving canonical consistency, structured data, answer clarity, and entity signals is the right path.

## Quick Wins

1. Deploy `public/llms.txt` after review.
2. Add canonical metadata for the root and high-value pages.
3. Add Organization, LocalBusiness, WebSite, and Service JSON-LD.
4. Add a concise FAQ or answer section to the homepage and services page.
5. Review homepage alt text and fill meaningful image descriptions.
6. Add sameAs profile links to schema using the established social URLs.

## 30-Day GEO Improvement Plan

### Phase 1: Technical Interpretation

- Add canonical metadata across core routes.
- Add site/entity JSON-LD.
- Deploy and verify `/llms.txt`.
- Re-run live checks for `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and homepage rendered HTML.

### Phase 2: Service And Product Clarity

- Add Service schema and cite-ready service summaries for:
  - precision laser engraving
  - additive manufacturing
  - custom design and production
  - fundraiser products
  - branded drinkware
  - awards and recognition
- Add page-specific metadata where route metadata is generic.
- Add product schema only where product data supports it.

### Phase 3: Trust And Entity Authority

- Add a compact "why trust this studio" section with factual proof points.
- Strengthen About and Contact pages with consistent business details.
- Add sameAs links to schema for official social profiles.
- Consider adding Google Business Profile, YouTube, LinkedIn, and other durable profile links once confirmed.

### Phase 4: Measurement

- Re-run the GEO quick audit after deployment.
- Re-run citability scoring on homepage and service pages.
- Verify Google Search Console indexing, sitemap ingestion, and canonical host selection.
- Monitor server logs or analytics for AI crawler hits where available.

## Expected Tests For Implementation

Run after any approved code implementation:

```powershell
npm run lint
npm run build
npm run test:catalog
```

Run after local server or preview deployment:

```powershell
Invoke-WebRequest http://localhost:3000/robots.txt
Invoke-WebRequest http://localhost:3000/sitemap.xml
Invoke-WebRequest http://localhost:3000/llms.txt
Invoke-WebRequest https://stlouiscreations.com/robots.txt
Invoke-WebRequest https://stlouiscreations.com/sitemap.xml
Invoke-WebRequest https://stlouiscreations.com/llms.txt
```

## Source References For Crawler Facts

- OpenAI crawler documentation: https://developers.openai.com/api/docs/bots
- Anthropic crawler documentation: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity crawler documentation: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- Google crawler documentation: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers
