import { desc } from "drizzle-orm";
import { createTestimonial, updateTestimonialStatus } from "@/features/cms/actions";
import { requirePermission } from "@/lib/auth/permissions";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const dynamic = "force-dynamic";
export default async function TestimonialsAdminPage() {
  await requirePermission("content:manage");
  const rows = await getDb().select().from(testimonials).orderBy(desc(testimonials.createdAt)).limit(100);
  return <div className="mx-auto max-w-5xl space-y-8"><div><h1 className="text-3xl font-semibold text-night">Testimonios</h1><p className="mt-2 text-muted-foreground">Publica solo historias para las que el ministerio tenga consentimiento explícito.</p></div>
    <form action={createTestimonial} className="grid gap-4 rounded-2xl border border-border bg-white p-6"><label className="space-y-2 text-sm font-medium">Nombre para mostrar (opcional)<Input name="authorName" maxLength={100} /></label><label className="space-y-2 text-sm font-medium">Testimonio<Textarea name="body" required minLength={20} maxLength={3000} rows={5} /></label><label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" name="consent" required className="mt-1 accent-calm" /><span>Confirmo que la persona dio permiso para guardar este texto y que el permiso incluye su publicación en el sitio.</span></label><label className="space-y-2 text-sm font-medium">Estado<select name="status" className="ml-3 h-9 rounded-md border border-input bg-white px-3"><option value="pending">Pendiente</option><option value="published">Publicado</option></select></label><div><Button>Guardar testimonio</Button></div></form>
    <section className="space-y-4">{rows.length ? rows.map((row) => <article key={row.id} className="rounded-2xl border border-border bg-white p-5"><div className="flex flex-wrap justify-between gap-3"><div><p className="whitespace-pre-wrap leading-7">{row.body}</p><p className="mt-3 text-sm text-muted-foreground">{row.authorName || "Sin nombre público"} · {row.consentToPublish ? "permiso registrado" : "sin permiso"}</p></div><form action={updateTestimonialStatus} className="flex items-center gap-2"><input type="hidden" name="id" value={row.id} /><select name="status" defaultValue={row.status} className="h-9 rounded-md border border-input bg-white px-3 text-sm"><option value="pending">Pendiente</option><option value="published" disabled={!row.consentToPublish}>Publicado</option></select><Button size="sm" variant="outline">Actualizar</Button></form></div></article>) : <p className="rounded-2xl border border-dashed border-calm/30 bg-white p-8 text-sm text-muted-foreground">No hay testimonios registrados.</p>}</section>
  </div>;
}
