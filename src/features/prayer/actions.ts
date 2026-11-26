"use server";

import { prayerRequestSchema } from "@/lib/validation/prayer";
import { getDb, isDatabaseConfigured } from "@/lib/db";
import { prayerRequests } from "@/lib/db/schema";

export type PrayerFormState =
  | { status: "idle" }
  | { status: "success"; whatsappUrl?: string }
  | { status: "whatsapp-ready"; whatsappUrl: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[] | undefined> };

function getPrayerWhatsAppUrl(input: { name: string; request: string }) {
  const recipient = process.env.WHATSAPP_PRAYER_RECIPIENT?.replace(/\D/g, "");
  if (!recipient || !/^\d{10,15}$/.test(recipient)) return undefined;
  const greeting = "Hola Profeta Silvia, quisiera compartir esta petición de oración:";
  const message = `${greeting}\n\n${input.request}${input.name ? `\n\nNombre: ${input.name}` : ""}`;
  return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
}

/**
 * Guarda las peticiones privadas en Neon. Formspree se mantiene como alternativa
 * durante el despliegue inicial mientras no exista DATABASE_URL.
 */
export async function submitPrayerRequest(_prev: PrayerFormState, formData: FormData): Promise<PrayerFormState> {
  // Campo trampa anti-spam: los humanos no lo ven ni lo llenan.
  if (formData.get("website")) return { status: "success" };

  const parsed = prayerRequestSchema.safeParse({
    name: formData.get("name") ?? undefined,
    contact: formData.get("contact") ?? undefined,
    request: formData.get("request") ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Revisa los campos marcados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (isDatabaseConfigured()) {
    try {
      await getDb().insert(prayerRequests).values({
        id: crypto.randomUUID(),
        name: parsed.data.name || null,
        contact: parsed.data.contact || null,
        request: parsed.data.request,
      });
      return { status: "success", whatsappUrl: getPrayerWhatsAppUrl(parsed.data) };
    } catch (error) {
      console.error("Error al guardar petición de oración", error);
      return { status: "error", message: "No pudimos recibir tu petición. Inténtalo de nuevo en unos minutos." };
    }
  }

  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) {
    const whatsappUrl = getPrayerWhatsAppUrl(parsed.data);
    if (whatsappUrl) return { status: "whatsapp-ready", whatsappUrl };
    return {
      status: "error",
      message: "El formulario aún no está habilitado. Por favor, inténtalo más adelante.",
    };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        nombre: parsed.data.name || "Anónimo",
        contacto: parsed.data.contact || "No indicado",
        peticion: parsed.data.request,
        _subject: "Nueva petición de oración",
      }),
    });
    if (!res.ok) throw new Error(`Formspree respondió ${res.status}`);
    return { status: "success", whatsappUrl: getPrayerWhatsAppUrl(parsed.data) };
  } catch (error) {
    console.error("Error al enviar petición de oración", error);
    return {
      status: "error",
      message: "No pudimos enviar tu petición. Inténtalo de nuevo en unos minutos.",
    };
  }
}
