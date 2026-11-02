import { Lock } from "lucide-react";
import { PrayerRequestForm } from "@/components/forms/PrayerRequestForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Peticiones de oración",
  description: "Envía tu petición de oración de forma privada. El equipo de intercesión del Ministerio Gloria y Fuego orará por ti.",
  path: "/peticiones",
});

export default function PeticionesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Oramos contigo"
        title="Peticiones de oración"
        description="La oración es gratuita. Comparte tu necesidad y nuestro equipo de intercesión orará por ti."
      />
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 md:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Tu petición es privada</h2>
            <p className="text-muted-foreground">
              Solo el equipo responsable de oración leerá lo que escribas. No publicamos peticiones ni compartimos tus
              datos.
            </p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="size-4 text-gold" aria-hidden /> Nombre y contacto son opcionales.
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
            <PrayerRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
