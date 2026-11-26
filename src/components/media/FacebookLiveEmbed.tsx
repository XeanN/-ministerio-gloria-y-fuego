import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";

type FacebookLiveEmbedProps = {
  pageUrl: string | null;
};

/**
 * Plugin de página de Facebook: muestra la transmisión en vivo cuando está activa
 * y las publicaciones/videos recientes cuando no lo está. No reproduce con sonido.
 */
export function FacebookLiveEmbed({ pageUrl }: FacebookLiveEmbedProps) {
  if (!pageUrl) {
    return (
      <div className="relative flex min-h-[360px] w-full flex-col items-start justify-center overflow-hidden rounded-3xl bg-night p-7 text-white sm:p-10">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(232,117,50,0.25),transparent_55%)]" />
        <span className="relative flex size-14 items-center justify-center rounded-full border border-gold/35 bg-white/5"><Radio className="size-6 text-gold" aria-hidden /></span>
        <p className="relative mt-6 text-xs font-semibold tracking-[0.2em] text-gold uppercase">En vivo</p>
        <h2 className="relative mt-2 max-w-lg font-serif text-3xl">Acompáñanos desde donde estés</h2>
        <p className="relative mt-3 max-w-md leading-7 text-white/70">Estamos preparando el acceso a nuestras transmisiones. Mientras tanto, puedes compartir con nosotros tu petición de oración.</p>
        <Link href="/peticiones" className="relative mt-6 inline-flex items-center gap-2 rounded-md bg-calm px-5 py-3 text-sm font-semibold text-white transition hover:bg-calm-dark">Enviar petición <ArrowRight className="size-4" aria-hidden /></Link>
      </div>
    );
  }

  const src = `https://www.facebook.com/plugins/page.php?${new URLSearchParams({
    href: pageUrl,
    tabs: "timeline",
    width: "500",
    height: "700",
    small_header: "false",
    adapt_container_width: "true",
    hide_cover: "false",
  })}`;

  return (
    <div className="mx-auto w-full max-w-[500px] overflow-hidden rounded-xl bg-white shadow-lg">
      <iframe
        title="Transmisión en vivo en Facebook"
        src={src}
        width="500"
        height="700"
        className="h-[700px] w-full border-0"
        loading="lazy"
        allow="encrypted-media; picture-in-picture; web-share"
      />
    </div>
  );
}
