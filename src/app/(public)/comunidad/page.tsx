import { getPublicTestimonials } from "@/lib/content/public-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Comunidad", description: "Un espacio para encontrarnos y acompañarnos." };
export default async function CommunityPage() {
  const stories = await getPublicTestimonials();
  return <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-calm">Cercanía y acompañamiento</p><h1 className="mt-3 text-4xl font-semibold text-night sm:text-5xl">Comunidad</h1><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">Un lugar para compartir, aprender y acompañarnos. La oración es gratuita y la comunidad es para todos.</p><div className="mt-10 grid gap-5 sm:grid-cols-2">{stories.map((story) => <blockquote key={story.id} className="rounded-2xl bg-white p-6 leading-7 text-night">“{story.body}”<footer className="mt-4 text-sm font-medium text-calm">{story.authorName || "Miembro de la comunidad"}</footer></blockquote>)}</div>{stories.length === 0 && <div className="mt-10 rounded-2xl border border-dashed border-calm/30 bg-white/70 p-8"><h2 className="font-semibold text-night">Un espacio que construiremos juntos</h2><p className="mt-2 text-sm text-muted-foreground">Todavía no hay testimonios autorizados para publicar. Puedes conocernos en <a className="font-medium text-calm underline" href="/nosotros">Nosotros</a> o compartir una petición privada en <a className="font-medium text-calm underline" href="/peticiones">Peticiones</a>.</p></div>}</main>;
}
