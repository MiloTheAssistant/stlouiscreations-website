# Admin JDS Import

The admin page at `/admin` uses Sign in with Vercel and an `ADMIN_EMAILS`
allowlist. JDS tokens stay server-side.

## Required Environment Variables

```bash
NEXT_PUBLIC_VERCEL_APP_CLIENT_ID="..."
VERCEL_APP_CLIENT_SECRET="..."
ADMIN_EMAILS="owner@example.com"
JDS_API_TOKEN="..."
DATABASE_URL="postgres://..."
```

`ADMIN_EMAILS` accepts a comma-separated list. Imported JDS products default to
draft status in `product_catalog` unless the admin widget explicitly chooses
active.

## Routes

- `/admin` - protected admin UI
- `/api/auth/login` - starts Vercel OAuth
- `/api/auth/callback` - completes Vercel OAuth
- `/api/auth/logout` - clears the admin session
- `/api/admin/jds/preview` - fetches selected JDS SKUs for review
- `/api/admin/jds/import` - imports selected preview records into Postgres

## Import Rules

- Import is SKU-driven. There is no bulk import-all workflow.
- JDS records are written with `source_catalog = "jds_industries_api"`.
- Imported products are quote-required by default.
- Stripe IDs are not accepted from the client and are cleared before upsert.
- Stripe sync remains downstream through the existing catalog sync command.
