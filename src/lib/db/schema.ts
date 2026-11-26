import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
const updatedAt = () => timestamp("updated_at", { withTimezone: true }).notNull().defaultNow();

// Better Auth tables. Keep their fields aligned with the admin plugin.
export const user = pgTable("user", {
  id: text("id").primaryKey(), name: text("name").notNull(), email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false), image: text("image"),
  role: text("role").notNull().default("editor"), banned: boolean("banned").default(false),
  banReason: text("ban_reason"), banExpires: timestamp("ban_expires", { withTimezone: true }),
  createdAt: createdAt(), updatedAt: updatedAt(),
});
export const session = pgTable("session", {
  id: text("id").primaryKey(), expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(), createdAt: createdAt(), updatedAt: updatedAt(),
  ipAddress: text("ip_address"), userAgent: text("user_agent"), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
}, (t) => [index("session_user_id_idx").on(t.userId)]);
export const account = pgTable("account", {
  id: text("id").primaryKey(), accountId: text("account_id").notNull(), providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"), refreshToken: text("refresh_token"), idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }), refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: text("scope"), password: text("password"), createdAt: createdAt(), updatedAt: updatedAt(),
}, (t) => [index("account_user_id_idx").on(t.userId)]);
export const verification = pgTable("verification", {
  id: text("id").primaryKey(), identifier: text("identifier").notNull(), value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(), createdAt: createdAt(), updatedAt: updatedAt(),
}, (t) => [index("verification_identifier_idx").on(t.identifier)]);

export const categories = pgTable("categories", {
  id: text("id").primaryKey(), name: text("name").notNull(), slug: text("slug").notNull().unique(),
  description: text("description"), createdAt: createdAt(),
});
export const posts = pgTable("posts", {
  id: text("id").primaryKey(), title: text("title").notNull(), slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"), body: text("body").notNull().default(""), status: text("status").notNull().default("draft"),
  categoryId: text("category_id").references(() => categories.id, { onDelete: "set null" }),
  authorId: text("author_id").references(() => user.id, { onDelete: "set null" }),
  coverUrl: text("cover_url"), publishedAt: timestamp("published_at", { withTimezone: true }), createdAt: createdAt(), updatedAt: updatedAt(),
}, (t) => [index("posts_status_published_idx").on(t.status, t.publishedAt)]);
export const sermons = pgTable("sermons", {
  id: text("id").primaryKey(), title: text("title").notNull(), slug: text("slug").notNull().unique(),
  description: text("description"), speaker: text("speaker"), videoUrl: text("video_url").notNull(),
  scripture: text("scripture"), status: text("status").notNull().default("draft"), publishedAt: timestamp("published_at", { withTimezone: true }),
  authorId: text("author_id").references(() => user.id, { onDelete: "set null" }), createdAt: createdAt(), updatedAt: updatedAt(),
}, (t) => [index("sermons_status_idx").on(t.status, t.publishedAt)]);
export const resources = pgTable("resources", {
  id: text("id").primaryKey(), title: text("title").notNull(), slug: text("slug").notNull().unique(),
  description: text("description"), fileUrl: text("file_url").notNull(), fileType: text("file_type").notNull().default("pdf"),
  status: text("status").notNull().default("draft"), createdAt: createdAt(), updatedAt: updatedAt(),
});
export const games = pgTable("games", {
  id: text("id").primaryKey(), title: text("title").notNull(), slug: text("slug").notNull().unique(),
  description: text("description"), gameType: text("game_type").notNull(), status: text("status").notNull().default("draft"),
  createdAt: createdAt(), updatedAt: updatedAt(),
});
export const gameQuestions = pgTable("game_questions", {
  id: text("id").primaryKey(), gameId: text("game_id").notNull().references(() => games.id, { onDelete: "cascade" }),
  prompt: text("prompt").notNull(), options: jsonb("options").$type<string[]>().notNull().default([]), answerIndex: integer("answer_index").notNull(),
  explanation: text("explanation"), sortOrder: integer("sort_order").notNull().default(0),
}, (t) => [index("game_questions_game_idx").on(t.gameId, t.sortOrder)]);
export const events = pgTable("events", {
  id: text("id").primaryKey(), title: text("title").notNull(), slug: text("slug").notNull().unique(),
  description: text("description"), location: text("location"), startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }), status: text("status").notNull().default("draft"), createdAt: createdAt(), updatedAt: updatedAt(),
}, (t) => [index("events_start_status_idx").on(t.startsAt, t.status)]);
export const prayerRequests = pgTable("prayer_requests", {
  id: text("id").primaryKey(), name: text("name"), contact: text("contact"), request: text("request").notNull(),
  status: text("status").notNull().default("new"), assignedTo: text("assigned_to").references(() => user.id, { onDelete: "set null" }),
  private: boolean("private").notNull().default(true), createdAt: createdAt(), updatedAt: updatedAt(),
}, (t) => [index("prayer_requests_status_created_idx").on(t.status, t.createdAt)]);
export const prayerAssignments = pgTable("prayer_assignments", {
  id: text("id").primaryKey(), requestId: text("request_id").notNull().references(() => prayerRequests.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }), assignedAt: createdAt(),
}, (t) => [uniqueIndex("prayer_assignment_unique_idx").on(t.requestId, t.userId)]);
export const testimonials = pgTable("testimonials", {
  id: text("id").primaryKey(), authorName: text("author_name"), body: text("body").notNull(),
  consentToPublish: boolean("consent_to_publish").notNull().default(false), status: text("status").notNull().default("pending"), createdAt: createdAt(),
});
export const liveStreams = pgTable("live_streams", {
  id: text("id").primaryKey(), title: text("title").notNull(), platform: text("platform").notNull(),
  url: text("url").notNull(), isLive: boolean("is_live").notNull().default(false), startsAt: timestamp("starts_at", { withTimezone: true }),
  status: text("status").notNull().default("draft"), createdAt: createdAt(), updatedAt: updatedAt(),
});
export const donations = pgTable("donations", {
  id: text("id").primaryKey(), amount: integer("amount").notNull(), currency: text("currency").notNull().default("PEN"),
  receivedAt: timestamp("received_at", { withTimezone: true }).notNull(), method: text("method"), reference: text("reference"),
  notes: text("notes"), createdBy: text("created_by").references(() => user.id, { onDelete: "set null" }), createdAt: createdAt(),
});
export const expenses = pgTable("expenses", {
  id: text("id").primaryKey(), amount: integer("amount").notNull(), currency: text("currency").notNull().default("PEN"),
  category: text("category").notNull(), description: text("description").notNull(), spentAt: timestamp("spent_at", { withTimezone: true }).notNull(),
  receiptUrl: text("receipt_url"), createdBy: text("created_by").references(() => user.id, { onDelete: "set null" }), createdAt: createdAt(),
});
export const media = pgTable("media", {
  id: text("id").primaryKey(), key: text("key").notNull().unique(), url: text("url").notNull(), filename: text("filename").notNull(),
  contentType: text("content_type").notNull(), size: integer("size").notNull(), createdBy: text("created_by").references(() => user.id, { onDelete: "set null" }), createdAt: createdAt(),
});
export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(), value: jsonb("value").notNull(), updatedBy: text("updated_by").references(() => user.id, { onDelete: "set null" }), updatedAt: updatedAt(),
});
export const auditLogs = pgTable("audit_logs", {
  id: text("id").primaryKey(), actorId: text("actor_id").references(() => user.id, { onDelete: "set null" }),
  action: text("action").notNull(), entity: text("entity").notNull(), entityId: text("entity_id"), metadata: jsonb("metadata"), createdAt: createdAt(),
}, (t) => [index("audit_logs_entity_idx").on(t.entity, t.entityId)]);

