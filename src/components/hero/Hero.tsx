import Link from "next/link";
import { Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      {/* Resplandor cinematográfico */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_110%,rgba(232,117,50,0.45),transparent_60%),radial-gradient(ellipse_at_80%_0%,rgba(213,166,74,0.18),transparent_50%)]"
      />
      <div className="mx-auto flex min-h-[78svh] max-w-6xl flex-col items-start justify-center gap-6 px-4 py-20">
        <p className="text-sm font-medium tracking-[0.25em] text-gold uppercase">Casa de oración · Lima</p>
        <h1 className="max-w-3xl text-4xl leading-tight font-semibold sm:text-5xl md:text-6xl">
          Un lugar para buscar a Dios, <span className="text-fire">juntos</span>.
        </h1>
        <p className="max-w-xl text-lg text-white/80">
          Oración, enseñanza de la Palabra y comunidad. Acompáñanos en vivo o déjanos tu petición: oraremos por ti.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="bg-fire hover:bg-fire-dark">
            <Link href="/en-vivo">
              <Radio /> Ver transmisión
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-gold/60 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/peticiones">Enviar petición de oración</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
