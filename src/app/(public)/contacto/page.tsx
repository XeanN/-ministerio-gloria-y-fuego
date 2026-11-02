import { MapPin, MessageCircle } from "lucide-react";
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
                <MapPin className="size-6 text-fire" aria-hidden /> Dirección
              </h2>
              {siteConfig.address ? (
                <p className="mt-3">{siteConfig.address}</p>
              ) : (
                <PendingNote className="mt-3">Dirección exacta pendiente ({siteConfig.city}).</PendingNote>
              )}
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-2xl font-semibold">
                <MessageCircle className="size-6 text-fire" aria-hidden /> WhatsApp
              </h2>
              {whatsapp ? (
                <Button asChild size="lg" className="mt-3 bg-fire hover:bg-fire-dark">
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                    Escríbenos por WhatsApp
                  </a>
                </Button>
              ) : (
                <PendingNote className="mt-3">Número de WhatsApp pendiente.</PendingNote>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <iframe
              title={`Mapa: ${mapQuery}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
              className="aspect-[4/3] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
