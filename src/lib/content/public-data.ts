import { eq, and, gte, desc } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/lib/db";
import { events, posts, resources, sermons, testimonials, games, gameQuestions, liveStreams } from "@/lib/db/schema";

export async function getPublishedPosts() {
  if (!isDatabaseConfigured()) return [];
  return getDb().select({ id: posts.id, title: posts.title, slug: posts.slug, excerpt: posts.excerpt, body: posts.body, publishedAt: posts.publishedAt }).from(posts).where(eq(posts.status, "published")).orderBy(desc(posts.publishedAt));
}
export async function getPost(slug: string) {
  if (!isDatabaseConfigured()) return null;
  const [item] = await getDb().select({ id: posts.id, title: posts.title, slug: posts.slug, excerpt: posts.excerpt, body: posts.body, publishedAt: posts.publishedAt }).from(posts).where(and(eq(posts.slug, slug), eq(posts.status, "published"))).limit(1);
  return item ?? null;
}
export async function getPublishedSermons() {
  if (!isDatabaseConfigured()) return [];
  return getDb().select({ id: sermons.id, title: sermons.title, slug: sermons.slug, description: sermons.description, speaker: sermons.speaker, videoUrl: sermons.videoUrl, scripture: sermons.scripture, publishedAt: sermons.publishedAt }).from(sermons).where(eq(sermons.status, "published")).orderBy(desc(sermons.publishedAt));
}
export async function getSermon(slug: string) {
  if (!isDatabaseConfigured()) return null;
  const [item] = await getDb().select({ id: sermons.id, title: sermons.title, slug: sermons.slug, description: sermons.description, speaker: sermons.speaker, videoUrl: sermons.videoUrl, scripture: sermons.scripture, publishedAt: sermons.publishedAt }).from(sermons).where(and(eq(sermons.slug, slug), eq(sermons.status, "published"))).limit(1);
  return item ?? null;
}
export async function getPublishedResources() {
  if (!isDatabaseConfigured()) return [];
  return getDb().select({ id: resources.id, title: resources.title, slug: resources.slug, description: resources.description, fileUrl: resources.fileUrl, fileType: resources.fileType }).from(resources).where(eq(resources.status, "published")).orderBy(desc(resources.createdAt));
}
export async function getResource(slug: string) {
  if (!isDatabaseConfigured()) return null;
  const [item] = await getDb().select({ id: resources.id, title: resources.title, slug: resources.slug, description: resources.description, fileUrl: resources.fileUrl, fileType: resources.fileType }).from(resources).where(and(eq(resources.slug, slug), eq(resources.status, "published"))).limit(1);
  return item ?? null;
}
export async function getUpcomingEvents() {
  if (!isDatabaseConfigured()) return [];
  return getDb().select({ id: events.id, title: events.title, slug: events.slug, description: events.description, location: events.location, startsAt: events.startsAt, endsAt: events.endsAt }).from(events).where(and(eq(events.status, "published"), gte(events.startsAt, new Date()))).orderBy(events.startsAt);
}
export async function getPublicTestimonials() {
  if (!isDatabaseConfigured()) return [];
  return getDb().select({ id: testimonials.id, authorName: testimonials.authorName, body: testimonials.body }).from(testimonials).where(and(eq(testimonials.status, "published"), eq(testimonials.consentToPublish, true))).orderBy(desc(testimonials.createdAt));
}
export async function getPublishedGames() {
  if (!isDatabaseConfigured()) return [];
  return getDb().select({ id: games.id, title: games.title, slug: games.slug, description: games.description }).from(games).where(eq(games.status, "published")).orderBy(desc(games.createdAt));
}
export async function getPublishedGame(slug: string) {
  if (!isDatabaseConfigured()) return null;
  const [game] = await getDb().select({ id: games.id, title: games.title, slug: games.slug, description: games.description }).from(games).where(and(eq(games.slug, slug), eq(games.status, "published"))).limit(1);
  if (!game) return null;
  const questions = await getDb().select({ id: gameQuestions.id, prompt: gameQuestions.prompt, options: gameQuestions.options, answerIndex: gameQuestions.answerIndex, explanation: gameQuestions.explanation }).from(gameQuestions).where(eq(gameQuestions.gameId, game.id)).orderBy(gameQuestions.sortOrder);
  return { ...game, questions };
}
export async function getLiveStream() {
  if (!isDatabaseConfigured()) return null;
  const [stream] = await getDb().select({ id: liveStreams.id, title: liveStreams.title, platform: liveStreams.platform, url: liveStreams.url }).from(liveStreams).where(and(eq(liveStreams.status, "published"), eq(liveStreams.isLive, true))).orderBy(desc(liveStreams.updatedAt)).limit(1);
  return stream ?? null;
}
