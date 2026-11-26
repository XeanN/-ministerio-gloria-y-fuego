import Link from "next/link";
import { count, eq } from "drizzle-orm";
import { requirePermission } from "@/lib/auth/permissions";
import { getDb } from "@/lib/db";
import { events, prayerRequests, posts, resources, sermons } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requirePermission("dashboard:read");
  const db = getDb();
  const [drafts, publishedPosts, sermonCount, resourceCount, eventCount, prayerCount] = await Promise.all([
    db.select({ value: count() }).from(posts).where(eq(posts.status, "draft")),
    db.select({ value: count() }).from(posts).where(eq(posts.status, "published")),
    db.select({ value: count() }).from(sermons), db.select({ value: count() }).from(resources),
    db.select({ value: count() }).from(events), db.select({ value: count() }).from(prayerRequests).where(eq(prayerRequests.status, "new")),
  ]);
  const cards = [["Borradores", drafts[0]?.value ?? 0], ["Enseñanzas publicadas", publishedPosts[0]?.value ?? 0], ["Prédicas", sermonCount[0]?.value ?? 0], ["Recursos", resourceCount[0]?.value ?? 0], ["Actividades", eventCount[0]?.value ?? 0], ["Peticiones nuevas", prayerCount[0]?.value ?? 0]];
  return <div className="mx-auto max-w-6xl"><p className="text-sm font-medium text-calm">Panel del equipo</p><h1 className="mt-2 text-3xl font-semibold text-night">Resumen</h1><p className="mt-2 text-muted-foreground">Administra contenido y solicitudes recibidas.</p>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label, value]) => <div key={label} className="rounded-2xl border border-border bg-white p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-semibold text-night">{value}</p></div>)}</div>
    <div className="mt-8 rounded-2xl border border-border bg-white p-6"><h2 className="font-semibold text-night">Accesos rápidos</h2><div className="mt-4 flex flex-wrap gap-3">{[["Crear enseñanza", "/admin/contenido"], ["Registrar prédica", "/admin/predicas"], ["Revisar peticiones", "/admin/peticiones"]].map(([label, href]) => <Link key={href} href={href} className="rounded-lg bg-sage px-4 py-2 text-sm font-medium text-night hover:bg-sage/70">{label}</Link>)}</div></div>
  </div>;
}
