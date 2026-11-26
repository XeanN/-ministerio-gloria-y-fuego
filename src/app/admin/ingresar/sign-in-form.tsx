"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignInForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setPending(true);
    const data = new FormData(event.currentTarget);
    const result = await authClient.signIn.email({ email: String(data.get("email")), password: String(data.get("password")), callbackURL: "/admin/dashboard" });
    setPending(false);
    if (result.error) setError("No se pudo iniciar sesión. Revisa tus datos o pide acceso al administrador.");
  }

  return <form onSubmit={submit} className="space-y-5">
    <label className="block space-y-2 text-sm font-medium">Correo electrónico<Input name="email" type="email" autoComplete="username" required /></label>
    <label className="block space-y-2 text-sm font-medium">Contraseña<Input name="password" type="password" autoComplete="current-password" minLength={8} required /></label>
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    <Button className="w-full" disabled={pending}>{pending ? "Ingresando…" : "Ingresar al panel"}</Button>
  </form>;
}
