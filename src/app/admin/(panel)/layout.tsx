import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/permissions";

const nav = [
  ["Resumen", "/admin/dashboard", "dashboard:read"], ["Contenido", "/admin/contenido", "content:manage"], ["Prédicas", "/admin/predicas", "sermons:manage"],
  ["Recursos", "/admin/recursos", "resources:manage"], ["Juegos", "/admin/juegos", "content:manage"], ["Actividades", "/admin/actividades", "content:manage"],
  ["Testimonios", "/admin/testimonios", "content:manage"],
  ["Transmisiones", "/admin/transmisiones", "streams:manage"], ["Peticiones", "/admin/peticiones", "prayer:manage"],
  ["Colaboraciones", "/admin/colaboraciones", "finance:manage"], ["Gastos", "/admin/gastos", "finance:manage"], ["Usuarios", "/admin/usuarios", "users:manage"], ["Configuración", "/admin/configuracion", "settings:manage"],
] as const;

export default async function AdminPanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const current = await getCurrentAdmin();
  if (!current) redirect("/admin/ingresar");
  const visibleNav = nav.filter((item) => current.role === "admin" || (current.role === "editor" && !["prayer:manage", "finance:manage", "users:manage", "settings:manage"].includes(item[2])) || (current.role === "intercessor" && ["dashboard:read", "prayer:manage"].includes(item[2])) || (current.role === "treasurer" && ["dashboard:read", "finance:manage"].includes(item[2])));
  return <div className="min-h-screen bg-ivory md:grid md:grid-cols-[250px_1fr]">
    <aside className="bg-night px-5 py-7 text-white md:min-h-screen">
      <Link href="/admin/dashboard" className="font-serif text-lg">Gloria y Fuego</Link>
      <p className="mt-1 text-xs text-white/60">Panel · {current.role}</p>
      <nav className="mt-8 grid grid-cols-2 gap-1 md:grid-cols-1">
        {visibleNav.map(([label, href]) => <Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">{label}</Link>)}
      </nav>
    </aside>
    <div className="min-w-0">
      <header className="flex items-center justify-between border-b border-border bg-white px-5 py-4 sm:px-8">
        <p className="text-sm text-muted-foreground">{current.user.name} · {current.user.email}</p>
        <form action={async () => { "use server"; const { headers } = await import("next/headers"); const { getAuth } = await import("@/lib/auth"); await getAuth().api.signOut({ headers: await headers() }); redirect("/admin/ingresar"); }}>
          <button className="text-sm font-medium text-calm hover:underline">Cerrar sesión</button>
        </form>
      </header>
      <main className="p-5 sm:p-8">{children}</main>
    </div>
  </div>;
}
