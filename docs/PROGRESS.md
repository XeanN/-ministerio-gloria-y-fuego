# PROGRESS — Estado del Proyecto

> Actualizar después de cada sesión de trabajo.

---

## Estado actual
**Fase:** 2 — Backend y módulos implementados; falta conectar servicios y desplegar
**Fecha:** 2026-11-25

---

## ✅ Completado

### Fase 0 — Planificación
- [x] Análisis de 4 referencias (Más Impulso, Casa de Dios, e625, Enlace)
- [x] Definición del concepto: plataforma de ministerio (no web institucional)
- [x] Stack tecnológico definido y justificado
- [x] Identidad visual definida (paleta, tipografía, estilo)
- [x] Arquitectura de información completa (18 páginas públicas + admin)
- [x] Modelo de datos definido (20 tablas en el esquema inicial)
- [x] Roadmap por fases según crecimiento
- [x] Estructura de carpetas creada
- [x] Documento maestro PROJECT.md creado
- [x] Repositorio local inicializado en D:\Aliiatech General\Ministerio-GloriaYFuego

### Fase 1 — MVP Rápido
- [x] Setup Next.js 15.5 + TypeScript + Tailwind v4 + shadcn/ui (button, input, textarea, label)
- [x] Design system: paleta en `src/app/globals.css` (`@theme`), Lora + Inter, tokens shadcn
- [x] Componentes base: Header (menú móvil), Footer, Hero, PageHeader, PendingNote
- [x] Homepage responsive (`src/app/(public)/page.tsx`)
- [x] Página /en-vivo (plugin de Facebook y horario confirmado)
- [x] Página /nosotros (con placeholders)
- [x] Formulario /peticiones (server action + Zod, Neon/Formspree y alternativa a WhatsApp)
- [x] Página /colabora (QR Yape/Plin pendiente)
- [x] Página /contacto (WhatsApp + mapa de Google sin API key)
- [x] SEO básico: metadata por página, Open Graph, Twitter, imagen OG, sitemap.xml, robots.txt
- [x] Pulido de UX/UI para páginas públicas: jerarquía visual, navegación responsive, estados y llamados a la acción
- [x] Logo oficial integrado en navegación, pie de página e inicio
- [x] Dirección y mapa de Google Maps integrados en Contacto y Nosotros
- [x] Texto de privacidad del formulario alineado con el envío mediante Formspree
- [x] Benchmark UX de iglesias de Lima y dirección visual tranquila para distintas edades
- [x] Ruta de bienvenida para familias, sin prometer servicios infantiles aún no confirmados
- [x] Enlaces oficiales a Facebook, Instagram y TikTok en la configuración y el pie de página
- [x] Horario de Facebook Live confirmado: domingos, 9:00 a. m. a 1:00 p. m.
- [x] WhatsApp público de contacto visible en la página Contacto
- [x] Fotos y video local integrados en la portada; video con controles y sin autoplay
- [x] Icono de pestaña reemplazado por el emblema de Gloria y Fuego
- [x] Catálogo de recursos rediseñado con accesos diferenciados a Biblia, familias, enseñanzas y prédicas
- [x] Interfaz de lector bíblico preparada: navegación por libro/capítulo, búsqueda y estado de conexión

### Fase 2 — Backend y CMS
- [x] Esquema Drizzle para autenticación y módulos (20 tablas) + migración inicial generada
- [x] Adaptador Neon y comandos de migración/Drizzle Studio
- [x] Better Auth con registro público apagado y roles admin/editor/intercessor/treasurer
- [x] Verificación de rol en páginas, acciones del servidor y rutas de API
- [x] Panel privado, inicio/cierre de sesión, dashboard y gestión de cuentas del equipo
- [x] Alta, lectura y publicación de enseñanzas, prédicas, recursos, transmisiones, actividades y juegos/trivia
- [x] Bandeja privada de peticiones con asignación y estado
- [x] Registro de colaboraciones voluntarias y gastos, con permisos separados
- [x] Ajustes para el enlace público de Facebook y páginas públicas conectadas a contenido publicado
- [x] Carga de PDF/imágenes a R2 mediante URL firmada, validación y registro en biblioteca
- [x] TypeScript estricto sin errores (`tsc --noEmit`)
- [x] Handoff del formulario a WhatsApp con mensaje prellenado y confirmación manual del usuario
- [ ] Aplicar la migración a Neon y crear la primera cuenta administradora
- [ ] Configurar credenciales de Better Auth, Neon y R2
- [ ] Configurar `API_BIBLE_API_KEY` y `API_BIBLE_BIBLE_ID`; verificar permisos y atribución de RVR1960 antes de publicar el texto
- [ ] Completar contenido e información real del ministerio
- [ ] Validar build y flujo en un entorno con credenciales

---

## 🔄 En curso
- Conexión de Neon, Better Auth y R2 (requiere credenciales del proyecto)

---

## ⏳ Pendiente

### Fase 1 — MVP Rápido
- [ ] Deploy en Vercel (variables: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_SITE_URL`; `FORMSPREE_ENDPOINT` solo como alternativa)
- [ ] Dominio propio conectado

### Cómo cargar los datos del ministerio
Los datos de redes, WhatsApp público y horario viven en `src/lib/site.ts`. Queda pendiente agregar el QR oficial de Yape/Plin.

### Información pendiente del ministerio
- [x] Logo oficial (JPG integrado; una versión transparente sería opcional)
- [x] Redes sociales oficiales
- [x] Dirección del local: Av. Samuel Alcázar 348, Rímac 15093, Lima, Perú
- [x] WhatsApp público: +51 946 131 892
- [x] Horario de transmisión: domingos, 9:00 a. m. a 1:00 p. m.
- [x] Primeras fotos reales del ministerio
- [ ] QR de Yape/Plin y materiales adicionales

---

## 🐛 Problemas conocidos
Ninguno aún.

---

## 📝 Decisiones tomadas esta sesión
- La nueva portada de Recursos prioriza accesos claros por propósito y audiencia; los recursos externos se toman como patrones, no se copian textos, diseños ni datos de terceros
- El lector `/recursos/biblia` consume API.Bible desde el servidor, nunca expone la API key al navegador; RVR1960 solo se activa con licencia/ID del proveedor y el aviso de copyright
- Benchmark: Más Impulso Play presenta juegos breves y personalizables; e625 organiza materiales por etapas; Casa de Dios separa maneras de colaborar por ubicación y muestra tutoriales; Enlace destaca video y archivo de mensajes
- Impulso Plus Iglesias no fue accesible durante la revisión automática, así que no se confirma compatibilidad, coste ni ventajas de integrarlo en el panel existente
- Neon es la fuente de datos cuando `DATABASE_URL` está configurada; Formspree queda como alternativa
- Los permisos se verifican en servidor por rol, además de proteger las páginas del panel
- Peticiones de oración y finanzas quedan en módulos con permisos separados
- Los juegos no llevan preguntas inventadas: el equipo debe revisarlas antes de publicarlas
- R2 se reserva para imágenes y PDF; videos usan embeds de YouTube/Facebook
- Falta conectar credenciales y desplegar; no se ejecutaron migraciones contra Neon

---

## 🔜 Próxima sesión
1. Agregar credenciales de Neon y Better Auth en `.env.local`
2. Ejecutar `npm run db:migrate` y crear el primer usuario con `npm run auth:create-admin -- --email ... --name ... --role admin`
3. Agregar credenciales/CORS de Cloudflare R2 y probar la carga de PDF e imágenes
4. Ingresar contenido confirmado y cargar datos reales del ministerio
5. Desplegar en Vercel con las variables correspondientes
