# Ministerio Gloria y Fuego — Documento Maestro del Proyecto

> Última actualización: 2026-11-02
> Estado: Planificación / Fase 0

---

## 1. Identidad del Proyecto

**Nombre:** Ministerio Gloria y Fuego
**Tipo:** Plataforma digital de ministerio cristiano / casa de oración
**Ubicación:** Lima, Perú
**Canal actual:** Facebook Live
**Propietario del proyecto:** Angel Jean Pierre Ponce Bonifacio (Aliitech)

### Filosofía de producto
> La oración es gratuita. La colaboración es voluntaria. La comunidad es para todos.

- No usar lenguaje comercial agresivo
- No generar culpa por no colaborar económicamente
- Las peticiones de oración, enseñanzas fundamentales y recursos básicos siempre serán gratuitos
- Transparencia total en el uso de colaboraciones voluntarias

### Transmite
- Confianza · Espiritualidad · Esperanza
- Cercanía · Modernidad · Profesionalismo · Transparencia

---

## 2. Concepto del Producto

No es una web institucional. Es una **plataforma de ministerio**:

| Nivel | Qué hace |
|---|---|
| Web institucional | Informa quiénes somos |
| Web de ministerio | Transmite y comunica |
| **Plataforma cristiana** ✅ | Genera contenido, recursos, comunidad y retención |

Inspiración combinada de 4 referencias analizadas:

| Referencia | Qué tomamos |
|---|---|
| [Más Impulso Global](https://www.masimpulsoglobal.com/) | Recursos, juegos, buscador, categorías |
| [Casa de Dios](https://casadedios.org/) | Identidad, comunidad, peticiones de oración |
| [e625](https://e625.com/) | Formación, recursos por edad y ministerio |
| [Enlace TV](https://www.enlace.org/) | Transmisiones, videoteca, archivos |

---

## 3. Stack Tecnológico

### Stack principal
| Área | Tecnología | Plan gratuito |
|---|---|---|
| Framework | Next.js 15 + App Router | — |
| Lenguaje | TypeScript | — |
| UI | Tailwind CSS + shadcn/ui | — |
| ORM | Drizzle ORM | — |
| Validación | Zod | — |
| Base de datos | Neon PostgreSQL | 1 GB / 100 CU-h / mes |
| Autenticación | Better Auth | Gratuito |
| Hosting | Vercel ⭐ | Free tier (recomendado sobre CF Workers) |
| Archivos/Imágenes | Cloudflare R2 | 10 GB / 1M ops / mes |
| CDN | Cloudflare | Free |
| Videos | YouTube + Facebook Live embeds | Gratuito |
| Código | GitHub | Gratuito |
| Email/Newsletter | Mailchimp | 500 contactos / 1K emails gratis |

### Por qué Vercel sobre Cloudflare Workers
Cloudflare Workers tiene un límite real de **10ms de CPU por request** en el plan gratuito.
Con Next.js + consultas a Neon (latencia de red incluida) ese límite es problemático.
Vercel fue creado por el mismo equipo de Next.js — compatibilidad perfecta, sin ese riesgo.

> ⚠️ Si en el futuro se necesita CF Workers, hacer prueba técnica primero con vinext (todavía en beta).

### Por qué NO usamos
- ❌ n8n / Make — costo de servidor
- ❌ VPS dedicado — costo mensual
- ❌ Supabase — Neon + Better Auth es más controlado
- ❌ WordPress — necesitamos SEO nativo y control total

---

## 4. Identidad Visual

### Paleta de colores
| Nombre | Hex | Uso |
|---|---|---|
| Azul noche | `#101827` | Fondo principal, identidad |
| Dorado | `#D5A64A` | Detalles, énfasis |
| Naranja fuego | `#E87532` | CTAs, botones principales |
| Marfil | `#F7F3EA` | Fondo de secciones de lectura |
| Blanco | `#FFFFFF` | Fondo de contenido editorial |

> ⚠️ Paleta sujeta a ajuste cuando se integre el logo oficial del ministerio.

### Estilo visual híbrido
- **Cinematográfico** — homepage, hero, transmisiones
- **Editorial** — enseñanzas, artículos, devocionales
- **Moderno** — biblioteca de recursos, catálogo
- **Interactivo** — juegos bíblicos
- **Cercano/Humano** — peticiones, comunidad
- **Profesional** — panel administrativo

### Tipografía (propuesta)
- Títulos: **Lora** o **Playfair Display** (serif editorial)
- Interfaz: **Inter** o **DM Sans** (sans-serif moderno)

### Reglas UX/UI clave
- Mobile-first obligatorio
- No toda la web oscura — combinar secciones oscuras y claras
- Sin ventanas emergentes invasivas
- Sin reproducción automática con sonido
- Contraste WCAG AA como objetivo
- Respetar `prefers-reduced-motion`

---

## 5. Arquitectura de Información

### Navegación principal
```
GLORIA Y FUEGO
Inicio | En Vivo | Enseñanzas | Recursos | Juegos | Comunidad | Colabora
```

### Mapa completo de páginas

| Ruta | Descripción |
|---|---|
| `/` | Homepage — presentación, destacados, acceso rápido |
| `/nosotros` | Historia, misión, visión, líderes, ubicación |
| `/en-vivo` | Stream FB/YouTube, horarios, archivo de transmisiones |
| `/ensenanzas` | Prédicas, reflexiones, devocionales, estudios |
| `/ensenanzas/[slug]` | Ficha individual por enseñanza |
| `/predicas` | Catálogo de prédicas con filtros |
| `/predicas/[slug]` | Ficha individual por prédica |
| `/recursos` | Biblioteca: PDF, guías, estudios, materiales |
| `/recursos/[slug]` | Ficha individual por recurso |
| `/juegos` | Juegos bíblicos interactivos |
| `/juegos/trivia` | Trivia bíblica |
| `/juegos/memoria` | Memoria bíblica |
| `/juegos/sopa-de-letras` | Sopa de letras |
| `/juegos/quien-soy` | ¿Quién soy? |
| `/comunidad` | Actividades, testimonios, invitación |
| `/peticiones` | Formulario privado de oración |
| `/actividades` | Calendario y eventos |
| `/colabora` | Ofrenda voluntaria, transparencia, QR |
| `/contacto` | Dirección, mapa, WhatsApp, redes |
| `/admin/*` | Panel administrativo (protegido) |

---

## 6. Modelo de Base de Datos (entidades)

```
users               — Administradores y miembros
user_profiles       — Datos de perfil
roles               — Roles del sistema
user_roles          — Asignación de roles
categories          — Categorías de contenido
posts               — Artículos y devocionales
sermons             — Prédicas y videos
resources           — Guías, PDF, materiales descargables
resource_categories — Categorías de recursos
games               — Juegos y configuración
game_questions      — Preguntas de juegos
events              — Actividades y eventos
prayer_requests     — Peticiones privadas de oración
prayer_assignments  — Asignación de peticiones al equipo
testimonials        — Testimonios autorizados
live_streams        — Enlaces de transmisión configurables
donations           — Registro de colaboraciones voluntarias
expenses            — Registro de gastos del ministerio
media               — Referencias a archivos en R2
site_settings       — Configuración general del sitio
audit_logs          — Auditoría de cambios importantes
```

---

## 7. Módulos del Panel Administrativo (CMS)

| Módulo | Función |
|---|---|
| Dashboard | Resumen de visitas, contenido, peticiones, aportes |
| Contenido | Artículos, devocionales, reflexiones (CRUD + borradores) |
| Prédicas | Videos, predicadores, categorías, fechas |
| Recursos | PDF, guías, acceso público/exclusivo |
| Transmisiones | URL Facebook/YouTube configurable, estado en vivo |
| Peticiones | Revisión privada, estados, asignación al equipo |
| Colaboraciones | Registro de aportes voluntarios |
| Gastos | Registro de gastos con categorías |
| Usuarios | Roles y permisos (admin, editor, intercesor, tesorero) |
| Configuración | Nombre, logo, colores, redes, contacto, horarios |

### Roles y separación de permisos
- **Administrador** — acceso total
- **Editor** — solo contenido, sin peticiones ni finanzas
- **Responsable de oración** — solo peticiones
- **Tesorero** — solo colaboraciones y gastos

---

## 8. Fases de Desarrollo (roadmap adaptado a crecimiento gradual)

> Filosofía: lanzar pronto, mejorar paulatinamente según crecimiento.

### Fase 1 — MVP Rápido (prioridad)
- [ ] Setup Next.js + TypeScript + Tailwind + shadcn/ui
- [ ] Design system: colores, tipografía, componentes base
- [ ] Homepage completa y responsive
- [ ] Página En Vivo (embed Facebook Live)
- [ ] Página Nosotros (con placeholders hasta tener info real)
- [ ] Formulario de petición de oración (Formspree o Netlify Forms)
- [ ] Página Colabora con QR de Yape/Plin (imagen, sin pasarela)
- [ ] Página Contacto con WhatsApp y mapa
- [ ] SEO básico (metadata, OG, sitemap)
- [ ] Deploy en Vercel + dominio propio

### Fase 2 — Contenido y Videoteca
- [ ] Neon PostgreSQL configurado
- [ ] Drizzle ORM + migraciones iniciales
- [ ] Panel admin básico (autenticación con Better Auth)
- [ ] Módulo de prédicas (CMS + página pública)
- [ ] Módulo de enseñanzas/artículos
- [ ] Archivo de transmisiones anteriores (YouTube embeds)
- [ ] SEO dinámico por contenido

### Fase 3 — Recursos y Comunidad
- [ ] Cloudflare R2 configurado
- [ ] Biblioteca de recursos (PDF descargables)
- [ ] Módulo de testimonios
- [ ] Calendario de actividades
- [ ] Módulo de colaboraciones en el admin
- [ ] Módulo de gastos en el admin

### Fase 4 — Juegos y Crecimiento (cuando haya comunidad)
- [ ] Juego: Trivia bíblica
- [ ] Juego: Memoria bíblica
- [ ] Juego: Sopa de letras
- [ ] Juego: ¿Quién soy?
- [ ] Recursos exclusivos (acceso con cuenta)
- [ ] Newsletter (Mailchimp)
- [ ] Google Search Console + Analytics
- [ ] Optimización Core Web Vitals

### Fase 5 — Escala (futuro)
- [ ] App móvil PWA
- [ ] Planes de lectura bíblica
- [ ] Sistema de progreso personal
- [ ] Estadísticas del ministerio
- [ ] Comunidad con cuentas de usuario

---

## 9. Juegos Bíblicos (Fase 4)

| Juego | Descripción | Tecnología |
|---|---|---|
| Trivia bíblica | Preguntas de opción múltiple | React + localStorage |
| Memoria bíblica | Encontrar parejas de personajes | React + localStorage |
| Sopa de letras | Encontrar palabras bíblicas | React + localStorage |
| ¿Quién soy? | Adivinar personajes bíblicos | React + localStorage |

- Sin registro obligatorio
- Puntuación local (localStorage)
- Mobile-first
- Preguntas originales, revisadas por el ministerio

---

## 10. SEO — Estrategia de Crecimiento Orgánico

### Palabras clave objetivo
- Enseñanzas cristianas / reflexiones bíblicas
- Oraciones cristianas / guías de oración
- Estudios bíblicos gratuitos
- Juegos bíblicos para niños
- Devocionales / prédicas cristianas
- Actividades para grupos de oración
- Casa de oración Lima / Perú

### SEO técnico implementar desde el inicio
- Metadata dinámica por página
- Open Graph (Facebook y WhatsApp)
- Twitter Cards
- Sitemap XML automático
- Robots.txt
- Canonical URLs
- Schema.org (Organization, Article, Event, VideoObject)
- Breadcrumbs
- Core Web Vitals: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1

---

## 11. Información Pendiente (placeholders)

Los siguientes datos se actualizarán cuando estén disponibles:

- [ ] Logo oficial (PNG transparente o SVG)
- [ ] Enlace de Facebook del ministerio
- [ ] Dirección exacta del local
- [ ] Número de WhatsApp del ministerio
- [ ] Horarios de reuniones
- [ ] QR de Yape/Plin
- [ ] Datos bancarios para transferencias (opcional)
- [ ] Nombres y fotos de líderes/pastores
- [ ] Fotos reales del ministerio y reuniones
- [ ] Historia del ministerio

---

## 12. Decisiones Técnicas Registradas

| Decisión | Elegido | Alternativa descartada | Razón |
|---|---|---|---|
| Hosting | Vercel | Cloudflare Workers | Workers tiene límite de 10ms CPU; Vercel = equipo de Next.js |
| Base de datos | Neon PostgreSQL | Supabase | Más control con Drizzle + Better Auth |
| Auth | Better Auth | NextAuth / Supabase Auth | Funciona bien con Neon, sin dependencias extras |
| Framework | Next.js | React + Vite | SEO nativo, SSR/SSG integrado, metadata por página |
| Automatización | Ninguna (gratuito) | n8n / Make | Costo de servidor; no necesario en MVP |
| Videos | YouTube / FB embeds | R2 storage | R2 se agotaría rápido con video; YouTube es ilimitado |
| Formularios MVP | Formspree | Backend propio | Cero backend en Fase 1, gratis hasta 50 envíos/mes |
| Donaciones | Yape QR + Mercado Pago | Stripe / PayPal | Realidad peruana; MP tiene comisión solo si entra dinero |

---

## 13. Notas del Proyecto

- Este proyecto es de **Angel Jean Pierre Ponce Bonifacio** bajo la marca **Aliitech**
- El ministerio se llama **Gloria y Fuego**
- Repositorio local: `D:\Aliiatech General\Ministerio-GloriaYFuego`
- Deploy: Vercel (conectado a GitHub)
- Dominio: pendiente de decisión

---

*Documento generado el 2026-11-02. Actualizar después de cada fase completada.*
