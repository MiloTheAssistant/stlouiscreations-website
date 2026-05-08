import { loadEnvConfig } from "@next/env";
import { getLocalCatalogRecords } from "@/lib/catalog/source";
import { upsertCatalogProducts } from "@/lib/catalog/repository";

loadEnvConfig(process.cwd());

async function main() {
  const products = getLocalCatalogRecords();
  await upsertCatalogProducts(products);
  console.log(`Seeded ${products.length} active catalog products into Postgres.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

