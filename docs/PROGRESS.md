# PROGRESS — Estado del Proyecto

> Actualizar después de cada sesión de trabajo.

---

## Estado actual
**Fase:** 1 — MVP en curso (páginas listas, falta deploy)
**Fecha:** 2026-11-02

---

## ✅ Completado

### Fase 0 — Planificación
- [x] Análisis de 4 referencias (Más Impulso, Casa de Dios, e625, Enlace)
- [x] Definición del concepto: plataforma de ministerio (no web institucional)
- [x] Stack tecnológico definido y justificado
- [x] Identidad visual definida (paleta, tipografía, estilo)
- [x] Arquitectura de información completa (18 páginas públicas + admin)
- [x] Modelo de datos definido (21 entidades)
- [x] Roadmap por fases según crecimiento
- [x] Estructura de carpetas creada
- [x] Documento maestro PROJECT.md creado
- [x] Repositorio local inicializado en D:\Aliiatech General\Ministerio-GloriaYFuego

### Fase 1 — MVP Rápido
- [x] Setup Next.js 15.5 + TypeScript + Tailwind v4 + shadcn/ui (button, input, textarea, label)
- [x] Design system: paleta en `src/app/globals.css` (`@theme`), Lora + Inter, tokens shadcn
- [x] Componentes base: Header (menú móvil), Footer, Hero, PageHeader, PendingNote
- [x] Homepage responsive (`src/app/(public)/page.tsx`)
- [x] Página /en-vivo (plugin de página de Facebook; aviso si falta el enlace)
- [x] Página /nosotros (con placeholders)
- [x] Formulario /peticiones (server action + Zod → Formspree, campo anti-spam)
- [x] Página /colabora (QR Yape/Plin pendiente)
- [x] Página /contacto (WhatsApp + mapa de Google sin API key)
- [x] SEO básico: metadata por página, Open Graph, Twitter, imagen OG, sitemap.xml, robots.txt

---

## 🔄 En curso
- Deploy en Vercel

---

## ⏳ Pendiente

### Fase 1 — MVP Rápido
- [ ] Deploy en Vercel (variables: `FORMSPREE_ENDPOINT`, `NEXT_PUBLIC_SITE_URL`)
- [ ] Dominio propio conectado

### Cómo cargar los datos del ministerio
Todos los datos pendientes viven en `src/lib/site.ts` (`facebookUrl`, `whatsappNumber`,
`address`, `schedule`, `donationQrImage`). Al completarlos, los avisos "pendiente" desaparecen solos.

### Información pendiente del ministerio
- [ ] Logo oficial (PNG/SVG)
- [ ] Enlace Facebook del ministerio
- [ ] Dirección del local
- [ ] WhatsApp del ministerio
- [ ] Horarios de reuniones
- [ ] QR de Yape/Plin
- [ ] Fotos reales del ministerio

---

## 🐛 Problemas conocidos
Ninguno aún.

---

## 📝 Decisiones tomadas esta sesión
- Vercel elegido sobre Cloudflare Workers (límite 10ms CPU en CF)
- Formspree para formularios en MVP (sin backend propio)
- Recursos y juegos aplazados a Fase 3-4 (desarrollo gradual)
- Se descartó WordPress, n8n, Make, VPS

---

## 🔜 Próxima sesión
1. Crear el formulario en Formspree y poner su URL en `FORMSPREE_ENDPOINT` (`.env.local` y Vercel)
2. Importar el repo en Vercel y desplegar
3. Cargar en `src/lib/site.ts` los datos reales que entregue el ministerio
