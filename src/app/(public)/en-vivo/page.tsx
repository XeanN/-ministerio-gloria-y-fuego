import { PageHeader } from "@/components/layout/PageHeader";
import { FacebookLiveEmbed } from "@/components/media/FacebookLiveEmbed";
import { PendingNote } from "@/components/ui/pending-note";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getPublicSettings } from "@/lib/content/settings";
import { getLiveStream } from "@/lib/content/public-data";
import { normalizeVideoEmbedUrl } from "@/lib/content/video";

export const metadata = pageMetadata({
  title: "En vivo",
  description: "Acompáñanos en vivo cada domingo, de 9 a. m. a 1 p. m., desde el Facebook del Ministerio Gloria y Fuego.",
  path: "/en-vivo",
});
export const dynamic = "force-dynamic";

export default async function EnVivoPage() {
  const settings = await getPublicSettings();
  const facebookUrl = settings.facebookUrl;
  const liveStream = await getLiveStream();
  return (
    <>
      <PageHeader
        eyebrow="Transmisiones"
        title="En vivo"
        description="Acompáñanos en oración y en la enseñanza de la Palabra desde cualquier lugar."
      />
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1fr_320px]">
          {liveStream ? (liveStream.platform.toLowerCase().includes("facebook") ? <FacebookLiveEmbed pageUrl={liveStream.url} /> : <div className="overflow-hidden rounded-3xl bg-night"><div className="aspect-video"><iframe src={normalizeVideoEmbedUrl(liveStream.url) ?? undefined} title={liveStream.title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" /></div></div>) : <FacebookLiveEmbed pageUrl={facebookUrl} />}

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
            {(liveStream?.url || facebookUrl) && (
              <a
                href={liveStream?.url || facebookUrl || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-semibold text-calm-dark hover:underline"
              >
                Abrir transmisión →
              </a>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
