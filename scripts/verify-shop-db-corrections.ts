import { loadEnvConfig } from "@next/env";
import { getSql } from "@/lib/db";

loadEnvConfig(process.cwd());

interface CorrectionRow {
  sku: string;
  category: string;
  subcategory: string | null;
}

interface CountRow {
  subcategory: string;
  count: number;
}

async function main() {
  const sql = getSql();

  const rows = (await sql.query(
    `select sku, category, subcategory
     from product_catalog
     where sku in ('STLLC-SLT030','STLLC-SLT042','STLLC-SLT051','LTM7201','LTM7219','LTM7251','LTM7269')
     order by sku`,
    []
  )) as CorrectionRow[];

  const bySku = new Map(rows.map((row) => [row.sku, row]));

  for (const sku of ["STLLC-SLT030", "STLLC-SLT042", "STLLC-SLT051"]) {
    if (bySku.get(sku)?.category !== "wood-slate") {
      throw new Error(`${sku} is not wood-slate in product_catalog.`);
    }
  }

  for (const sku of ["LTM7201", "LTM7219"]) {
    if (bySku.get(sku)?.subcategory !== "20-oz-ringneck-tumblers") {
      throw new Error(`${sku} is not in the standard 20 oz. Ringneck line.`);
    }
  }

  for (const sku of ["LTM7251", "LTM7269"]) {
    if (bySku.get(sku)?.subcategory !== "20-oz-ringneck-tumblers-slider-lid") {
      throw new Error(`${sku} is not in the slider-lid 20 oz. Ringneck line.`);
    }
  }

  const counts = (await sql.query(
    `select subcategory, count(*)::int as count
     from product_catalog
     where category = 'drinkware'
       and subcategory in ('20-oz-ringneck-tumblers', '20-oz-ringneck-tumblers-slider-lid')
     group by subcategory`,
    []
  )) as CountRow[];

  const countBySubcategory = new Map(counts.map((row) => [row.subcategory, row.count]));

  if (countBySubcategory.get("20-oz-ringneck-tumblers") !== 19) {
    throw new Error("Standard 20 oz. Ringneck product line should have 19 products.");
  }

  if (countBySubcategory.get("20-oz-ringneck-tumblers-slider-lid") !== 19) {
    throw new Error("Slider-lid 20 oz. Ringneck product line should have 19 products.");
  }

  console.log("Shop database correction checks passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
