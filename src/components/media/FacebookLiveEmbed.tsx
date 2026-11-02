import { PendingNote } from "@/components/ui/pending-note";

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
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-night p-6">
        <PendingNote className="max-w-md">
          La transmisión se mostrará aquí cuando se configure el enlace de Facebook del ministerio.
        </PendingNote>
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
