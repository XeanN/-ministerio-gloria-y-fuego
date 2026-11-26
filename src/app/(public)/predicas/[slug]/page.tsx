import { notFound } from "next/navigation";
import Link from "next/link";
import { getSermon } from "@/lib/content/public-data";
import { normalizeVideoEmbedUrl } from "@/lib/content/video";

export const dynamic = "force-dynamic";
export default async function SermonPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = await getSermon(slug); if (!item) notFound(); const embedUrl = normalizeVideoEmbedUrl(item.videoUrl); if (!embedUrl) notFound(); return <main className="mx-auto max-w-5xl px-5 py-14 sm:px-8"><Link href="/predicas" className="text-sm font-medium text-calm">← Prédicas</Link><h1 className="mt-5 text-4xl font-semibold text-night">{item.title}</h1>{item.speaker && <p className="mt-3 text-muted-foreground">{item.speaker}</p>}<div className="mt-8 aspect-video overflow-hidden rounded-2xl bg-night"><iframe src={embedUrl} title={item.title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" /></div>{item.description && <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">{item.description}</p>}</main>; }
