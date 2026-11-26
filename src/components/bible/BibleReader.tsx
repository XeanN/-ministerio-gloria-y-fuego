"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { BookOpen, Search, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";

type Book = { id: string; name: string };
type Chapter = { id: string; number?: string; reference: string };
type SearchResult = { reference: string; content: string };
type Payload = {
  kind?: "books" | "chapters" | "chapter" | "search";
  items?: Array<Record<string, unknown>>;
  content?: string;
  reference?: string;
  copyright?: string;
  results?: SearchResult[];
  fumsId?: string;
  fumsJsInclude?: string;
  configured?: boolean;
  error?: string;
};

export function BibleReader() {
  const [books, setBooks] = useState<Book[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [reading, setReading] = useState<Payload | null>(null);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(true);
  const [error, setError] = useState("");
  const [fums, setFums] = useState<{ id?: string; script?: string }>({});

  async function request(params: Record<string, string>) {
    const url = new URL("/api/bible", window.location.origin);
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
    const response = await fetch(url);
    const payload = await response.json() as Payload;
    if (response.status === 503) { setConfigured(false); return null; }
    if (!response.ok) throw new Error(payload.error || "No pudimos cargar esta lectura.");
    setConfigured(true);
    if (payload.fumsId || payload.fumsJsInclude) setFums({ id: payload.fumsId, script: payload.fumsJsInclude });
    return payload;
  }

  useEffect(() => {
    let active = true;
    request({}).then((payload) => {
      if (!active || !payload) return;
      const list = (payload.items ?? []).map((item) => ({ id: String(item.id), name: String(item.name) }));
      setBooks(list);
      if (list[0]) setBook(list[0].id);
    }).catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : "No pudimos cargar la Biblia."); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!book) return;
    let active = true;
    setLoading(true); setError(""); setResults(null);
    request({ book }).then((payload) => {
      if (!active || !payload) return;
      const list = (payload.items ?? []).map((item) => ({ id: String(item.id), number: String(item.number ?? item.id?.toString().split(".").at(-1) ?? ""), reference: String(item.reference ?? "") }));
      setChapters(list);
      if (list[0]) setChapter(list[0].number || "1");
    }).catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : "No pudimos cargar los capítulos."); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [book]);

  useEffect(() => {
    if (!book || !chapter) return;
    let active = true;
    setLoading(true); setError(""); setResults(null);
    request({ book, chapter }).then((payload) => { if (active && payload) setReading(payload); })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : "No pudimos cargar el capítulo."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [book, chapter]);

  async function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) return;
    setLoading(true); setError(""); setReading(null);
    try { const payload = await request({ q: query.trim() }); setResults(payload?.results ?? []); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "No pudimos realizar la búsqueda."); }
    finally { setLoading(false); }
  }

  const bookIndex = books.findIndex((item) => item.id === book);
  const chapterIndex = chapters.findIndex((item) => item.number === chapter);
  return <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
    {fums.script && <Script src={fums.script} strategy="afterInteractive" />}
    {fums.id && <FumsTracker fumsId={fums.id} />}
    <header className="mx-auto max-w-3xl text-center"><span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-sage text-calm-dark"><BookOpen className="size-7" aria-hidden /></span><p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-calm">Lectura y búsqueda</p><h1 className="mt-2 font-serif text-4xl font-semibold text-night sm:text-5xl">La Biblia, a tu ritmo</h1><p className="mt-4 leading-7 text-muted-foreground">Elige un libro y capítulo o busca una referencia o palabra. Puedes ajustar el tamaño del texto desde tu navegador.</p></header>

    <form onSubmit={search} className="mx-auto mt-8 flex max-w-2xl gap-2 rounded-2xl border border-border bg-white p-2 shadow-sm"><label htmlFor="bible-search" className="sr-only">Buscar palabra o referencia bíblica</label><input id="bible-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej.: Salmo 23 o esperanza" className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground" /><button className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-calm px-4 text-sm font-semibold text-white transition hover:bg-calm-dark"><Search className="size-4" aria-hidden /><span className="hidden sm:inline">Buscar</span></button></form>

    <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-3xl border border-border bg-white p-5 shadow-sm"><h2 className="font-semibold text-night">Ir a un pasaje</h2><label htmlFor="bible-book" className="mt-5 block text-sm font-medium text-night">Libro</label><select id="bible-book" value={book} onChange={(event) => { setBook(event.target.value); setChapter(""); setReading(null); }} disabled={!books.length} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-3 text-sm"><option value="">Selecciona un libro</option>{books.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><label htmlFor="bible-chapter" className="mt-4 block text-sm font-medium text-night">Capítulo</label><select id="bible-chapter" value={chapter} onChange={(event) => setChapter(event.target.value)} disabled={!chapters.length} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-3 text-sm"><option value="">Selecciona un capítulo</option>{chapters.map((item) => <option key={item.id} value={item.number}>{item.number || item.reference}</option>)}</select><p className="mt-4 text-xs leading-5 text-muted-foreground">La búsqueda acepta referencias (por ejemplo, Juan 3:16) o palabras.</p></aside>

      <section aria-live="polite" className="min-h-[420px] rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-9">
        {!configured ? <div className="flex min-h-[360px] flex-col items-center justify-center text-center"><BookOpen className="size-10 text-calm" aria-hidden /><h2 className="mt-4 text-xl font-semibold text-night">La lectura digital está en preparación</h2><p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">La página y la búsqueda ya están listas. Falta conectar una clave de API.Bible y habilitar la Reina-Valera 1960 para este sitio; la clave debe guardarse solo en el servidor.</p><a href="https://scripture.api.bible/" target="_blank" rel="noreferrer" className="mt-5 text-sm font-semibold text-calm-dark underline underline-offset-4">Conocer API.Bible</a></div> : loading ? <div className="flex min-h-[360px] items-center justify-center gap-3 text-sm text-muted-foreground"><LoaderCircle className="size-5 animate-spin" aria-hidden />Cargando lectura…</div> : error ? <div className="flex min-h-[360px] items-center justify-center text-center"><p className="max-w-md text-sm leading-6 text-fire-dark">{error}</p></div> : results ? <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-calm">Resultados de búsqueda</p><h2 className="mt-2 text-2xl font-semibold text-night">{query}</h2>{results.length ? <ul className="mt-6 divide-y divide-border">{results.map((item, index) => <li key={`${item.reference}-${index}`} className="py-5"><p className="font-semibold text-calm-dark">{item.reference}</p><p className="mt-2 whitespace-pre-wrap text-base leading-8 text-night">{item.content}</p></li>)}</ul> : <p className="mt-6 text-sm text-muted-foreground">No encontramos coincidencias. Prueba con otra palabra o referencia.</p>}</div> : reading ? <><p className="text-xs font-semibold uppercase tracking-[0.16em] text-calm">Reina-Valera 1960</p><h2 className="mt-2 font-serif text-3xl font-semibold text-night">{reading.reference}</h2><div className="mt-7 whitespace-pre-wrap text-lg leading-9 text-night">{reading.content}</div><nav aria-label="Cambiar capítulo" className="mt-9 flex items-center justify-between border-t border-border pt-5"><button type="button" disabled={chapterIndex <= 0} onClick={() => setChapter(chapters[chapterIndex - 1]?.number || "")} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-calm-dark hover:bg-sage disabled:opacity-40"><ChevronLeft className="size-4" aria-hidden />Anterior</button><span className="text-xs text-muted-foreground">{bookIndex >= 0 ? books[bookIndex]?.name : ""} · {chapter}</span><button type="button" disabled={chapterIndex < 0 || chapterIndex >= chapters.length - 1} onClick={() => setChapter(chapters[chapterIndex + 1]?.number || "")} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-calm-dark hover:bg-sage disabled:opacity-40">Siguiente<ChevronRight className="size-4" aria-hidden /></button></nav><p className="mt-7 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">{reading.copyright}</p></> : <div className="flex min-h-[360px] items-center justify-center text-center text-sm text-muted-foreground">Selecciona un libro y un capítulo para comenzar.</div>}
      </section>
    </div>
  </div>;
}

function FumsTracker({ fumsId }: { fumsId: string }) {
  useEffect(() => {
    const tracker = (window as Window & { _BAPI?: { t: (id: string) => void } })._BAPI;
    tracker?.t(fumsId);
  }, [fumsId]);
  return null;
}
