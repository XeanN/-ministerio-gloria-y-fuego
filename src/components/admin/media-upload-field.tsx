"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export function MediaUploadField() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function upload(file: File | undefined) {
    if (!file) return;
    setPending(true); setMessage("Preparando archivo…");
    try {
      const signed = await fetch("/api/admin/media/upload-url", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ filename: file.name, contentType: file.type, size: file.size }) });
      const info = await signed.json() as { key?: string; uploadUrl?: string; publicUrl?: string; error?: string };
      if (!signed.ok || !info.key || !info.uploadUrl || !info.publicUrl) throw new Error(info.error || "No se pudo preparar la carga.");
      const result = await fetch(info.uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
      if (!result.ok) throw new Error("No se pudo subir el archivo. Revisa la configuración CORS de R2.");
      const saved = await fetch("/api/admin/media/complete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: info.key, filename: file.name, contentType: file.type, size: file.size }) });
      const savedData = await saved.json() as { url?: string; error?: string };
      if (!saved.ok || !savedData.url) throw new Error(savedData.error || "El archivo se subió, pero no se pudo registrar en la biblioteca de medios.");
      setUrl(savedData.url); setMessage("Archivo cargado. Guarda el registro para publicarlo.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error al cargar el archivo.");
    } finally { setPending(false); }
  }

  return <div className="space-y-2"><label className="block space-y-1.5 text-sm font-medium">Archivo PDF o imagen (máximo 10 MB)<Input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" disabled={pending} onChange={(event) => void upload(event.target.files?.[0])} /></label><label className="block space-y-1.5 text-sm font-medium">URL del recurso<Input type="url" name="url" value={url} onChange={(event) => setUrl(event.target.value)} required placeholder="Carga un archivo o pega una URL HTTPS" /></label>{message && <p role="status" className="text-xs text-muted-foreground">{message}</p>}</div>;
}
