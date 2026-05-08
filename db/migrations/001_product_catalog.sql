create extension if not exists pgcrypto;

create table if not exists product_catalog (
  sku text primary key,
  slug text not null unique,
  title text not null,
  description text not null default '',
  category text not null,
  subcategory text,
  supplier text not null default 'St. Louis Creations',
  images jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  base_price integer not null check (base_price >= 0),
  quote_required boolean not null default false,
  personalization_available boolean not null default false,
  personalization_note text,
  personalization_cost_extra boolean not null default false,
  source_catalog text not null,
  stripe_product_id text,
  stripe_price_id text,
  status text not null default 'active',
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists product_catalog_stripe_product_id_idx
  on product_catalog (stripe_product_id);

create index if not exists product_catalog_source_catalog_idx
  on product_catalog (source_catalog);

alter table product_catalog
  add column if not exists subcategory text;

create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  product_sku text references product_catalog (sku),
  customer_name text not null,
  customer_email text not null,
  request_notes text,
  status text not null default 'requested',
  approved_price integer check (approved_price is null or approved_price >= 0),
  stripe_product_id text,
  stripe_price_id text,
  stripe_checkout_session_id text,
  stripe_invoice_id text,
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  paid_at timestamptz
);

create index if not exists quote_requests_product_sku_idx
  on quote_requests (product_sku);

