import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Baby, HandHeart, HeartHandshake, Radio, Users } from "lucide-react";
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

      <section id="bienvenido" aria-labelledby="accesos" className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-sm font-semibold tracking-[0.2em] text-calm-dark uppercase">Un espacio para ti</p>
          <h2 id="accesos" className="mt-2 text-3xl font-semibold md:text-4xl">
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
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-night/5 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-calm"
                >
                  <Icon className="size-7 text-calm-dark" aria-hidden />
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{text}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-calm-dark">
                    Ir <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="vida-ministerio" className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
          <p className="text-sm font-semibold tracking-[0.2em] text-calm-dark uppercase">Momentos compartidos</p>
          <h2 id="vida-ministerio" className="mt-2 max-w-2xl text-3xl font-semibold md:text-4xl">Así vivimos nuestra comunidad</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">Imágenes y momentos de las reuniones del Ministerio Gloria y Fuego.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <figure className="overflow-hidden rounded-3xl bg-night">
              <Image src="/images/comunidad-gloria-y-fuego.jpeg" alt="Familias y miembros del Ministerio Gloria y Fuego reunidos" width={1200} height={1600} sizes="(max-width: 768px) 100vw, 50vw" className="aspect-[4/3] w-full object-cover object-center" />
              <figcaption className="px-5 py-3 text-sm text-white/80">Un encuentro de nuestra comunidad</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-3xl bg-night">
              <video controls playsInline preload="none" poster="/images/reunion-gloria-y-fuego.jpeg" className="aspect-[4/3] w-full bg-night object-cover" aria-label="Video de una reunión del ministerio">
                <source src="/images/WhatsApp%20Video%202026-11-22%20at%203.10.52%20PM.mp4" type="video/mp4" />
                Tu navegador no puede reproducir este video. Puedes conocer más en nuestras redes sociales.
              </video>
              <figcaption className="px-5 py-3 text-sm text-white/80">Un momento de oración y música</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="horarios" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-calm-dark uppercase">Reuniones</p>
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
            <div className="self-center rounded-2xl border border-calm/15 bg-sage/70 p-6">
              <PendingNote>Los horarios de reunión se publicarán próximamente.</PendingNote>
              <Link href="/contacto" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-calm-dark hover:underline">Conoce nuestra ubicación <ArrowRight className="size-4" /></Link>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="familia" className="bg-sky">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-20 lg:px-12">
          <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-[2rem] bg-sage p-8">
            <span aria-hidden className="absolute left-8 top-8 size-28 rounded-full bg-white/70" />
            <span aria-hidden className="absolute bottom-5 right-8 size-40 rounded-full bg-peach/80" />
            <div className="relative flex items-end gap-3">
              <span className="flex size-20 items-center justify-center rounded-[1.7rem] bg-white text-calm-dark shadow-sm"><Users className="size-9" aria-hidden /></span>
              <span className="mb-4 flex size-16 items-center justify-center rounded-[1.4rem] bg-white text-fire shadow-sm"><Baby className="size-8" aria-hidden /></span>
              <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-gold shadow-sm"><HeartHandshake className="size-7" aria-hidden /></span>
            </div>
            <p className="absolute bottom-5 left-6 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold tracking-wide text-night/70">Fe · familia · comunidad</p>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-calm-dark uppercase">Para cada generación</p>
            <h2 id="familia" className="mt-2 max-w-xl text-3xl font-semibold leading-tight md:text-4xl">Un espacio para vivir la fe en familia</h2>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">Queremos que grandes y pequeños se sientan bienvenidos. Los horarios y las actividades para niños se publicarán cuando el ministerio los confirme. Por ahora, puedes consultar nuestra ubicación antes de planear la visita.</p>
            <Button asChild variant="outline" size="lg" className="mt-6 border-calm/30 bg-white/60 text-night hover:bg-white">
              <Link href="/contacto">Ver ubicación <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-night text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">¿Necesitas oración?</h2>
            <p className="mt-2 text-white/75">No estás solo. Escríbenos y oraremos contigo.</p>
          </div>
          <Button asChild size="lg" className="bg-calm text-white hover:bg-calm-dark">
            <Link href="/peticiones">Enviar mi petición</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
