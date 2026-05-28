# Gift Occasion Blog Posts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two current, occasion-focused blog posts: one for laser engraved gift ideas with catalog recommendations and one for 3D printed gift ideas.

**Architecture:** The site stores blog posts as typed objects in `lib/blog-posts.ts`, and the Next.js blog routes render that array directly. This change only appends two new `BlogPost` objects, leaving route behavior and styling unchanged.

**Tech Stack:** Next.js 14 App Router, TypeScript, in-memory blog data, existing Tailwind/prose rendering.

---

### Task 1: Add Laser Engraving Gift Occasion Post

**Files:**
- Modify: `D:\Dev\StLouisCreations-Website\lib\blog-posts.ts`

- [ ] **Step 1: Insert a new `BlogPost` object near the top of `blogPosts`**

Add a post with slug `laser-engraved-gift-ideas-for-special-occasions`, date `2026-05-28`, and content that covers 10 occasions: Father's Day, graduations, weddings, anniversaries, housewarmings, summer parties, back-to-school and teacher gifts, Grandparents Day, Thanksgiving host gifts, and winter holidays.

- [ ] **Step 2: Include catalog recommendations in every numbered section**

Use only catalog items already present in `lib/products.ts` or `lib/polar-camel-products.ts`, including Polar Camel tumblers, water bottles, wine chillers, serving bowls, pet bowls, wood/slate cutting boards, slate coasters, slate decor, decanter sets, champagne and wine glasses, and Airflyte plaques.

- [ ] **Step 3: Keep formatting compatible with the current renderer**

Use paragraphs, `## ` headings, `- ` bullet groups, and `**bold**` emphasis only. Avoid tables, markdown links, and nested lists because `app/blog/[slug]/page.tsx` does not render them as structured elements.

### Task 2: Add 3D Printing Gift Occasion Post

**Files:**
- Modify: `D:\Dev\StLouisCreations-Website\lib\blog-posts.ts`

- [ ] **Step 1: Insert a second `BlogPost` object**

Add a post with slug `3d-printed-gift-ideas-for-special-occasions`, date `2026-05-28`, and content that covers 10 3D printing gift ideas for the same high-intent gift occasions.

- [ ] **Step 2: Reference site capabilities and current catalog examples**

Mention additive manufacturing, custom design, quote-based production, the Feline Sphere Table Lamp, and STLFlix Wacky Weenies where they are relevant. Avoid claiming availability, lead time, pricing, or colors beyond what the catalog already supports.

- [ ] **Step 3: Note the practical design brief for each idea**

Each section should explain what to personalize and why 3D printing fits that occasion, without overpromising engineering, safety, food-contact, or child-toy compliance.

### Task 3: Validate Blog Data

**Files:**
- Test: `D:\Dev\StLouisCreations-Website\lib\blog-posts.ts`

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: Next lint completes without errors.

- [ ] **Step 2: Run catalog test**

Run: `npm run test:catalog`
Expected: Node test runner reports passing catalog sync tests.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Next.js compiles and includes `/blog/laser-engraved-gift-ideas-for-special-occasions` and `/blog/3d-printed-gift-ideas-for-special-occasions` in the generated static routes.

### Self-Review

- Spec coverage: The plan covers both requested blog topics, the single laser engraving post with top 10 ideas and catalog recommendations, and the single 3D printing post with top 10 occasion ideas.
- Placeholder scan: No placeholder implementation steps remain.
- Type consistency: Both posts use the existing `BlogPost` shape: `slug`, `title`, `excerpt`, `date`, `readTime`, and `content`.
