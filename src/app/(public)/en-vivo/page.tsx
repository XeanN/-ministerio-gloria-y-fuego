import { PageHeader } from "@/components/layout/PageHeader";
import { FacebookLiveEmbed } from "@/components/media/FacebookLiveEmbed";
import { PendingNote } from "@/components/ui/pending-note";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "En vivo",
  description: "Transmisiones en vivo de oración y enseñanza del Ministerio Gloria y Fuego por Facebook Live.",
  path: "/en-vivo",
});

export default function EnVivoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Transmisiones"
        title="En vivo"
        description="Acompáñanos en oración y en la enseñanza de la Palabra desde cualquier lugar."
      />
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1fr_320px]">
          <FacebookLiveEmbed pageUrl={siteConfig.facebookUrl} />

          <aside className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Próximas transmisiones</h2>
              {siteConfig.schedule.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {siteConfig.schedule.map((item) => (
                    <li key={`${item.day}-${item.time}`} className="rounded-lg bg-white p-3">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.day} · {item.time}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <PendingNote className="mt-4">Horarios de transmisión pendientes.</PendingNote>
              )}
            </div>
            {siteConfig.facebookUrl && (
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-fire hover:underline"
              >
                Abrir en Facebook →
              </a>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
