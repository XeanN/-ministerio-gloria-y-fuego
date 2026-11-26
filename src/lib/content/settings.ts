import { eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { siteConfig } from "@/lib/site";

export async function getPublicSettings(): Promise<{ facebookUrl: string | null }> {
  if (!isDatabaseConfigured()) return { facebookUrl: siteConfig.facebookUrl };
  const [row] = await getDb().select({ value: siteSettings.value }).from(siteSettings).where(eq(siteSettings.key, "facebookUrl")).limit(1);
  const storedUrl = row?.value;
  let validUrl = false;
  if (typeof storedUrl === "string") {
    try { const hostname = new URL(storedUrl).hostname; validUrl = hostname === "facebook.com" || hostname.endsWith(".facebook.com"); } catch { validUrl = false; }
  }
  return { facebookUrl: validUrl && typeof storedUrl === "string" ? storedUrl : siteConfig.facebookUrl };
}
