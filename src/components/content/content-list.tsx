import Link from "next/link";

type Item = { title: string; slug: string; description?: string | null; publishedAt?: Date | null };

export function ContentList({ title, intro, items, basePath }: { title: string; intro: string; items: Item[]; basePath: string }) {
  return <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-calm">Gloria y Fuego</p><h1 className="mt-3 text-4xl font-semibold text-night sm:text-5xl">{title}</h1><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{intro}</p>
    {items.length ? <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <Link href={`${basePath}/${item.slug}`} key={item.slug} className="group rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"><p className="text-xs font-semibold uppercase tracking-wide text-calm">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("es-PE") : "Ministerio Gloria y Fuego"}</p><h2 className="mt-3 text-xl font-semibold text-night group-hover:text-calm">{item.title}</h2><p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{item.description || "Contenido preparado por el equipo del ministerio."}</p><span className="mt-5 inline-block text-sm font-semibold text-calm">Ver más →</span></Link>)}</div> : <div className="mt-10 rounded-2xl border border-dashed border-calm/30 bg-white/70 p-8 text-center"><h2 className="font-semibold text-night">Estamos preparando esta sección</h2><p className="mt-2 text-sm text-muted-foreground">Cuando el equipo publique contenido, aparecerá aquí.</p></div>}
  </main>;
}
