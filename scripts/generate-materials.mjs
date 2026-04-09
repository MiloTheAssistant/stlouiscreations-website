#!/usr/bin/env node
/**
 * Generate 8 material photos for the Materials section using Replicate FLUX 1.1 Pro.
 *
 * Usage:
 *   REPLICATE_API_TOKEN=r8_xxx node scripts/generate-materials.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, "..", "public", "images", "materials");

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) {
  console.error("REPLICATE_API_TOKEN env var is required");
  process.exit(1);
}

const MODEL = "black-forest-labs/flux-1.1-pro";
const API = `https://api.replicate.com/v1/models/${MODEL}/predictions`;

const BASE_STYLE =
  "Professional close-up macro photograph, dark industrial studio lighting, dramatic rim light, minimalist composition, single material filling the frame, ultra detailed texture, premium commercial product photography, moody atmosphere, no text, no labels, no people, square format";

const materials = [
  {
    slug: "acrylic",
    prompt: `A single slab of crystal-clear colored acrylic plastic with beveled edges, glowing amber light refracting through it on a black studio backdrop, sharp geometric reflections, ${BASE_STYLE}`,
  },
  {
    slug: "wood",
    prompt: `Natural walnut wood grain close-up, warm brown tones with visible grain flowing diagonally, dramatic side lighting revealing texture, ${BASE_STYLE}`,
  },
  {
    slug: "glass",
    prompt: `A thick slab of clear crystal glass with beveled polished edges on a black studio backdrop, frosted etched logo area on the face, warm amber rim lighting passing through the transparent glass revealing sharp crystalline edges, premium crystal award material, ${BASE_STYLE}`,
  },
  {
    slug: "metal",
    prompt: `Brushed stainless steel surface with fine horizontal grain lines, warm rim lighting from the left, subtle reflections, industrial premium feel, ${BASE_STYLE}`,
  },
  {
    slug: "leather",
    prompt: `Premium cognac brown leather with rich natural grain texture, dramatic warm side lighting, deep shadows, luxurious craftsmanship, ${BASE_STYLE}`,
  },
  {
    slug: "stone",
    prompt: `Natural black slate stone surface with split rugged texture, warm rim lighting revealing depth and fractures, dramatic shadows, ${BASE_STYLE}`,
  },
  {
    slug: "fabric",
    prompt: `Dark woven canvas fabric with visible weave pattern, warm orange side lighting highlighting the threads, rich texture detail, ${BASE_STYLE}`,
  },
  {
    slug: "rubber",
    prompt: `Black industrial rubber sheet with fine matte texture and subtle ribbing pattern, warm dramatic side lighting, deep shadows, ${BASE_STYLE}`,
  },
];

async function generateImage({ slug, prompt }) {
  console.log(`[${slug}] Submitting prediction...`);

  const response = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      Prefer: "wait=60",
    },
    body: JSON.stringify({
      input: {
        prompt,
        aspect_ratio: "1:1",
        output_format: "png",
        output_quality: 100,
        safety_tolerance: 2,
        prompt_upsampling: false,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`[${slug}] HTTP ${response.status}: ${text}`);
  }

  let prediction = await response.json();

  // If still running, poll until complete
  while (prediction.status === "starting" || prediction.status === "processing") {
    await new Promise((r) => setTimeout(r, 2000));
    const poll = await fetch(prediction.urls.get, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    prediction = await poll.json();
    console.log(`[${slug}] ...${prediction.status}`);
  }

  if (prediction.status !== "succeeded") {
    throw new Error(
      `[${slug}] Failed: ${prediction.status} — ${JSON.stringify(prediction.error)}`
    );
  }

  // FLUX 1.1 Pro returns a single URL string as output
  const imageUrl =
    typeof prediction.output === "string" ? prediction.output : prediction.output[0];
  console.log(`[${slug}] Downloading ${imageUrl}`);

  const imgResponse = await fetch(imageUrl);
  if (!imgResponse.ok) {
    throw new Error(`[${slug}] Failed to download image: HTTP ${imgResponse.status}`);
  }
  const buffer = Buffer.from(await imgResponse.arrayBuffer());
  const outputPath = path.join(OUTPUT_DIR, `${slug}.png`);
  await fs.writeFile(outputPath, buffer);
  console.log(`[${slug}] Saved ${outputPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Serial execution with 12s delay between requests to respect
  // Replicate's free-tier rate limit (6/min, burst 1).
  // Skip materials that already have files (resume on failure).
  let ok = 0;
  let fail = 0;
  let skipped = 0;

  for (let i = 0; i < materials.length; i++) {
    const mat = materials[i];
    const existingPath = path.join(OUTPUT_DIR, `${mat.slug}.png`);
    try {
      await fs.access(existingPath);
      console.log(`[${mat.slug}] Already exists, skipping.`);
      skipped++;
      continue;
    } catch {
      // File doesn't exist, proceed
    }

    try {
      await generateImage(mat);
      ok++;
    } catch (err) {
      fail++;
      console.error(`✗ ${mat.slug}:`, err.message || err);
    }

    // Wait 12s between requests (except after the last one)
    if (i < materials.length - 1) {
      console.log("  waiting 12s for rate limit...");
      await new Promise((r) => setTimeout(r, 12000));
    }
  }

  console.log(`\nDone. ${ok} succeeded, ${skipped} skipped, ${fail} failed.`);
  if (fail > 0) process.exit(1);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
