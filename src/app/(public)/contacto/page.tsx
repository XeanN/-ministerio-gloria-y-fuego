import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { PendingNote } from "@/components/ui/pending-note";
import { pageMetadata } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contacto",
  description: "Ubicación, WhatsApp y redes del Ministerio Gloria y Fuego en Lima, Perú.",
  path: "/contacto",
});

export default function ContactoPage() {
  const whatsapp = whatsappLink("Hola, quisiera más información sobre el Ministerio Gloria y Fuego.");
  const mapQuery = siteConfig.address ?? siteConfig.city;

  return (
    <>
      <PageHeader eyebrow="Escríbenos" title="Contacto" description="Estamos para servirte. Visítanos o escríbenos." />

      <section className="bg-ivory">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1fr_1.5fr]">
          <div className="space-y-8">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-semibold">
                <MapPin className="size-6 text-calm-dark" aria-hidden /> Dirección
              </h2>
              {siteConfig.address ? (
                <p className="mt-3">{siteConfig.address}</p>
              ) : (
                <PendingNote className="mt-3">Dirección exacta pendiente ({siteConfig.city}).</PendingNote>
              )}
              {siteConfig.mapsUrl && <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-calm-dark hover:underline">Cómo llegar <ArrowUpRight className="size-4" aria-hidden /></a>}
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-2xl font-semibold">
                <MessageCircle className="size-6 text-calm-dark" aria-hidden /> WhatsApp
              </h2>
              {whatsapp ? (
                <div className="mt-3 space-y-3">
                  <p className="font-medium">{siteConfig.whatsappNumber === "51946131892" ? "+51 946 131 892" : `+${siteConfig.whatsappNumber}`}</p>
                  <Button asChild size="lg" className="bg-calm text-white hover:bg-calm-dark">
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>
                  </Button>
                </div>
              ) : (
                <PendingNote className="mt-3">Número de WhatsApp pendiente.</PendingNote>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <iframe
              title={`Mapa: ${mapQuery}`}
              src={siteConfig.mapsEmbedUrl ?? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
              className="aspect-[4/3] w-full border-0 md:aspect-[5/3]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
