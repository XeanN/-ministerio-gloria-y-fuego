import { desc } from "drizzle-orm";
import { createStaffAccount } from "@/features/cms/actions";
import { requirePermission } from "@/lib/auth/permissions";
import { getDb } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";
export default async function UsersAdminPage() {
  await requirePermission("users:manage");
  const users = await getDb().select({ id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt }).from(user).orderBy(desc(user.createdAt)).limit(100);
  return <div className="mx-auto max-w-5xl space-y-8"><div><h1 className="text-3xl font-semibold text-night">Equipo y accesos</h1><p className="mt-2 text-muted-foreground">Las cuentas se crean de forma privada; el registro público está desactivado.</p></div>
    <form action={createStaffAccount} className="grid gap-4 rounded-2xl border border-border bg-white p-6 sm:grid-cols-2"><label className="space-y-2 text-sm font-medium">Nombre<Input name="name" required maxLength={120} /></label><label className="space-y-2 text-sm font-medium">Correo<Input name="email" type="email" required /></label><label className="space-y-2 text-sm font-medium">Contraseña inicial<Input name="password" type="password" minLength={12} required autoComplete="new-password" /></label><label className="space-y-2 text-sm font-medium">Rol<select name="role" className="h-9 w-full rounded-md border border-input bg-white px-3"><option value="editor">Editor</option><option value="intercessor">Responsable de oración</option><option value="treasurer">Tesorero</option></select></label><p className="text-xs leading-5 text-muted-foreground sm:col-span-2">Entrega la contraseña por un canal privado y pide al usuario cambiarla después de ingresar.</p><div className="sm:col-span-2"><Button>Crear cuenta</Button></div></form>
    <div className="overflow-hidden rounded-2xl border border-border bg-white"><div className="border-b border-border p-5 font-semibold">Cuentas ({users.length})</div><ul className="divide-y divide-border">{users.map((item) => <li key={item.id} className="flex flex-wrap justify-between gap-2 px-5 py-4"><span><span className="font-medium">{item.name}</span><span className="ml-2 text-sm text-muted-foreground">{item.email}</span></span><span className="text-sm capitalize text-calm">{item.role}</span></li>)}</ul></div>
  </div>;
}
