import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getAuth } from "@/lib/auth";
import { permissionMatrix, type Permission, type Role } from "@/lib/auth/permissions";

export async function requireApiPermission(permission: Permission) {
  try {
    const session = await getAuth().api.getSession({ headers: await headers() });
    if (!session?.user || session.user.banned) return NextResponse.json({ error: "Inicia sesión para continuar." }, { status: 401 });
    const role = session.user.role as Role;
    if (!Object.hasOwn(permissionMatrix, role) || !permissionMatrix[role].includes(permission)) return NextResponse.json({ error: "No tienes permiso para esta acción." }, { status: 403 });
    return null;
  } catch {
    return NextResponse.json({ error: "El servicio de autenticación no está configurado." }, { status: 503 });
  }
}
