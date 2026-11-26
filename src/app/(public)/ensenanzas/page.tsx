import { ContentList } from "@/components/content/content-list";
import { getPublishedPosts } from "@/lib/content/public-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Enseñanzas", description: "Reflexiones y enseñanzas del Ministerio Gloria y Fuego." };
export default async function TeachingsPage() { const items = await getPublishedPosts(); return <ContentList title="Enseñanzas" intro="Reflexiones y materiales preparados por el equipo del ministerio." items={items.map((item) => ({ ...item, description: item.excerpt }))} basePath="/ensenanzas" />; }
