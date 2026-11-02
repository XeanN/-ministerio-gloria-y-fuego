import Link from "next/link";
import { mainNav, siteConfig } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-white/75">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm leading-relaxed">
            Casa de oración en {siteConfig.city}. La oración es gratuita, la colaboración es voluntaria y la
            comunidad es para todos.
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
          {siteConfig.facebookUrl ? (
            <a
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-white"
            >
              Facebook
            </a>
          ) : (
            <p className="text-sm text-white/50">Redes sociales — próximamente</p>
          )}
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
