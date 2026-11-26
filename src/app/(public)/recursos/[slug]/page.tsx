import { notFound } from "next/navigation";
import { ContentDetail } from "@/components/content/content-detail";
import { getResource } from "@/lib/content/public-data";

export const dynamic = "force-dynamic";
export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = await getResource(slug); if (!item) notFound(); return <main><ContentDetail title={item.title} description={item.description} body={`Material disponible en formato ${item.fileType.toUpperCase()}.`} backHref="/recursos" backLabel="Recursos" /><div className="mx-auto -mt-10 max-w-3xl px-5 pb-16 text-center"><a href={item.fileUrl} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-calm px-6 py-3 font-semibold text-white hover:bg-calm-dark">Abrir recurso</a></div></main>; }
