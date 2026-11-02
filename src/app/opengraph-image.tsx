import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen para compartir en Facebook/WhatsApp. Reemplazar cuando exista el logo oficial. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "radial-gradient(ellipse at 50% 120%, #E87532 0%, #101827 60%)",
          color: "#F7F3EA",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: "#D5A64A", textTransform: "uppercase" }}>
          Casa de oración · Lima, Perú
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 24 }}>Ministerio Gloria y Fuego</div>
        <div style={{ fontSize: 34, marginTop: 24, opacity: 0.85 }}>
          Oración · Enseñanza · Comunidad
        </div>
      </div>
    ),
    size,
  );
}
