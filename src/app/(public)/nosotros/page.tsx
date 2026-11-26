import Link from "next/link";
import { ArrowRight, Compass, Eye, Heart, MapPin } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNote } from "@/components/ui/pending-note";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Nosotros",
  description: "Conoce la historia, misión y visión del Ministerio Gloria y Fuego, casa de oración en Lima, Perú.",
  path: "/nosotros",
});

const pillars = [
  { icon: Compass, title: "La oración es gratuita", text: "Puedes acercarte y pedir oración sin ningún costo." },
  { icon: Eye, title: "Colaborar es voluntario", text: "Cada persona decide libremente si desea apoyar al ministerio." },
  { icon: Heart, title: "La comunidad es para todos", text: "Un espacio para encontrarnos, aprender y acompañarnos." },
] as const;

export default function NosotrosPage() {
  return (
    <>
      <PageHeader eyebrow="Quiénes somos" title="Nosotros" description="Una casa de oración en Lima, Perú." />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:items-center md:py-20 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl bg-night p-8 text-white sm:p-10">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,rgba(232,117,50,0.3),transparent_65%)]" />
            <p className="relative text-xs font-semibold tracking-[0.2em] text-gold uppercase">Gloria y Fuego</p>
            <p className="relative mt-4 font-serif text-3xl leading-tight">Un lugar para encontrarnos en oración.</p>
            <Link href="/peticiones" className="relative mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gold">Comparte tu petición <ArrowRight className="size-4" /></Link>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-calm-dark uppercase">Nuestra comunidad</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Un espacio de fe y acompañamiento</h2>
            <p className="mt-4 leading-7 text-muted-foreground">Somos una casa de oración en Lima. Queremos acompañar a las personas en oración y compartir la enseñanza de la Palabra con cercanía.</p>
            <PendingNote className="mt-6">La historia del ministerio se publicará cuando el equipo la comparta.</PendingNote>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-night/5 bg-white p-7 shadow-sm">
              <span className="flex size-12 items-center justify-center rounded-xl bg-sage"><Icon className="size-6 text-calm-dark" aria-hidden /></span>
              <h2 className="mt-5 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between md:py-20 lg:px-12">
          <div><p className="text-sm font-semibold tracking-[0.2em] text-calm-dark uppercase">Ven a visitarnos</p><h2 className="mt-2 text-3xl font-semibold">Estamos en el Rímac</h2><p className="mt-3 flex items-start gap-2 text-muted-foreground"><MapPin className="mt-1 size-4 shrink-0 text-calm-dark" aria-hidden />{siteConfig.address}</p></div>
          {siteConfig.mapsUrl && <Link href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-night px-5 py-3 text-sm font-medium text-white transition hover:bg-night-soft">Cómo llegar <ArrowRight className="size-4" /></Link>}
        </div>
      </section>
    </>
  );
}
