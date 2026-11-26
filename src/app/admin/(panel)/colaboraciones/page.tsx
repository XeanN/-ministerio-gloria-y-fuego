import { desc } from "drizzle-orm";
import { recordDonation } from "@/features/cms/actions";
import { requirePermission } from "@/lib/auth/permissions";
import { getDb } from "@/lib/db";
import { donations } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";
export default async function DonationsAdminPage() {
  await requirePermission("finance:manage");
  const rows = await getDb().select().from(donations).orderBy(desc(donations.receivedAt)).limit(100);
  return <div className="mx-auto max-w-5xl space-y-8"><div><h1 className="text-3xl font-semibold text-night">Colaboraciones voluntarias</h1><p className="mt-2 text-muted-foreground">Registro interno de aportes. La colaboración es voluntaria.</p></div>
    <form action={recordDonation} className="grid gap-4 rounded-2xl border border-border bg-white p-6 sm:grid-cols-2"><label className="space-y-2 text-sm font-medium">Monto (S/)<Input name="amount" type="number" min="0.01" step="0.01" required /></label><label className="space-y-2 text-sm font-medium">Fecha<Input name="receivedAt" type="datetime-local" required /></label><label className="space-y-2 text-sm font-medium">Medio (opcional)<Input name="method" placeholder="Yape, efectivo…" maxLength={80} /></label><label className="space-y-2 text-sm font-medium">Referencia interna (opcional)<Input name="reference" maxLength={120} /></label><div className="sm:col-span-2"><Button>Registrar aporte</Button></div></form>
    <div className="overflow-hidden rounded-2xl border border-border bg-white"><div className="border-b border-border p-5 font-semibold">Últimos registros ({rows.length})</div>{rows.length ? <ul className="divide-y divide-border">{rows.map((row) => <li key={row.id} className="flex justify-between gap-4 px-5 py-4"><span>{new Date(row.receivedAt).toLocaleDateString("es-PE")} · {row.method || "Medio no especificado"}</span><strong>S/ {(row.amount / 100).toFixed(2)}</strong></li>)}</ul> : <p className="p-5 text-sm text-muted-foreground">Aún no hay registros.</p>}</div>
  </div>;
}
