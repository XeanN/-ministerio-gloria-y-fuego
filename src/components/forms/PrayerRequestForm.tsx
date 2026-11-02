"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitPrayerRequest, type PrayerFormState } from "@/features/prayer/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: PrayerFormState = { status: "idle" };

export function PrayerRequestForm() {
  const [state, formAction, pending] = useActionState(submitPrayerRequest, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-xl bg-ivory p-8 text-center">
        <CheckCircle2 className="size-12 text-fire" aria-hidden />
        <h2 className="text-2xl font-semibold">Recibimos tu petición</h2>
        <p className="max-w-md text-muted-foreground">
          Nuestro equipo de intercesión estará orando por ti. Tu petición es confidencial.
        </p>
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
        />
        {fieldErrors?.request && <p className="text-sm text-destructive">{fieldErrors.request[0]}</p>}
      </div>

      {state.status === "error" && (
        <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full bg-fire hover:bg-fire-dark sm:w-auto">
        {pending && <Loader2 className="animate-spin" aria-hidden />}
        {pending ? "Enviando…" : "Enviar petición"}
      </Button>
    </form>
  );
}
