import { notFound } from "next/navigation";
import { Trivia } from "@/components/games/trivia";
import { getPublishedGame } from "@/lib/content/public-data";

export const dynamic = "force-dynamic";
export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const game = await getPublishedGame(slug); if (!game) notFound(); return <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8"><a href="/juegos" className="text-sm font-medium text-calm">← Juegos</a><h1 className="mt-5 text-4xl font-semibold text-night">{game.title}</h1>{game.description && <p className="mt-3 text-muted-foreground">{game.description}</p>}<div className="mt-8"><Trivia title={game.title} questions={game.questions} /></div></main>; }
