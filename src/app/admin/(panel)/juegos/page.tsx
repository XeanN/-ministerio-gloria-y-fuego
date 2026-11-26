import { desc } from "drizzle-orm";
import { addGameQuestion, createGame, updateGameStatus } from "@/features/cms/actions";
import { requirePermission } from "@/lib/auth/permissions";
import { getDb } from "@/lib/db";
import { gameQuestions, games } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const dynamic = "force-dynamic";
export default async function GamesAdminPage() {
  await requirePermission("content:manage");
  const list = await getDb().select().from(games).orderBy(desc(games.createdAt));
  const questions = await getDb().select().from(gameQuestions).orderBy(gameQuestions.sortOrder);
  return <div className="mx-auto max-w-5xl space-y-8"><div><h1 className="text-3xl font-semibold text-night">Juegos bíblicos</h1><p className="mt-2 text-muted-foreground">Agrega preguntas revisadas por el ministerio antes de publicar una actividad.</p></div>
    <form action={createGame} className="grid gap-4 rounded-2xl border border-border bg-white p-6 sm:grid-cols-2"><label className="space-y-2 text-sm font-medium">Nombre del juego<Input name="title" required maxLength={160} /></label><label className="space-y-2 text-sm font-medium">Slug<Input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="trivia-biblica" /></label><label className="space-y-2 text-sm font-medium sm:col-span-2">Descripción<Textarea name="description" rows={2} maxLength={1000} /></label><label className="space-y-2 text-sm font-medium">Estado<select name="status" className="h-9 rounded-md border border-input bg-white px-3"><option value="draft">Borrador</option><option value="published">Publicado</option></select></label><div className="flex items-end"><Button>Crear juego</Button></div></form>
    <section className="space-y-4">{list.map((game) => <article key={game.id} className="rounded-2xl border border-border bg-white p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-xl font-semibold text-night">{game.title}</h2><p className="mt-1 text-sm text-muted-foreground">/{game.slug} · {game.status} · {questions.filter((question) => question.gameId === game.id).length} preguntas</p></div><form action={updateGameStatus} className="flex items-center gap-2"><input type="hidden" name="id" value={game.id} /><select name="status" defaultValue={game.status} className="h-9 rounded-md border border-input bg-white px-3 text-sm"><option value="draft">Borrador</option><option value="published">Publicado</option></select><Button size="sm" variant="outline">Actualizar</Button></form></div><form action={addGameQuestion} className="mt-6 grid gap-3 border-t border-border pt-5 md:grid-cols-2"><input type="hidden" name="gameId" value={game.id} /><label className="space-y-1.5 text-sm font-medium md:col-span-2">Pregunta<Textarea name="prompt" required minLength={5} maxLength={500} rows={2} /></label>{["A", "B", "C", "D"].map((option, index) => <label key={option} className="space-y-1.5 text-sm font-medium">Opción {option}{index < 2 && <span className="text-fire"> *</span>}<Input name={`option${option}`} required={index < 2} maxLength={180} /></label>)}<label className="space-y-1.5 text-sm font-medium">Opción correcta<select name="answerIndex" className="h-9 w-full rounded-md border border-input bg-white px-3">{["A", "B", "C", "D"].map((option, index) => <option key={option} value={index}>{option}</option>)}</select></label><label className="space-y-1.5 text-sm font-medium">Explicación (opcional)<Input name="explanation" maxLength={1000} /></label><div className="md:col-span-2"><Button variant="outline">Agregar pregunta</Button></div></form></article>)}</section>
  </div>;
}
