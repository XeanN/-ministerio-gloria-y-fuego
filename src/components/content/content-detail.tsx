import Link from "next/link";

export function ContentDetail({ title, description, body, backHref, backLabel }: { title: string; description?: string | null; body: string; backHref: string; backLabel: string }) {
  return <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20"><Link href={backHref} className="text-sm font-medium text-calm hover:underline">← {backLabel}</Link><article className="mt-8 rounded-3xl bg-white p-6 sm:p-10"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-calm">Ministerio Gloria y Fuego</p><h1 className="mt-3 text-4xl font-semibold leading-tight text-night">{title}</h1>{description && <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>}<div className="mt-8 whitespace-pre-wrap leading-8 text-night/90">{body}</div></article></main>;
}
