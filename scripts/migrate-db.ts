import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { loadEnvConfig } from "@next/env";
import { getSql } from "@/lib/db";

loadEnvConfig(process.cwd());

async function main() {
  const migrationsDir = path.join(process.cwd(), "db", "migrations");
  const migrationFiles = (await readdir(migrationsDir))
    .filter((file) => file.endsWith(".sql"))
    .sort();
  const sql = getSql();

  for (const file of migrationFiles) {
    const migration = await readFile(path.join(migrationsDir, file), "utf8");
    const statements = migration
      .split(";")
      .map((statement) => statement.trim())
      .filter(Boolean);

    for (const statement of statements) {
      await sql.query(statement, []);
    }

    console.log(`Applied ${file}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
