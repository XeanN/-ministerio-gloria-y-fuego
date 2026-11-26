import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  // Use the direct Neon connection for schema migrations; the app uses the pooled DATABASE_URL.
  dbCredentials: { url: process.env.DATABASE_URL_SINPOOLING ?? process.env.DATABASE_URL ?? "postgresql://placeholder:placeholder@localhost:5432/placeholder" },
  strict: true,
  verbose: true,
});
