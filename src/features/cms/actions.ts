"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { events, expenses, liveStreams, posts, resources, sermons } from "@/lib/db/schema";
import { donations, auditLogs, games, gameQuestions, testimonials } from "@/lib/db/schema";
import { isAllowedVideoUrl } from "@/lib/content/video";
import { requirePermission, type Permission } from "@/lib/auth/permissions";

const schema = z.object({
  title: z.string().trim().min(2).max(180), slug: z.string().trim().min(2).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  description: z.string().trim().max(5000).optional(), body: z.string().trim().max(50000).optional(), location: z.string().trim().max(240).optional(), url: z.string().url().refine((value) => value.startsWith("https://"), "Debe usar HTTPS").optional().or(z.literal("")),
  status: z.enum(["draft", "published"]).default("draft"), speaker: z.string().trim().max(120).optional(), startsAt: z.string().optional(), amount: z.string().optional(),
});

const definitions = {
  content: { permission: "content:manage", path: "/admin/contenido" }, sermons: { permission: "sermons:manage", path: "/admin/predicas" },
  resources: { permission: "resources:manage", path: "/admin/recursos" }, events: { permission: "content:manage", path: "/admin/actividades" },
  streams: { permission: "streams:manage", path: "/admin/transmisiones" }, expenses: { permission: "finance:manage", path: "/admin/gastos" },
} as const satisfies Record<string, { permission: Permission; path: string }>;
export type CMSModule = keyof typeof definitions;

export async function createCMSItem(module: CMSModule, formData: FormData) {
  const definition = definitions[module];
  if (!definition) throw new Error("Módulo no válido.");
  const actor = await requirePermission(definition.permission);
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error("Revisa el título, el slug y los campos requeridos.");
  const value = parsed.data;
  if (module !== "expenses" && !value.slug) throw new Error("El slug es obligatorio para este módulo.");
  const slug = value.slug ?? crypto.randomUUID();
  const id = crypto.randomUUID();
  const publishedAt = value.status === "published" ? new Date() : null;
  const db = getDb();

  if (module === "content") await db.insert(posts).values({ id, title: value.title, slug, excerpt: value.description, body: value.body ?? "", status: value.status, publishedAt, authorId: actor.user.id });
  else if (module === "sermons") {
    if (!value.url || !isAllowedVideoUrl(value.url)) throw new Error("Usa un enlace válido de YouTube o Facebook.");
    await db.insert(sermons).values({ id, title: value.title, slug, description: value.description, videoUrl: value.url, speaker: value.speaker, status: value.status, publishedAt, authorId: actor.user.id });
  } else if (module === "resources") {
    if (!value.url) throw new Error("Agrega el enlace público del archivo.");
    await db.insert(resources).values({ id, title: value.title, slug, description: value.description, fileUrl: value.url, status: value.status });
  } else if (module === "events") {
    if (!value.startsAt || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value.startsAt) || Number.isNaN(Date.parse(`${value.startsAt}:00-05:00`))) throw new Error("Indica una fecha válida.");
    await db.insert(events).values({ id, title: value.title, slug, description: value.description, location: value.location, startsAt: new Date(`${value.startsAt}:00-05:00`), status: value.status });
  } else if (module === "streams") {
    if (!value.url || !isAllowedVideoUrl(value.url)) throw new Error("Usa un enlace HTTPS válido de YouTube o Facebook.");
    await db.insert(liveStreams).values({ id, title: value.title, platform: new URL(value.url).hostname, url: value.url, status: value.status, isLive: value.status === "published" });
  } else if (module === "expenses") {
    if (!value.startsAt || !/^\d{4}-\d{2}-\d{2}$/.test(value.startsAt) || !value.amount || Number.isNaN(Date.parse(`${value.startsAt}T12:00:00-05:00`))) throw new Error("Agrega fecha y monto en formato de soles.");
    const amountCents = Math.round(Number(value.amount) * 100);
    if (!Number.isFinite(amountCents) || amountCents < 1 || amountCents > 100000000) throw new Error("El monto no es válido.");
    await db.insert(expenses).values({ id, description: value.title, category: value.speaker || "General", amount: amountCents, spentAt: new Date(`${value.startsAt}T12:00:00-05:00`), createdBy: actor.user.id });
  }
  await db.insert(auditLogs).values({ id: crypto.randomUUID(), actorId: actor.user.id, action: "create", entity: module, entityId: id });
  revalidatePath(definition.path);
  revalidatePath("/");
}

const donationSchema = z.object({ amount: z.coerce.number().positive().max(1000000), receivedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/), method: z.string().trim().max(80).optional(), reference: z.string().trim().max(120).optional() });
export async function recordDonation(formData: FormData) {
  const actor = await requirePermission("finance:manage");
  const parsed = donationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error("Revisa el monto y la fecha del aporte.");
  const rowId = crypto.randomUUID();
  await getDb().insert(donations).values({ id: rowId, amount: Math.round(parsed.data.amount * 100), receivedAt: new Date(`${parsed.data.receivedAt}:00-05:00`), method: parsed.data.method || null, reference: parsed.data.reference || null, createdBy: actor.user.id });
  await getDb().insert(auditLogs).values({ id: crypto.randomUUID(), actorId: actor.user.id, action: "create", entity: "donation", entityId: rowId });
  revalidatePath("/admin/colaboraciones");
}

const prayerStatus = z.enum(["new", "assigned", "in_progress", "closed"]);
export async function updatePrayerStatus(formData: FormData) {
  const actor = await requirePermission("prayer:manage");
  const requestId = z.string().uuid().safeParse(formData.get("id"));
  const status = prayerStatus.safeParse(formData.get("status"));
  const assignedToRaw = formData.get("assignedTo");
  const assignedTo = assignedToRaw ? z.string().uuid().safeParse(assignedToRaw) : null;
  if (!requestId.success || !status.success || (assignedTo && !assignedTo.success)) throw new Error("Solicitud de actualización inválida.");
  const { prayerRequests, user } = await import("@/lib/db/schema");
  const selectedUserId = assignedTo?.success ? assignedTo.data : null;
  if (selectedUserId) {
    const [teamMember] = await getDb().select({ id: user.id, role: user.role }).from(user).where(eq(user.id, selectedUserId)).limit(1);
    if (!teamMember || (teamMember.role !== "intercessor" && teamMember.role !== "admin")) throw new Error("La persona elegida no tiene el rol de oración.");
  }
  await getDb().update(prayerRequests).set({ status: selectedUserId ? "assigned" : status.data, assignedTo: selectedUserId, updatedAt: new Date() }).where(eq(prayerRequests.id, requestId.data));
  await getDb().insert(auditLogs).values({ id: crypto.randomUUID(), actorId: actor.user.id, action: "update_status", entity: "prayer_request", entityId: requestId.data });
  revalidatePath("/admin/peticiones");
}

const staffSchema = z.object({ name: z.string().trim().min(2).max(120), email: z.email(), password: z.string().min(12).max(128), role: z.enum(["editor", "intercessor", "treasurer"]) });
export async function createStaffAccount(formData: FormData) {
  await requirePermission("users:manage");
  const parsed = staffSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error("Verifica los datos: la contraseña inicial requiere al menos 12 caracteres.");
  const auth = (await import("@/lib/auth")).getAuth();
  await auth.api.createUser({ body: { email: parsed.data.email, name: parsed.data.name, password: parsed.data.password, role: parsed.data.role }, headers: await headers() });
  revalidatePath("/admin/usuarios");
}

const publicSettingSchema = z.object({ facebookUrl: z.union([z.literal(""), z.url().refine((url) => new URL(url).hostname === "facebook.com" || new URL(url).hostname.endsWith(".facebook.com"), "Solo enlaces de Facebook")]) });
export async function savePublicSettings(formData: FormData) {
  const actor = await requirePermission("settings:manage");
  const parsed = publicSettingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error("El enlace debe ser una URL de Facebook válida.");
  const { siteSettings, auditLogs } = await import("@/lib/db/schema");
  const value = parsed.data.facebookUrl;
  await getDb().insert(siteSettings).values({ key: "facebookUrl", value, updatedBy: actor.user.id }).onConflictDoUpdate({ target: siteSettings.key, set: { value, updatedBy: actor.user.id, updatedAt: new Date() } });
  await getDb().insert(auditLogs).values({ id: crypto.randomUUID(), actorId: actor.user.id, action: "update", entity: "site_settings", entityId: "facebookUrl" });
  revalidatePath("/en-vivo");
  revalidatePath("/");
}

const gameSchema = z.object({ title: z.string().trim().min(2).max(160), slug: z.string().trim().min(2).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), description: z.string().trim().max(1000).optional(), status: z.enum(["draft", "published"]) });
export async function createGame(formData: FormData) {
  const actor = await requirePermission("content:manage");
  const parsed = gameSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error("Revisa el título, slug y estado del juego.");
  const id = crypto.randomUUID();
  await getDb().insert(games).values({ id, title: parsed.data.title, slug: parsed.data.slug, description: parsed.data.description, gameType: "trivia", status: parsed.data.status });
  await getDb().insert(auditLogs).values({ id: crypto.randomUUID(), actorId: actor.user.id, action: "create", entity: "game", entityId: id });
  revalidatePath("/juegos"); revalidatePath("/admin/juegos");
}
export async function updateGameStatus(formData: FormData) {
  const actor = await requirePermission("content:manage");
  const id = z.string().uuid().safeParse(formData.get("id"));
  const status = z.enum(["draft", "published"]).safeParse(formData.get("status"));
  if (!id.success || !status.success) throw new Error("Actualización inválida.");
  await getDb().update(games).set({ status: status.data, updatedAt: new Date() }).where(eq(games.id, id.data));
  await getDb().insert(auditLogs).values({ id: crypto.randomUUID(), actorId: actor.user.id, action: `status_${status.data}`, entity: "game", entityId: id.data });
  revalidatePath("/juegos"); revalidatePath("/admin/juegos");
}

type ManagedContent = "content" | "sermons" | "resources" | "events" | "streams";
export async function updateContentStatus(module: ManagedContent, formData: FormData) {
  const definition = definitions[module];
  const actor = await requirePermission(definition.permission);
  const id = z.string().uuid().safeParse(formData.get("id"));
  const status = z.enum(["draft", "published"]).safeParse(formData.get("status"));
  if (!id.success || !status.success) throw new Error("Actualización inválida.");
  const publishedAt = status.data === "published" ? new Date() : null;
  const db = getDb();
  if (module === "content") await db.update(posts).set({ status: status.data, publishedAt, updatedAt: new Date() }).where(eq(posts.id, id.data));
  else if (module === "sermons") await db.update(sermons).set({ status: status.data, publishedAt, updatedAt: new Date() }).where(eq(sermons.id, id.data));
  else if (module === "resources") await db.update(resources).set({ status: status.data, updatedAt: new Date() }).where(eq(resources.id, id.data));
  else if (module === "events") await db.update(events).set({ status: status.data, updatedAt: new Date() }).where(eq(events.id, id.data));
  else await db.update(liveStreams).set({ status: status.data, isLive: status.data === "published", updatedAt: new Date() }).where(eq(liveStreams.id, id.data));
  await db.insert(auditLogs).values({ id: crypto.randomUUID(), actorId: actor.user.id, action: `status_${status.data}`, entity: module, entityId: id.data });
  revalidatePath(definition.path); revalidatePath("/");
}

export async function deleteContent(module: ManagedContent, formData: FormData) {
  const actor = await requirePermission("content:manage");
  if (actor.role !== "admin") throw new Error("Solo administración puede eliminar registros.");
  const id = z.string().uuid().safeParse(formData.get("id"));
  if (!id.success) throw new Error("Registro inválido.");
  const db = getDb();
  if (module === "content") await db.delete(posts).where(eq(posts.id, id.data));
  else if (module === "sermons") await db.delete(sermons).where(eq(sermons.id, id.data));
  else if (module === "resources") await db.delete(resources).where(eq(resources.id, id.data));
  else if (module === "events") await db.delete(events).where(eq(events.id, id.data));
  else await db.delete(liveStreams).where(eq(liveStreams.id, id.data));
  await db.insert(auditLogs).values({ id: crypto.randomUUID(), actorId: actor.user.id, action: "delete", entity: module, entityId: id.data });
  revalidatePath(definitions[module].path); revalidatePath("/");
}

const questionSchema = z.object({ gameId: z.string().uuid(), prompt: z.string().trim().min(5).max(500), optionA: z.string().trim().min(1).max(180), optionB: z.string().trim().min(1).max(180), optionC: z.string().trim().max(180).optional(), optionD: z.string().trim().max(180).optional(), answerIndex: z.coerce.number().int().min(0).max(3), explanation: z.string().trim().max(1000).optional() });
export async function addGameQuestion(formData: FormData) {
  const actor = await requirePermission("content:manage");
  const parsed = questionSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error("Agrega la pregunta, al menos dos opciones y la respuesta correcta.");
  const question = parsed.data;
  if (question.optionD && !question.optionC) throw new Error("Agrega primero la opción C antes de la D.");
  const [game] = await getDb().select({ id: games.id }).from(games).where(eq(games.id, question.gameId)).limit(1);
  if (!game) throw new Error("No encontramos el juego indicado.");
  const options = [question.optionA, question.optionB, question.optionC, question.optionD].filter((option): option is string => Boolean(option));
  if (question.answerIndex >= options.length) throw new Error("La respuesta elegida debe corresponder a una opción escrita.");
  const [maxOrder] = await getDb().select({ value: sql<number>`coalesce(max(${gameQuestions.sortOrder}), -1)` }).from(gameQuestions).where(eq(gameQuestions.gameId, question.gameId));
  const id = crypto.randomUUID();
  await getDb().insert(gameQuestions).values({ id, gameId: question.gameId, prompt: question.prompt, options, answerIndex: question.answerIndex, explanation: question.explanation, sortOrder: (maxOrder?.value ?? -1) + 1 });
  await getDb().insert(auditLogs).values({ id: crypto.randomUUID(), actorId: actor.user.id, action: "create", entity: "game_question", entityId: id });
  revalidatePath("/juegos"); revalidatePath("/admin/juegos");
}

const testimonySchema = z.object({ authorName: z.string().trim().max(100).optional(), body: z.string().trim().min(20).max(3000), consent: z.literal("on"), status: z.enum(["pending", "published"]) });
export async function createTestimonial(formData: FormData) {
  const actor = await requirePermission("content:manage");
  const parsed = testimonySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error("Marca el consentimiento y escribe un testimonio válido.");
  const id = crypto.randomUUID();
  await getDb().insert(testimonials).values({ id, authorName: parsed.data.authorName || null, body: parsed.data.body, consentToPublish: true, status: parsed.data.status });
  await getDb().insert(auditLogs).values({ id: crypto.randomUUID(), actorId: actor.user.id, action: "create", entity: "testimonial", entityId: id });
  revalidatePath("/comunidad"); revalidatePath("/admin/testimonios");
}

export async function updateTestimonialStatus(formData: FormData) {
  const actor = await requirePermission("content:manage");
  const id = z.string().uuid().safeParse(formData.get("id"));
  const status = z.enum(["pending", "published"]).safeParse(formData.get("status"));
  if (!id.success || !status.success) throw new Error("Actualización inválida.");
  const [entry] = await getDb().select({ consentToPublish: testimonials.consentToPublish }).from(testimonials).where(eq(testimonials.id, id.data)).limit(1);
  if (!entry || (status.data === "published" && !entry.consentToPublish)) throw new Error("Hace falta consentimiento explícito antes de publicar.");
  await getDb().update(testimonials).set({ status: status.data }).where(eq(testimonials.id, id.data));
  await getDb().insert(auditLogs).values({ id: crypto.randomUUID(), actorId: actor.user.id, action: `status_${status.data}`, entity: "testimonial", entityId: id.data });
  revalidatePath("/comunidad"); revalidatePath("/admin/testimonios");
}
