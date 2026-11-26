import { desc, eq } from "drizzle-orm";
import { updatePrayerStatus } from "@/features/cms/actions";
import { requirePermission } from "@/lib/auth/permissions";
import { getDb } from "@/lib/db";
import { prayerRequests, user } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";
export default async function PrayerAdminPage() {
  await requirePermission("prayer:manage");
  const [rows, team] = await Promise.all([
    getDb().select().from(prayerRequests).orderBy(desc(prayerRequests.createdAt)).limit(200),
    getDb().select({ id: user.id, name: user.name }).from(user).where(eq(user.role, "intercessor")),
  ]);
  return <div className="mx-auto max-w-5xl space-y-6"><div><h1 className="text-3xl font-semibold text-night">Peticiones de oración</h1><p className="mt-2 text-muted-foreground">Contenido confidencial. Solo visible para el equipo autorizado de oración.</p></div>
    {rows.length ? <ul className="space-y-4">{rows.map((row) => <li key={row.id} className="rounded-2xl border border-border bg-white p-5"><div className="flex flex-wrap justify-between gap-3"><div><p className="text-xs text-muted-foreground">{new Date(row.createdAt).toLocaleString("es-PE")}</p><p className="mt-2 whitespace-pre-wrap leading-7 text-night">{row.request}</p><p className="mt-3 text-sm text-muted-foreground">{row.name || "Anónimo"}{row.contact ? ` · ${row.contact}` : ""}</p></div><span className="h-fit rounded-full bg-sage px-3 py-1 text-xs capitalize text-calm">{row.status.replace("_", " ")}</span></div><form action={updatePrayerStatus} className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4"><input type="hidden" name="id" value={row.id} /><label className="sr-only" htmlFor={`status-${row.id}`}>Estado de la petición</label><select id={`status-${row.id}`} name="status" defaultValue={row.status} className="h-9 rounded-md border border-input bg-white px-3 text-sm"><option value="new">Nueva</option><option value="assigned">Asignada</option><option value="in_progress">En seguimiento</option><option value="closed">Cerrada</option></select><label className="sr-only" htmlFor={`assignee-${row.id}`}>Asignar responsable</label><select id={`assignee-${row.id}`} name="assignedTo" defaultValue={row.assignedTo ?? ""} className="h-9 rounded-md border border-input bg-white px-3 text-sm"><option value="">Sin asignar</option>{team.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}</select><Button size="sm" variant="outline">Actualizar petición</Button></form></li>)}</ul> : <div className="rounded-2xl border border-dashed border-calm/30 bg-white p-8 text-center text-sm text-muted-foreground">Todavía no se han recibido peticiones.</div>}
  </div>;
}
