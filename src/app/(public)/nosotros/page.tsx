import { Compass, Eye, Heart } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNote } from "@/components/ui/pending-note";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nosotros",
  description: "Conoce la historia, misión y visión del Ministerio Gloria y Fuego, casa de oración en Lima, Perú.",
  path: "/nosotros",
});

const pillars = [
  { icon: Compass, title: "Misión" },
  { icon: Eye, title: "Visión" },
  { icon: Heart, title: "Valores" },
] as const;

export default function NosotrosPage() {
  return (
    <>
      <PageHeader eyebrow="Quiénes somos" title="Nosotros" description="Una casa de oración en Lima, Perú." />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-3xl font-semibold">Nuestra historia</h2>
          <PendingNote className="mt-6">
            La historia del ministerio se publicará cuando el equipo la comparta.
          </PendingNote>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title }) => (
            <article key={title} className="rounded-xl bg-white p-6">
              <Icon className="size-7 text-fire" aria-hidden />
              <h2 className="mt-3 text-2xl font-semibold">{title}</h2>
              <PendingNote className="mt-4">Contenido pendiente.</PendingNote>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-3xl font-semibold">Liderazgo</h2>
          <PendingNote className="mt-6">Nombres y fotos de pastores y líderes pendientes.</PendingNote>
        </div>
      </section>
    </>
  );
}
