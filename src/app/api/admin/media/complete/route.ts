import { NextResponse } from "next/server";
import { requireApiPermission } from "@/lib/auth/api-permissions";
import { getDb } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { getCurrentAdmin } from "@/lib/auth/permissions";
import { confirmUploadedFile } from "@/lib/storage/r2";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const denied = await requireApiPermission("content:manage");
  if (denied) return denied;
  try {
    const body = await request.json() as Record<string, unknown>;
    if (typeof body.key !== "string" || !/^uploads\/\d{4}-\d{2}\/[\w-]+\.[a-zA-Z0-9]{1,8}$/.test(body.key) || typeof body.size !== "number" || typeof body.contentType !== "string") return NextResponse.json({ error: "Archivo inválido." }, { status: 400 });
    const uploaded = await confirmUploadedFile(body.key, body.size, body.contentType);
    const actor = await getCurrentAdmin();
    if (!actor) return NextResponse.json({ error: "Sesión requerida." }, { status: 401 });
    await getDb().insert(media).values({ id: crypto.randomUUID(), key: body.key, url: uploaded.url, filename: uploaded.filename, contentType: uploaded.contentType!, size: uploaded.size!, createdBy: actor.user.id });
    return NextResponse.json({ url: uploaded.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo registrar el archivo.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
