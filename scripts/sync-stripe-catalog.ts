import { loadEnvConfig } from "@next/env";
import { getLocalCatalogRecords } from "@/lib/catalog/source";
import {
  getCatalogProductsForStripeSync,
  upsertCatalogProducts,
} from "@/lib/catalog/repository";
import { syncCatalogProductToStripe } from "@/lib/stripe/catalog-sync";

loadEnvConfig(process.cwd());

function readFlagValue(name: string): string | null {
  const prefix = `--${name}=`;
  const arg = process.argv.find((value) => value.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : null;
}

function hasFlag(name: string): boolean {
  return process.argv.includes(`--${name}`);
}

async function main() {
  const apply = hasFlag("apply");
  const sku = readFlagValue("sku")?.toUpperCase() ?? null;
  const limit = Number(readFlagValue("limit") ?? "0");

  await upsertCatalogProducts(getLocalCatalogRecords());

  const products = (await getCatalogProductsForStripeSync())
    .filter((product) => !sku || product.sku === sku)
    .slice(0, limit > 0 ? limit : undefined);

  if (!apply) {
    console.log(
      `Dry run: ${products.length} products are ready for Stripe sync. Pass --apply to write to Stripe.`
    );
    console.log(products.slice(0, 10).map((product) => product.sku).join(", "));
    return;
  }

  for (const product of products) {
    const result = await syncCatalogProductToStripe(product);
    console.log(
      `${result.sku}: ${result.productAction} product ${result.stripeProductId}, ${result.priceAction} price ${result.stripePriceId}`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
