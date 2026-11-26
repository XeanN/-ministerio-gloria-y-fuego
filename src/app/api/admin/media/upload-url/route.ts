import { NextResponse } from "next/server";
import { requireApiPermission } from "@/lib/auth/api-permissions";
import { createUploadUrl } from "@/lib/storage/r2";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const denied = await requireApiPermission("content:manage");
  if (denied) return denied;
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
    const input = body as Record<string, unknown>;
    if (typeof input.filename !== "string" || typeof input.contentType !== "string" || typeof input.size !== "number") {
      return NextResponse.json({ error: "Faltan datos del archivo." }, { status: 400 });
    }
    return NextResponse.json(await createUploadUrl({ filename: input.filename, contentType: input.contentType, size: input.size }));
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo preparar la carga.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
