# Ministerio Gloria y Fuego — Plataforma Digital

Plataforma digital cristiana para Ministerio Gloria y Fuego.
Comunidad, transmisiones, enseñanzas, recursos y peticiones de oración.

## Stack
- Next.js 15 + TypeScript
- Tailwind CSS + shadcn/ui
- Neon PostgreSQL + Drizzle ORM
- Better Auth
- Vercel (hosting)
- Cloudflare R2 (archivos)
- YouTube / Facebook Live (videos)

## Fase actual
🟡 Frontend y módulos del backend implementados. Falta conectar servicios, crear el primer usuario admin y desplegar.

## Documentación
- [PROJECT.md](./docs/PROJECT.md) — Documento maestro completo
- [PROGRESS.md](./docs/PROGRESS.md) — Estado actual y tareas

## Desarrollo local
```bash
npm ci
cp .env.example .env.local   # completar Neon, Better Auth y URL pública
npm run db:migrate           # crea las tablas en Neon; usa DATABASE_URL_SINPOOLING si está configurada
npm run auth:create-admin -- --email admin@tu-dominio.pe --name "Admin" --role admin
npm run dev                  # http://localhost:3000
```

Genera `BETTER_AUTH_SECRET` localmente con:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

El alta pública está desactivada. Crea las cuentas del equipo desde `/admin/usuarios`.
Para cargas directas a Cloudflare R2 configura también sus claves y CORS para el dominio
del sitio (método `PUT`, encabezado `Content-Type`, tamaño máximo 10 MB). Sin Neon, las páginas públicas siguen
mostrando estados vacíos. Para probar el formulario sin Neon o Formspree, define
`WHATSAPP_PRAYER_RECIPIENT` en `.env.local`; se abrirá WhatsApp con el mensaje listo y la
persona deberá confirmar el envío. En Vercel, configura ese destino con el número de Profeta Silvia.

## Propietario
Angel Jean Pierre Ponce Bonifacio · Aliiatech
