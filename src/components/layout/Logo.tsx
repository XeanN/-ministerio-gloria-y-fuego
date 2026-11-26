import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

type LogoProps = { tone?: "light" | "dark" };

export function Logo({ tone = "light" }: LogoProps) {
  const textTone = tone === "light" ? "text-white" : "text-night";
  const accentTone = tone === "light" ? "text-gold" : "text-calm-dark";

  return (
    <Link href="/" className={`flex min-w-0 items-center gap-3 ${textTone}`} aria-label={`${siteConfig.name} — Inicio`}>
      <span className="relative size-11 shrink-0 overflow-hidden rounded-full border border-gold/50 bg-night-soft shadow-sm sm:size-12">
        <Image src="/images/logo-ministerio-gloria-y-fuego.jpg" alt="" fill sizes="48px" className="object-cover" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className={`block font-sans text-[9px] font-semibold tracking-[0.2em] ${accentTone} uppercase`}>Ministerio</span>
        <span className="block font-serif text-base font-semibold tracking-wide sm:text-lg">
          Gloria <span className={accentTone}>y</span> Fuego
        </span>
      </span>
    </Link>
  );
}
