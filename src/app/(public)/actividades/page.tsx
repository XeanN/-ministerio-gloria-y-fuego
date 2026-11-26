import { ContentList } from "@/components/content/content-list";
import { getUpcomingEvents } from "@/lib/content/public-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Actividades", description: "Próximas actividades del Ministerio Gloria y Fuego." };
export default async function ActivitiesPage() { const items = await getUpcomingEvents(); return <ContentList title="Actividades" intro="Encuentros próximos confirmados por el ministerio." items={items.map((item) => ({ title: item.title, slug: item.slug, description: `${item.description || ""}${item.location ? ` · ${item.location}` : ""} · ${new Date(item.startsAt).toLocaleString("es-PE")}` }))} basePath="/actividades" />; }
