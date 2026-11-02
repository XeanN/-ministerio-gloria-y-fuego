import Link from "next/link";
import { Flame } from "lucide-react";
import { siteConfig } from "@/lib/site";

/** Logo temporal — reemplazar por el logo oficial cuando el ministerio lo entregue. */
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-white" aria-label={`${siteConfig.name} — Inicio`}>
      <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-gold to-fire">
        <Flame className="size-5 text-night" aria-hidden />
      </span>
      <span className="font-serif text-lg leading-tight font-semibold tracking-wide">
        Gloria <span className="text-gold">y</span> Fuego
      </span>
    </Link>
  );
}
