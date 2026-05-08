import { neon } from "@neondatabase/serverless";

type SqlClient = ReturnType<typeof neon>;

let sqlClient: SqlClient | null = null;

export function getSql(): SqlClient {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for database operations.");
  }

  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL);
  }

  return sqlClient;
}

