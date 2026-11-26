import { ContentList } from "@/components/content/content-list";
import { getPublishedResources } from "@/lib/content/public-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Recursos", description: "Materiales gratuitos para aprender y compartir." };
export default async function ResourcesPage() { const items = await getPublishedResources(); return <ContentList title="Recursos" intro="Materiales gratuitos para acompañar tu aprendizaje y tu vida de comunidad." items={items.map((item) => ({ title: item.title, slug: item.slug, description: item.description }))} basePath="/recursos" />; }
