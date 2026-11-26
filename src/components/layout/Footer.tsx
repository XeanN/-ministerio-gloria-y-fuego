import Link from "next/link";
import { MapPin } from "lucide-react";
import { mainNav, siteConfig } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-white/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-12">
        <div className="space-y-3">
          <Logo tone="light" />
          <p className="max-w-sm text-sm leading-relaxed text-white/65">
            Casa de oración en {siteConfig.city}. La oración es gratuita, la colaboración es voluntaria y la comunidad es para todos.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="mb-3 font-sans text-sm font-semibold tracking-wider text-gold uppercase">Navegación</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 font-sans text-sm font-semibold tracking-wider text-gold uppercase">Síguenos</h2>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Facebook", href: siteConfig.facebookUrl },
              { label: "Instagram", href: siteConfig.instagramUrl },
              { label: "TikTok", href: siteConfig.tiktokUrl },
            ].map((social) => social.href && <li key={social.label}><a href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">{social.label} ↗</a></li>)}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-sans text-sm font-semibold tracking-wider text-gold uppercase">Visítanos</h2>
          {siteConfig.address ? <a href={siteConfig.mapsUrl ?? "#"} target={siteConfig.mapsUrl ? "_blank" : undefined} rel={siteConfig.mapsUrl ? "noopener noreferrer" : undefined} className="flex max-w-xs items-start gap-2 text-sm leading-relaxed hover:text-white"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />{siteConfig.address}</a> : <p className="text-sm text-white/50">Dirección próximamente</p>}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-white/50">
          © {year} {siteConfig.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
