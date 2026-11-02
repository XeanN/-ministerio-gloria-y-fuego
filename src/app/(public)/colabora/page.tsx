import Image from "next/image";
import { HeartHandshake, QrCode, ScrollText } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNote } from "@/components/ui/pending-note";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Colabora",
  description: "Colabora voluntariamente con el Ministerio Gloria y Fuego mediante Yape o Plin. Transparencia en el uso de cada aporte.",
  path: "/colabora",
});

export default function ColaboraPage() {
  return (
    <>
      <PageHeader
        eyebrow="Siembra voluntaria"
        title="Colabora"
        description="La oración y la enseñanza siempre serán gratuitas. Si deseas sembrar en este ministerio, aquí te explicamos cómo."
      />

      <section className="bg-ivory">
        <div className="mx-auto grid max-w-5xl items-start gap-10 px-4 py-14 md:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold">Con libertad y alegría</h2>
            <p className="text-muted-foreground">
              Tu colaboración es completamente voluntaria. Nadie está obligado a aportar para recibir oración, enseñanza
              o ser parte de la comunidad.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <HeartHandshake className="mt-0.5 size-5 shrink-0 text-fire" aria-hidden />
                <span>Los aportes sostienen las transmisiones, materiales y actividades del ministerio.</span>
              </li>
              <li className="flex gap-3">
                <ScrollText className="mt-0.5 size-5 shrink-0 text-fire" aria-hidden />
                <span>Rendimos cuentas con transparencia sobre el uso de cada colaboración.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-semibold">Yape / Plin</h2>
            {siteConfig.donationQrImage ? (
              <Image
                src={siteConfig.donationQrImage}
                alt="Código QR para colaborar con Yape o Plin"
                width={260}
                height={260}
                className="rounded-lg"
              />
            ) : (
              <>
                <div className="flex size-56 items-center justify-center rounded-lg border-2 border-dashed border-gold/60 bg-ivory">
                  <QrCode className="size-20 text-gold/70" aria-hidden />
                </div>
                <PendingNote>El código QR se publicará cuando el ministerio lo proporcione.</PendingNote>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
