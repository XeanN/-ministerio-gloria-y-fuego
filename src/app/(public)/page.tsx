import Link from "next/link";
import { ArrowRight, HandHeart, HeartHandshake, Radio, Users } from "lucide-react";
import { Hero } from "@/components/hero/Hero";
import { Button } from "@/components/ui/button";
import { PendingNote } from "@/components/ui/pending-note";
import { siteConfig } from "@/lib/site";

const quickLinks = [
  {
    href: "/en-vivo",
    icon: Radio,
    title: "En vivo",
    text: "Únete a nuestras transmisiones de oración y enseñanza desde donde estés.",
  },
  {
    href: "/peticiones",
    icon: HandHeart,
    title: "Peticiones de oración",
    text: "Comparte tu necesidad de forma privada. Nuestro equipo orará por ti.",
  },
  {
    href: "/nosotros",
    icon: Users,
    title: "Nosotros",
    text: "Conoce quiénes somos, en qué creemos y cómo puedes ser parte.",
  },
  {
    href: "/colabora",
    icon: HeartHandshake,
    title: "Colabora",
    text: "Si deseas sembrar en este ministerio, aquí te explicamos cómo. Siempre voluntario.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />

      <section aria-labelledby="accesos" className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h2 id="accesos" className="text-3xl font-semibold md:text-4xl">
            Bienvenido a casa
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            La oración es gratuita. La colaboración es voluntaria. La comunidad es para todos.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map(({ href, icon: Icon, title, text }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full flex-col gap-3 rounded-xl border bg-white p-6 transition-shadow hover:shadow-lg"
                >
                  <Icon className="size-7 text-fire" aria-hidden />
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{text}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-fire">
                    Ir <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="horarios" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-sm font-medium tracking-[0.25em] text-gold uppercase">Reuniones</p>
            <h2 id="horarios" className="mt-2 text-3xl font-semibold md:text-4xl">
              Nuestros horarios
            </h2>
            <p className="mt-3 text-muted-foreground">
              Te esperamos presencialmente en {siteConfig.city} o en línea durante nuestras transmisiones.
            </p>
          </div>
          {siteConfig.schedule.length > 0 ? (
            <ul className="divide-y rounded-xl border">
              {siteConfig.schedule.map((item) => (
                <li key={`${item.day}-${item.time}`} className="flex justify-between gap-4 p-4">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">
                    {item.day} · {item.time}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <PendingNote className="self-center">Los horarios de reunión se publicarán próximamente.</PendingNote>
          )}
        </div>
      </section>

      <section className="bg-night text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">¿Necesitas oración?</h2>
            <p className="mt-2 text-white/75">No estás solo. Escríbenos y oraremos contigo.</p>
          </div>
          <Button asChild size="lg" className="bg-fire hover:bg-fire-dark">
            <Link href="/peticiones">Enviar mi petición</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
