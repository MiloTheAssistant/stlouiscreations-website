# St. Louis Creations Brand Image Library Prompt

Use this prompt to generate and maintain a complete, project-specific brand image library for the St. Louis Creations website.

## Project

- Website/project name: St. Louis Creations
- Website domain: https://stlouiscreations.com
- Repo: D:\Dev\StLouisCreations-Website
- Business/location/audience: A St. Louis digital fabrication studio serving local businesses, creators, teams, schools, fundraisers, brands, and practical makers who need real physical products made with care.
- Current hero image/vibe: Dark fabrication-studio environment with orange light, hands-on production energy, and a premium workshop feel.
- Brand tone: Local maker, material craft, studio precision, creatively scrappy, real, practical, veteran-owned, human, capable, and grounded.
- Brand tagline: Local Craft. Real Materials. Studio Precision.
- Veteran-owned placement: Visible trust signal in supporting copy, profile bios, badges, and about/footer language rather than the primary tagline.
- Brand colors or visual cues: Deep black and charcoal surfaces, warm orange `#FF6B00`, aged gold `#D4A017`, real workshop lighting, material textures, precision tools, physical products, and useful negative space.
- Destination folder: D:\Dev\StLouisCreations-Website\public\brand

## Current Public Asset Structure

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

Use `public/brand/` for the generated brand-library system. Keep app-wired scene imagery in `public/images/brand/` unless the code references are updated in the same change.

## Goal

Create project-specific image assets that complement the existing hero and give St. Louis Creations a stronger human-centered visual identity across the website and major social platforms.

Use a Hybrid Brand Library with a human-focused brand stamp and clean photoreal platform backgrounds.

## Proposed `public/brand/README.md` Structure

### Purpose

Make `public/brand/README.md` the source of truth for St. Louis Creations brand imagery: what the vibe is, what assets exist, how future images should be generated, and how to approve them.

### Brand Core

St. Louis Creations: "Local Craft. Real Materials. Studio Precision." A veteran-owned local fabrication studio turning scrappy ideas, useful products, branded gifts, materials, and custom projects into real physical work.

### Balanced Trinity

- Local Maker: real studio presence, St. Louis roots, practical creativity, approachable service, veteran-owned trust.
- Material Craft: wood, metal, acrylic, glass, leather, stone, fabric, rubber, drinkware, awards, gifts, and tangible finishes.
- Studio Precision: laser engraving, additive manufacturing, clean production workflows, careful detail, and repeatable quality.
- 3D Printing / Additive Manufacturing: printer workflow, filament, functional prototypes, finished parts, fixtures, custom objects, and small-batch production.

### Anti-Slop Standard

Artistic freedom stays inside the Trinity. Technical execution stays disciplined: small source families, standard dimensions, no fake readable text, no watermark, no clutter, no unrelated scenes, no one-off visual gimmicks.

### Quality Rules

Photorealistic, premium, overlay-safe, brand-coherent, no fake UI text, no logos, no stock-photo clutter, and no people as main subjects except anonymous/profile-stamp use.

### Asset System

Masters, website profile, Facebook, Instagram, TikTok, LinkedIn, and X. Keep the current source-family approach so each platform asset feels related instead of one-off.

### Prompt Framework

Use the reusable St. Louis Creations prompt framework below, adapted from the referenced BrandImageLibrary, with fields already filled and placeholders only where future asset-specific choices are needed.

### Approval Checklist

Lane, use case, visual quality, technical sizing, negative space, no AI slop, continuity with source family, and fit with Local Maker + Material Craft + Studio Precision.

### Current Inventory

The current file list from `public/brand`.

## Required Output

1. A main human-focused brand stamp/profile image that works as the primary profile picture.
2. Clean photoreal background assets for:
   - Website
   - Facebook
   - Instagram
   - TikTok
   - LinkedIn
   - X / Twitter

## Direction

Use a Hybrid Brand Library approach:

- One strong profile stamp / profile image.
- A related family of platform-native photoreal backgrounds.
- Keep the assets visually unified, but compose them for each platform's crop and use case.
- Lead with Local Maker, enrich with Material Craft texture, and keep Studio Precision as the quality discipline.
- Treat veteran-owned as a visible trust signal, not a heavy-handed slogan.

## Profile Stamp Rules

- Human-centered brand mark, not just an abstract background.
- Circular-crop safe.
- Strong at small profile-picture sizes.
- May imply the studio, hands-on craft, initials, or core fabrication idea, but do not rely on AI-generated readable text.
- No fake words, watermarks, slogans, or detailed typography.
- Should feel like a premium dimensional studio stamp, not a generic stock logo.

## Background Rules

- Clean photoreal backgrounds.
- No embedded text, logos, slogans, or watermarks.
- Leave negative space for future overlays.
- Use real-world scenes connected to fabrication, materials, local studio work, and practical making.
- Human presence is welcome, but keep people anonymous or secondary unless specifically requested.
- Avoid distorted hands, clutter, fake readable UI text, and generic stock-photo energy.

## Folder Structure

```text
public/brand/
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
```

## Asset Targets

```text
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

public/brand/website/profile-stamp.png
public/brand/website/profile-background.png

public/brand/facebook/profile-stamp.png
public/brand/facebook/cover-background.png
public/brand/facebook/post-background.png

public/brand/instagram/profile-stamp.png
public/brand/instagram/profile-background.png
public/brand/instagram/post-background.png
public/brand/instagram/story-background.png

public/brand/tiktok/profile-stamp.png
public/brand/tiktok/profile-background.png
public/brand/tiktok/cover-background.png

public/brand/linkedin/profile-stamp.png
public/brand/linkedin/company-cover-background.png
public/brand/linkedin/post-background.png

public/brand/x/profile-stamp.png
public/brand/x/header-background.png
public/brand/x/post-background.png
```

## Reusable Prompt Framework

```text
Create a complete photoreal brand image asset for St. Louis Creations.

Brand:
- Name: St. Louis Creations
- Domain: https://stlouiscreations.com
- Tagline: Local Craft. Real Materials. Studio Precision.
- Identity: Veteran-owned St. Louis digital fabrication studio.
- Vibe: Local Maker with Material Craft texture and Studio Precision discipline.
- Visual cues: dark fabrication studio, warm orange and aged gold light, real materials, useful negative space, tactile finishes, practical tools, premium local workshop credibility.
- Avoid: fake readable text, fake UI, fake logos, watermarks, clutter, unrelated scenes, generic stock-photo people, distorted hands, and one-off gimmicks.

Asset:
- Platform/use case: [PLATFORM AND USE CASE]
- Orientation/dimensions: [TARGET DIMENSIONS]
- Composition needs: [NEGATIVE SPACE / CROP SAFETY / PROFILE CIRCLE / OVERLAY AREA]
- Source family lane: [Local Maker / Material Craft / Studio Precision]
- For 3D printing assets, use source family lane: [3D Printing Studio / 3D Printing Materials / 3D Printed Parts]

Generate a clean, photoreal, premium, overlay-safe asset that feels connected to the St. Louis Creations website and can live inside the same brand family as the existing hero image. Do not include readable text, logos, slogans, or watermarks.
```

## After Generation

- Save all final PNGs into the platform folders.
- Validate that every file exists, opens as an image, has nonzero size, and has sensible platform dimensions.
- Create a contact sheet preview showing all generated assets.
- Do not overwrite the existing hero unless explicitly asked.
- Do not move existing app-referenced assets unless code references are updated in the same change.

## Current Inventory

```text
public/brand/README.md
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
public/brand/website/.gitkeep
public/brand/facebook/.gitkeep
public/brand/instagram/.gitkeep
public/brand/tiktok/.gitkeep
public/brand/linkedin/.gitkeep
public/brand/x/.gitkeep
```

Brand-relevant site imagery currently outside the generated brand library:

```text
public/images/brand/hero-fabrication-studio.png
public/og-image.png
```
