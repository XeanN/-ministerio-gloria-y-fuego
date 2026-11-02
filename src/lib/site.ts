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
  /** URL de la página de Facebook del ministerio — PENDIENTE */
  facebookUrl: string | null;
  /** WhatsApp en formato internacional sin "+" (ej. 51XXXXXXXXX) — PENDIENTE */
  whatsappNumber: string | null;
  /** Dirección exacta del local — PENDIENTE */
  address: string | null;
  /** Horarios de reuniones — PENDIENTE */
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
  facebookUrl: null,
  whatsappNumber: null,
  address: null,
  schedule: [],
  donationQrImage: null,
};

export const mainNav = [
  { href: "/", label: "Inicio" },
  { href: "/en-vivo", label: "En Vivo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/peticiones", label: "Peticiones" },
  { href: "/colabora", label: "Colabora" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function whatsappLink(message?: string): string | null {
  if (!siteConfig.whatsappNumber) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${siteConfig.whatsappNumber}${text}`;
}
