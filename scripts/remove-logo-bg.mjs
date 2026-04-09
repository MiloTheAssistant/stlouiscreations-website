#!/usr/bin/env node
/**
 * Strip the dark background from public/brand/logo.png using
 * @imgly/background-removal-node (runs locally via ONNX models).
 *
 * Usage:
 *   node scripts/remove-logo-bg.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { removeBackground } from "@imgly/background-removal-node";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOGO_PATH = path.resolve(__dirname, "..", "public", "brand", "logo.png");
const BACKUP_PATH = path.resolve(__dirname, "..", "public", "brand", "logo-original.png");

async function main() {
  console.log("Backing up original to logo-original.png");
  await fs.copyFile(LOGO_PATH, BACKUP_PATH);

  console.log("Reading logo...");
  const buffer = await fs.readFile(LOGO_PATH);
  const blob = new Blob([buffer], { type: "image/png" });

  console.log("Running background removal (this downloads ~100MB of ONNX models on first run)...");
  const resultBlob = await removeBackground(blob, {
    output: { format: "image/png", quality: 1.0 },
  });

  const resultBuffer = Buffer.from(await resultBlob.arrayBuffer());
  await fs.writeFile(LOGO_PATH, resultBuffer);
  console.log(`Saved transparent logo to ${LOGO_PATH} (${(resultBuffer.length / 1024).toFixed(0)} KB)`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
