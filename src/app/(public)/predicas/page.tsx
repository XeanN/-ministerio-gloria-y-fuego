import { ContentList } from "@/components/content/content-list";
import { getPublishedSermons } from "@/lib/content/public-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Prédicas", description: "Archivo de prédicas y mensajes del Ministerio Gloria y Fuego." };
export default async function SermonsPage() { const items = await getPublishedSermons(); return <ContentList title="Prédicas" intro="Mensajes y transmisiones anteriores publicados por el ministerio." items={items.map((item) => ({ title: item.title, slug: item.slug, description: item.description || item.speaker }))} basePath="/predicas" />; }
