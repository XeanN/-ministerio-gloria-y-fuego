import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { admin } from "better-auth/plugins";
import { getDb } from "../db";
import * as schema from "../db/schema";
import { accessControl, authRoles } from "./roles";

export function getAuth() {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("Configura BETTER_AUTH_SECRET con al menos 32 caracteres.");
  if (!process.env.BETTER_AUTH_URL) throw new Error("Configura BETTER_AUTH_URL.");

  return betterAuth({
    appName: "Ministerio Gloria y Fuego",
    secret,
    baseURL: process.env.BETTER_AUTH_URL,
    database: drizzleAdapter(getDb(), { provider: "pg", schema }),
    emailAndPassword: { enabled: true, disableSignUp: true },
    plugins: [admin({ ac: accessControl, roles: authRoles, defaultRole: "editor", adminRoles: ["admin"] })],
    trustedOrigins: [process.env.NEXT_PUBLIC_SITE_URL, process.env.BETTER_AUTH_URL].filter((origin): origin is string => Boolean(origin)),
    advanced: { database: { generateId: "uuid" } },
  });
}
