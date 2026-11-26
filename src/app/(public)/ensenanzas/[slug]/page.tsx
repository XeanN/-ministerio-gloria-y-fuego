import { notFound } from "next/navigation";
import { ContentDetail } from "@/components/content/content-detail";
import { getPost } from "@/lib/content/public-data";

export const dynamic = "force-dynamic";
export default async function TeachingPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = await getPost(slug); if (!item) notFound(); return <ContentDetail title={item.title} description={item.excerpt} body={item.body} backHref="/ensenanzas" backLabel="Enseñanzas" />; }
