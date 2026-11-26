import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "./index";
import { isDatabaseConfigured } from "@/lib/db";

export type Role = "admin" | "editor" | "intercessor" | "treasurer";
export type Permission = "dashboard:read" | "content:manage" | "sermons:manage" | "resources:manage" | "streams:manage" | "prayer:manage" | "finance:manage" | "users:manage" | "settings:manage";

export const permissionMatrix: Record<Role, readonly Permission[]> = {
  admin: ["dashboard:read", "content:manage", "sermons:manage", "resources:manage", "streams:manage", "prayer:manage", "finance:manage", "users:manage", "settings:manage"],
  editor: ["dashboard:read", "content:manage", "sermons:manage", "resources:manage", "streams:manage"],
  intercessor: ["dashboard:read", "prayer:manage"],
  treasurer: ["dashboard:read", "finance:manage"],
};

export async function getCurrentAdmin() {
  if (!isDatabaseConfigured() || !process.env.BETTER_AUTH_SECRET || !process.env.BETTER_AUTH_URL) return null;
  const auth = getAuth();
  const result = await auth.api.getSession({ headers: await headers() });
  if (!result?.user) return null;
  const role = result.user.role as Role;
  if (!Object.hasOwn(permissionMatrix, role) || result.user.banned) return null;
  return { user: result.user, role };
}

export async function requirePermission(permission: Permission) {
  const adminUser = await getCurrentAdmin();
  if (!adminUser) redirect("/admin/ingresar");
  if (!permissionMatrix[adminUser.role].includes(permission)) redirect("/admin/sin-acceso");
  return adminUser;
}
