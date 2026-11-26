import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, Radio, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ivory text-night">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_82%_40%,rgba(198,166,107,0.16),transparent_35%),radial-gradient(ellipse_at_15%_100%,rgba(69,111,100,0.13),transparent_42%)]" />
      <div aria-hidden className="absolute -top-24 right-[8%] size-72 rounded-full border border-calm/10 sm:size-96" />
      <div className="mx-auto grid min-h-[min(720px,calc(100svh-4rem))] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-12 lg:py-20">
        <div className="relative z-10 flex flex-col items-start gap-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-calm/20 bg-white/75 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-calm-dark uppercase">
            <Sparkles className="size-4 text-fire" aria-hidden /> Casa de oración · Lima
          </p>
          <h1 className="max-w-3xl text-[2.7rem] leading-[1.1] font-medium tracking-tight sm:text-6xl lg:text-7xl">
            Un lugar para buscar a Dios, <span className="text-calm-dark">juntos.</span>
          </h1>
          <p className="max-w-xl text-base leading-7 text-night/70 sm:text-lg sm:leading-8">
            Un espacio de oración, fe y comunidad para acompañarte en cada etapa de la vida.
          </p>
          <div className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="bg-calm text-white shadow-sm hover:bg-calm-dark">
              <Link href="/peticiones"><Heart /> Necesito oración <ArrowRight /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-calm/30 bg-white/60 text-night hover:bg-sage">
              <Link href="/en-vivo"><Radio /> Ver transmisión</Link>
            </Button>
          </div>
          <p className="flex items-center gap-2 pt-1 text-sm text-night/60"><MapPin className="size-4 text-calm-dark" aria-hidden /> Rímac · Lima, Perú</p>
        </div>
        <div className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
          <div aria-hidden className="absolute -inset-5 rounded-[3rem] bg-sage/80" />
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white bg-white p-2 shadow-xl shadow-night/10 sm:p-3">
            <Image src="/images/logo-ministerio-gloria-y-fuego.jpg" alt="Emblema del Ministerio Gloria y Fuego" fill priority sizes="(max-width: 1024px) 90vw, 42vw" className="rounded-[1.6rem] object-cover" />
          </div>
          <div className="absolute -bottom-5 left-4 rounded-2xl border border-calm/10 bg-white/95 px-5 py-4 shadow-lg shadow-night/10 sm:left-8">
            <p className="font-serif text-lg text-night">La oración es gratuita.</p>
            <p className="mt-1 text-xs tracking-wide text-night/60">La colaboración es voluntaria.</p>
          </div>
          <span aria-hidden className="absolute -right-3 top-8 flex size-12 items-center justify-center rounded-2xl bg-peach text-fire shadow-md sm:-right-5 sm:size-14"><Heart className="size-6" /></span>
        </div>
      </div>
    </section>
  );
}
