# Stripe Catalog Sync

Local Postgres is the product vault. Stripe is only the register.

## Data Model

`product_catalog` stores the source-of-truth storefront catalog fields:

- `sku`
- `slug`
- `title`
- `description`
- `category`
- `supplier`
- `images`
- `tags`
- `base_price`
- `quote_required`
- `personalization_available`
- `personalization_note`
- `personalization_cost_extra`
- `source_catalog`
- `stripe_product_id`
- `stripe_price_id`
- `last_synced_at`

`quote_requests` is ready for the quote flow:

1. Product page
2. Request quote form
3. Admin approves final price
4. Create Stripe Checkout Session or invoice
5. Customer pays

## Vercel Setup

Use the Vercel Marketplace Neon integration for this project, then pull env vars locally:

```bash
vercel env pull .env.local --yes
```

The app expects:

```bash
DATABASE_URL="postgres://..."
STRIPE_SECRET_KEY="sk_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
NEXT_PUBLIC_SITE_URL="https://stlouiscreations.com"
```

Keep Neon on the smallest/free usage tier while this is catalog and quote data only. Avoid always-on jobs. Run syncs manually after catalog edits or as a low-frequency scheduled job later.

## Commands

Run migrations:

```bash
npm run db:migrate
```

Seed Postgres from the local TypeScript catalog:

```bash
npm run catalog:seed
```

Dry-run the Stripe sync:

```bash
npm run stripe:sync-catalog
```

Sync one SKU to Stripe:

```bash
npm run stripe:sync-catalog -- --sku=DCS301S --apply
```

Sync a small batch:

```bash
npm run stripe:sync-catalog -- --limit=25 --apply
```

## Stripe Rules

- Match by `sku` metadata and `source_catalog`.
- Create or update Stripe Products from Postgres.
- Use metadata: `sku`, `supplier`, `category`, `source_catalog`.
- If `base_price` changes, create a new Stripe Price, deactivate the old Price, update `product_catalog.stripe_price_id`.
- Use idempotency keys for Stripe create/update/deactivate calls.
- Do not edit the Stripe dashboard as the master catalog.
