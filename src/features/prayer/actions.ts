"use server";

import { prayerRequestSchema } from "@/lib/validation/prayer";

export type PrayerFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[] | undefined> };

/**
 * Envía la petición a Formspree desde el servidor (el endpoint no se expone al navegador).
 * Fase 2: reemplazar por inserción en la tabla prayer_requests.
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

  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) {
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
    return { status: "success" };
  } catch (error) {
    console.error("Error al enviar petición de oración", error);
    return {
      status: "error",
      message: "No pudimos enviar tu petición. Inténtalo de nuevo en unos minutos.",
    };
  }
}
