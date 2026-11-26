import { eq } from "drizzle-orm";
import { savePublicSettings } from "@/features/cms/actions";
import { requirePermission } from "@/lib/auth/permissions";
import { getDb, isDatabaseConfigured } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";
export default async function SettingsAdminPage() {
  await requirePermission("settings:manage");
  let facebookUrl = siteConfig.facebookUrl ?? "";
  if (isDatabaseConfigured()) { const [row] = await getDb().select({ value: siteSettings.value }).from(siteSettings).where(eq(siteSettings.key, "facebookUrl")).limit(1); if (typeof row?.value === "string") facebookUrl = row.value; }
  return <div className="mx-auto max-w-3xl space-y-6"><div><h1 className="text-3xl font-semibold text-night">Configuración</h1><p className="mt-2 text-muted-foreground">Datos públicos confirmados del ministerio. Los campos vacíos siguen ocultos en la web.</p></div><form action={savePublicSettings} className="space-y-4 rounded-2xl border border-border bg-white p-6"><label className="block space-y-2 text-sm font-medium">Página de Facebook del ministerio<Input name="facebookUrl" type="url" placeholder="https://www.facebook.com/..." defaultValue={facebookUrl} /></label><p className="text-sm leading-6 text-muted-foreground">Este enlace se utiliza para el reproductor de En Vivo. No agregues enlaces personales.</p><Button>Guardar configuración</Button></form></div>;
}
