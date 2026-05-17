# Public Asset Structure

This folder contains all static assets served by the St. Louis Creations website.

## Source Of Truth

- `BrandImageLibrary.md` in the repo root defines the brand-library prompt, asset targets, and generation rules.
- `public/brand/README.md` defines the brand imagery system, approval checklist, and current brand inventory.
- This file explains the folder structure for everything under `public`.

## Folder Structure

```text
public/
  README.md
  og-image.png
  brand/
    README.md
    logo.png
    logo-original.png
    masters/
    website/
    facebook/
    instagram/
    tiktok/
    linkedin/
    x/
  images/
    brand/
    materials/
    products/
```

## What Belongs Where

`public/brand/` is the controlled brand image library. Put reusable brand identity, profile, source-family, and platform-native social assets here.

`public/images/brand/` is for website scene imagery that is already wired into the app, such as the homepage and about-page hero image.

`public/images/materials/` is for material category imagery used by the materials experience.

`public/images/products/` is for product catalog imagery and product-specific media.

`public/og-image.png` is the current Open Graph fallback image referenced by site metadata.

## Current Brand-Relevant Assets

```text
public/brand/logo-original.png
public/brand/logo.png
public/brand/masters/profile-stamp.png
public/brand/masters/profile-stamp-3d-printing.png
public/brand/masters/profile-stamp-combined.png
public/brand/masters/profile-stamp-combined-transparent.png
public/brand/masters/profile-stamp-combined-clean.png
public/brand/masters/source-family-local-maker.png
public/brand/masters/source-family-material-craft.png
public/brand/masters/source-family-studio-precision.png
public/brand/masters/source-family-3d-printing-studio.png
public/brand/masters/source-family-3d-printing-materials.png
public/brand/masters/source-family-3d-printing-finished-parts.png
public/brand/masters/contact-sheet.png
public/images/brand/hero-fabrication-studio.png
public/og-image.png
```

## Rules

- Do not move existing app-referenced assets unless the code references are updated in the same change.
- Generated brand-library assets should follow the `public/brand/` platform folder structure from `BrandImageLibrary.md`.
- Product images stay in `public/images/products/`.
- Material images stay in `public/images/materials/`.
- Avoid dumping one-off generated images directly into `public/` root.
