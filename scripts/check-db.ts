import { loadEnvConfig } from "@next/env";
import { getSql } from "@/lib/db";

loadEnvConfig(process.cwd());

async function main() {
  const sql = getSql();
  const rows = await sql.query(
    "select current_database() as db, current_schema() as schema, to_regclass('public.product_catalog') as product_catalog",
    []
  );

  console.log(rows);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
