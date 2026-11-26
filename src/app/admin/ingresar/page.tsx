import Link from "next/link";
import { SignInForm } from "./sign-in-form";

export const metadata = { title: "Acceso administrativo" };

export default function AdminSignInPage() {
  return <main className="flex min-h-screen items-center justify-center bg-sage px-5 py-12">
    <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-sm sm:p-10">
      <Link href="/" className="text-sm text-calm hover:underline">← Volver al sitio</Link>
      <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-calm">Ministerio Gloria y Fuego</p>
      <h1 className="mt-3 text-3xl font-semibold text-night">Acceso del equipo</h1>
      <p className="mt-3 mb-8 text-sm leading-6 text-muted-foreground">El acceso se entrega de forma privada. No hay registro público.</p>
      <SignInForm />
    </div>
  </main>;
}
