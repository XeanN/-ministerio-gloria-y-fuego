/**
 * Configuración central del sitio.
 *
 * Los valores `null` o vacíos son datos PENDIENTES que el ministerio aún no entrega.
 * Los componentes muestran un aviso de "pendiente" en lugar de inventar datos.
 * NUNCA reemplazar con direcciones, teléfonos o cuentas ficticias.
 */
type ScheduleItem = { day: string; time: string; label: string };

type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  url: string;
  locale: string;
  city: string;
  /** Dirección compartida por el ministerio. */
  address: string | null;
  mapsUrl: string | null;
  mapsEmbedUrl: string | null;
  /** Redes sociales oficiales compartidas por el ministerio. */
  facebookUrl: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
  /** WhatsApp público de contacto en formato internacional sin "+". */
  whatsappNumber: string | null;
  /** Horarios compartidos por el ministerio. */
  schedule: ScheduleItem[];
  /** Ruta en /public de la imagen QR de Yape/Plin — PENDIENTE */
  donationQrImage: string | null;
};

export const siteConfig: SiteConfig = {
  name: "Ministerio Gloria y Fuego",
  shortName: "Gloria y Fuego",
  description:
    "Casa de oración en Lima, Perú. Transmisiones en vivo, enseñanzas bíblicas y peticiones de oración. La oración es gratuita y la comunidad es para todos.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_PE",
  city: "Lima, Perú",
  address: "Av. Samuel Alcázar 348, Rímac 15093, Lima, Perú",
  mapsUrl: "https://maps.app.goo.gl/zpNAZERTW7VjsUFG6",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.5471151860588!2d-77.02966453038422!3d-12.030535087613018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105cf48be0bc431%3A0x8fe1379400d19cdb!2sAv.%20Samuel%20Alc%C3%A1zar%20348%2C%20R%C3%ADmac%2015093!5e0!3m2!1ses-419!2spe!4v1795639483695!5m2!1ses-419!2spe",
  facebookUrl: "https://www.facebook.com/profile.php?id=61552123321946",
  instagramUrl: "https://www.instagram.com/ministeriogloriayfuego",
  tiktokUrl: "https://www.tiktok.com/@ministeriogloria_fuego",
  whatsappNumber: "51946131892",
  schedule: [{ day: "Domingos", time: "9:00 a. m. – 1:00 p. m.", label: "En vivo por Facebook" }],
  donationQrImage: null,
};

export const mainNav = [
  { href: "/", label: "Inicio" },
  { href: "/en-vivo", label: "En Vivo" },
  { href: "/ensenanzas", label: "Enseñanzas" },
  { href: "/predicas", label: "Prédicas" },
  { href: "/recursos", label: "Recursos" },
  { href: "/recursos/biblia", label: "Biblia" },
  { href: "/actividades", label: "Actividades" },
  { href: "/juegos", label: "Juegos" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/peticiones", label: "Peticiones" },
  { href: "/colabora", label: "Colabora" },
  { href: "/contacto", label: "Contacto" },
  { href: "/nosotros", label: "Nosotros" },
] as const;

export function whatsappLink(message?: string): string | null {
  if (!siteConfig.whatsappNumber) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${siteConfig.whatsappNumber}${text}`;
}
