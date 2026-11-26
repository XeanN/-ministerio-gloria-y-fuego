"use client";

import { useActionState } from "react";
import { CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { submitPrayerRequest, type PrayerFormState } from "@/features/prayer/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: PrayerFormState = { status: "idle" };

export function PrayerRequestForm() {
  const [state, formAction, pending] = useActionState(submitPrayerRequest, initialState);

  if (state.status === "success" || state.status === "whatsapp-ready") {
    const stored = state.status === "success";
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-xl bg-ivory p-8 text-center">
        <CheckCircle2 className="size-12 text-calm-dark" aria-hidden />
        <h2 className="text-2xl font-semibold">{stored ? "Recibimos tu petición" : "Tu petición está lista"}</h2>
        <p className="max-w-md text-muted-foreground">
          {stored ? "El equipo del ministerio podrá verla para orar contigo." : "Ábrela en WhatsApp para compartirla con el equipo del ministerio."}
        </p>
        {state.whatsappUrl && <div className="max-w-md space-y-3"><a href={state.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-calm px-5 py-3 text-sm font-semibold text-white hover:bg-calm-dark">Revisar y enviar por WhatsApp <ExternalLink className="size-4" aria-hidden /></a><p className="text-xs leading-5 text-muted-foreground">WhatsApp abrirá con el mensaje preparado. Léelo y pulsa Enviar allí si deseas compartirlo.</p></div>}
      </div>
    );
  }

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Campo trampa anti-spam */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">No llenar</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nombre (opcional)</Label>
        <Input id="name" name="name" autoComplete="given-name" maxLength={80} placeholder="Puedes dejarlo en blanco" />
        {fieldErrors?.name && <p className="text-sm text-destructive">{fieldErrors.name[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">Correo o WhatsApp (opcional)</Label>
        <Input
          id="contact"
          name="contact"
          maxLength={120}
          placeholder="Solo si deseas que te contactemos"
          aria-describedby="contact-help"
        />
        <p id="contact-help" className="text-xs text-muted-foreground">
          Solo lo usaremos para responderte si lo pides.
        </p>
        {fieldErrors?.contact && <p className="text-sm text-destructive">{fieldErrors.contact[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="request">Tu petición *</Label>
        <Textarea
          id="request"
          name="request"
          required
          minLength={10}
          maxLength={2000}
          rows={6}
          placeholder="Escribe aquí por qué quieres que oremos"
          aria-invalid={Boolean(fieldErrors?.request)}
          aria-describedby={fieldErrors?.request ? "request-error" : "request-help"}
        />
        {!fieldErrors?.request && <p id="request-help" className="text-xs text-muted-foreground">Comparte solo lo que te sientas cómodo/a contando.</p>}
        {fieldErrors?.request && <p id="request-error" className="text-sm text-destructive">{fieldErrors.request[0]}</p>}
      </div>

      <p className="text-xs leading-5 text-muted-foreground">Después de enviar, puedes abrir WhatsApp con tu petición ya escrita. No se compartirá por WhatsApp hasta que confirmes el envío en esa aplicación.</p>

      {state.status === "error" && (
        <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full bg-calm text-white hover:bg-calm-dark sm:w-auto">
        {pending && <Loader2 className="animate-spin" aria-hidden />}
        {pending ? "Enviando…" : "Enviar petición"}
      </Button>
    </form>
  );
}
