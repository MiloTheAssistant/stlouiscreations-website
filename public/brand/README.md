# St. Louis Creations Brand Imagery

## Purpose

This is the source of truth for St. Louis Creations brand imagery: what the vibe is, what assets exist, how future images should be generated, and how to approve them.

## Brand Core

St. Louis Creations: "Local Craft. Real Materials. Studio Precision."

We are a veteran-owned St. Louis digital fabrication studio turning scrappy ideas, useful products, branded gifts, materials, and custom projects into real physical work.

## Balanced Trinity

- Local Maker: real studio presence, St. Louis roots, practical creativity, approachable service, veteran-owned trust.
- Material Craft: wood, metal, acrylic, glass, leather, stone, fabric, rubber, drinkware, awards, gifts, and tangible finishes.
- Studio Precision: laser engraving, additive manufacturing, clean production workflows, careful detail, and repeatable quality.
- 3D Printing / Additive Manufacturing: printer workflow, filament, functional prototypes, finished parts, fixtures, custom objects, and small-batch production.

## Anti-Slop Standard

Artistic freedom stays inside the Trinity. Technical execution stays disciplined: small source families, standard dimensions, no fake readable text, no watermark, no clutter, no unrelated scenes, no one-off visual gimmicks.

## Quality Rules

- Photorealistic and premium.
- Overlay-safe with useful negative space.
- Brand-coherent with the dark studio, orange, and gold website system.
- No fake UI text, fake labels, logos, slogans, or watermarks.
- No stock-photo clutter.
- No people as main subjects except anonymous/profile-stamp use.
- Veteran-owned should appear as a visible trust signal in supporting copy, not as heavy-handed art direction.

## Asset System

Use masters, website profile assets, and platform-native assets for Facebook, Instagram, TikTok, LinkedIn, and X.

The canonical brand-library structure is:

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

Keep `public/brand/` for reusable brand assets. Website scene imagery that is already wired into app pages, such as `public/images/brand/hero-fabrication-studio.png`, stays in `public/images/brand/` unless code references are updated at the same time.

Keep a source-family approach:

- Local Maker source family for human, studio, and local presence.
- Material Craft source family for surfaces, products, and tactile finishes.
- Studio Precision source family for tools, detail, and clean production confidence.
- 3D Printing source family for additive manufacturing workflow, materials, prototypes, and finished parts.

## Prompt Framework

```text
Create a complete photoreal brand image asset for St. Louis Creations.

Brand:
- Name: St. Louis Creations
- Domain: https://www.stlouiscreations.com
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

## Approval Checklist

- Lane: Local Maker, Material Craft, or Studio Precision is clear.
- Use case: platform and crop are known before approval.
- Visual quality: photoreal, premium, tactile, and not generic.
- Technical sizing: dimensions match intended platform use.
- Negative space: overlays can be added later without fighting the image.
- No AI slop: no fake readable text, distorted hands, watermarking, clutter, or unrelated scenes.
- Continuity: asset belongs with the existing site, logo, and hero image.

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
