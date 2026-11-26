import { createCMSItem, updateContentStatus, type CMSModule } from "@/features/cms/actions";
import { requirePermission, type Permission } from "@/lib/auth/permissions";
import { getDb } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { events, expenses, liveStreams, posts, resources, sermons } from "@/lib/db/schema";
import { MediaUploadField } from "@/components/admin/media-upload-field";

type Row = { id: string; title: string; status: string; detail: string };

export async function AdminModulePage({ title, description, permission, module }: { title: string; description: string; permission: Permission; module: CMSModule }) {
  await requirePermission(permission);
  const db = getDb();
  let rows: Row[] = [];
  if (module === "content") rows = (await db.select({ id: posts.id, title: posts.title, status: posts.status, detail: posts.slug }).from(posts)).map((row) => ({ ...row, status: row.status ?? "draft", detail: `/${row.detail}` }));
  if (module === "sermons") rows = (await db.select({ id: sermons.id, title: sermons.title, status: sermons.status, detail: sermons.speaker }).from(sermons)).map((row) => ({ ...row, status: row.status ?? "draft", detail: row.detail ?? "Predicador pendiente" }));
  if (module === "resources") rows = (await db.select({ id: resources.id, title: resources.title, status: resources.status, detail: resources.fileType }).from(resources)).map((row) => ({ ...row, status: row.status ?? "draft", detail: row.detail ?? "archivo" }));
  if (module === "events") rows = (await db.select({ id: events.id, title: events.title, status: events.status, detail: events.startsAt }).from(events)).map((row) => ({ ...row, status: row.status ?? "draft", detail: new Date(row.detail).toLocaleString("es-PE") }));
  if (module === "streams") rows = (await db.select({ id: liveStreams.id, title: liveStreams.title, status: liveStreams.status, detail: liveStreams.platform }).from(liveStreams)).map((row) => ({ ...row, status: row.status ?? "draft", detail: row.detail ?? "Plataforma" }));
  if (module === "expenses") rows = (await db.select({ id: expenses.id, title: expenses.description, status: expenses.category, detail: expenses.spentAt }).from(expenses)).map((row) => ({ ...row, status: row.status ?? "General", detail: new Date(row.detail).toLocaleDateString("es-PE") }));

  const action = createCMSItem.bind(null, module);
  const statusAction = module !== "expenses" ? updateContentStatus.bind(null, module) : undefined;
  return <div className="mx-auto max-w-6xl space-y-8">
    <div><p className="text-sm font-medium text-calm">Administración</p><h1 className="mt-2 text-3xl font-semibold text-night">{title}</h1><p className="mt-2 max-w-2xl text-muted-foreground">{description}</p></div>
    <section className="rounded-2xl border border-border bg-white p-5 sm:p-7">
      <h2 className="text-xl font-semibold text-night">Crear registro</h2>
      <p className="mt-1 text-sm text-muted-foreground">Se guarda como borrador hasta que lo marques como publicado.</p>
      <form action={action} className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="space-y-1.5 text-sm font-medium">{module === "expenses" ? "Descripción del gasto" : "Título"}<Input name="title" required minLength={2} maxLength={180} /></label>
        {module !== "expenses" && <label className="space-y-1.5 text-sm font-medium">Slug (URL) <Input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="titulo-del-contenido" /></label>}
        {module === "content" && <label className="space-y-1.5 text-sm font-medium md:col-span-2">Contenido<Textarea name="body" rows={7} placeholder="Añade aquí el texto revisado por el ministerio" /></label>}
        {module !== "content" && <label className="space-y-1.5 text-sm font-medium md:col-span-2">Descripción<Textarea name="description" rows={3} /></label>}
        {(module === "sermons" || module === "streams") && <label className="space-y-1.5 text-sm font-medium md:col-span-2">{module === "sermons" ? "Enlace de video (embed de YouTube o Facebook)" : "Enlace de la transmisión"}<Input type="url" name="url" required /></label>}
        {module === "resources" && <div className="md:col-span-2"><MediaUploadField /></div>}
        {module === "sermons" && <label className="space-y-1.5 text-sm font-medium">Predicador<Input name="speaker" maxLength={120} /></label>}
        {module === "events" && <label className="space-y-1.5 text-sm font-medium">Lugar (opcional)<Input name="location" maxLength={240} /></label>}
        {module === "expenses" && <><label className="space-y-1.5 text-sm font-medium">Monto (S/)<Input name="amount" type="number" min="0.01" step="0.01" required /></label><label className="space-y-1.5 text-sm font-medium">Categoría<Input name="speaker" maxLength={120} /></label></>}
        {(module === "events" || module === "expenses") && <label className="space-y-1.5 text-sm font-medium">{module === "events" ? "Fecha y hora" : "Fecha del gasto"}<Input name="startsAt" type={module === "events" ? "datetime-local" : "date"} required /></label>}
        {module !== "expenses" && <label className="space-y-1.5 text-sm font-medium">Estado<select name="status" className="h-10 w-full rounded-md border border-input bg-white px-3"><option value="draft">Borrador</option><option value="published">Publicado</option></select></label>}
        <div className="flex items-end"><Button type="submit">{module === "expenses" ? "Registrar gasto" : "Guardar"}</Button></div>
      </form>
    </section>
    <section className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="border-b border-border px-5 py-4"><h2 className="font-semibold text-night">Registros ({rows.length})</h2></div>
      {rows.length ? <ul className="divide-y divide-border">{rows.map((row) => <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div><p className="font-medium text-night">{row.title}</p><p className="mt-1 text-sm text-muted-foreground">{row.detail}</p></div>{statusAction ? <form action={statusAction} className="flex items-center gap-2"><input type="hidden" name="id" value={row.id} /><select name="status" defaultValue={row.status} className="h-9 rounded-md border border-input bg-white px-3 text-sm"><option value="draft">Borrador</option><option value="published">Publicado</option></select><Button size="sm" variant="outline">Actualizar</Button></form> : <span className="rounded-full bg-sage px-3 py-1 text-xs font-medium capitalize text-calm">{row.status}</span>}</li>)}</ul> : <p className="px-5 py-8 text-sm text-muted-foreground">Todavía no hay registros. Agrega contenido confirmado por el ministerio.</p>}
    </section>
  </div>;
}
