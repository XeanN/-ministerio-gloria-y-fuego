import Link from "next/link";
import { ArrowRight, BookOpen, Download, Heart, Users, Baby, LibraryBig } from "lucide-react";
import { getPublishedResources } from "@/lib/content/public-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Recursos", description: "Lectura bíblica y materiales para crecer en comunidad." };

const collections = [
  { href: "/recursos/biblia", icon: BookOpen, eyebrow: "Lectura", title: "Lee la Biblia", text: "Busca un libro, capítulo o pasaje y continúa la lectura a tu ritmo.", tone: "bg-[#e8efea]" },
  { href: "/juegos", icon: Baby, eyebrow: "Para jugar y aprender", title: "Niños y familias", text: "Actividades sencillas para conversar sobre la fe en casa o en grupo.", tone: "bg-[#f4e7df]" },
  { href: "/ensenanzas", icon: Users, eyebrow: "Para la comunidad", title: "Enseñanzas", text: "Mensajes y reflexiones publicados por el equipo del ministerio.", tone: "bg-[#eaf0ef]" },
  { href: "/predicas", icon: LibraryBig, eyebrow: "Para volver a escuchar", title: "Biblioteca de prédicas", text: "Encuentra transmisiones y mensajes para ver cuando quieras.", tone: "bg-[#f7f5ef]" },
];

export default async function ResourcesPage() {
  const items = await getPublishedResources();
  return <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-calm">Crecer, aprender y compartir</p>
    <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold text-night sm:text-5xl">Recursos para cada etapa de tu camino</h1>
    <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">Un espacio tranquilo para leer, escuchar y aprender en familia. Cada material publicado aquí será preparado o revisado por el equipo del ministerio.</p>

    <section aria-label="Explorar recursos" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {collections.map(({ href, icon: Icon, eyebrow, title, text, tone }) => <Link key={href} href={href} className={`group rounded-3xl border border-night/5 ${tone} p-6 transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-calm`}>
        <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-calm-dark shadow-sm"><Icon className="size-6" aria-hidden /></span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-calm-dark">{eyebrow}</p>
        <h2 className="mt-2 text-xl font-semibold text-night">{title}</h2>
        <p className="mt-2 min-h-16 text-sm leading-6 text-muted-foreground">{text}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-calm-dark">Explorar <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
      </Link>)}
    </section>

    <section className="mt-14 rounded-[2rem] bg-night px-6 py-8 text-white sm:px-10 sm:py-10">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#d7c499]">Biblioteca viva</p><h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">Encuentra un mensaje para este momento</h2><p className="mt-3 max-w-2xl leading-7 text-white/75">Puedes volver a ver una prédica, leer un pasaje o explorar los materiales que el ministerio vaya publicando.</p></div>
        <Link href="/recursos/biblia" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 font-semibold text-night transition hover:bg-sage">Abrir la Biblia <ArrowRight className="size-4" aria-hidden /></Link>
      </div>
    </section>

    <section className="mt-14" aria-labelledby="publicados">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-calm">Del ministerio</p><h2 id="publicados" className="mt-2 text-2xl font-semibold text-night">Materiales publicados</h2></div><p className="text-sm text-muted-foreground">Gratuitos y para compartir</p></div>
      {items.length ? <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <Link href={`/recursos/${item.slug}`} key={item.slug} className="group rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"><p className="text-xs font-semibold uppercase tracking-wide text-calm">Ministerio Gloria y Fuego</p><h3 className="mt-3 text-xl font-semibold text-night group-hover:text-calm">{item.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{item.description || "Contenido preparado por el equipo del ministerio."}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-calm">Ver recurso <ArrowRight className="size-4" aria-hidden /></span></Link>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-calm/30 bg-white/70 p-8"><div className="flex gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sage text-calm-dark"><Download className="size-5" aria-hidden /></span><div><h3 className="font-semibold text-night">Estamos preparando materiales propios</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Pronto podrás encontrar aquí guías y actividades revisadas por el equipo. Mientras tanto, puedes leer la Biblia, ver las enseñanzas disponibles y compartir esta página con tu familia.</p><Link href="/juegos" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-calm-dark hover:underline">Ver actividades <ArrowRight className="size-4" aria-hidden /></Link></div></div></div>}
    </section>
    <p className="mt-12 flex items-center gap-2 rounded-2xl bg-sage/70 p-5 text-sm leading-6 text-night"><Heart className="size-5 shrink-0 text-calm-dark" aria-hidden />Los recursos básicos y la lectura bíblica estarán disponibles gratuitamente.</p>
  </main>;
}
