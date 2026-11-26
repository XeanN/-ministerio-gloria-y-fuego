import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const API = "https://rest.api.bible/v1";

type BibleResponse = { data?: Record<string, unknown> | Array<Record<string, unknown>>; meta?: Record<string, unknown> };
async function bibleFetch(path: string): Promise<BibleResponse> {
  const key = process.env.API_BIBLE_API_KEY;
  const bibleId = process.env.API_BIBLE_BIBLE_ID;
  if (!key || !bibleId) throw new Error("BIBLE_NOT_CONFIGURED");
  const response = await fetch(`${API}/bibles/${encodeURIComponent(bibleId)}${path}`, {
    headers: { "api-key": key }, next: { revalidate: 60 * 60 },
  });
  if (!response.ok) throw new Error(`BIBLE_PROVIDER_${response.status}`);
  return response.json() as Promise<BibleResponse>;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get("book");
  const chapter = searchParams.get("chapter");
  const query = searchParams.get("q")?.trim();
  try {
    const details = await bibleFetch("");
    const data = details.data as Record<string, unknown> | undefined;
    const copyright = typeof data?.copyright === "string" ? data.copyright : "Reina-Valera 1960";
    if (query) {
      if (query.length > 100) return NextResponse.json({ error: "La búsqueda debe tener hasta 100 caracteres." }, { status: 400 });
      const result = await bibleFetch(`/search?query=${encodeURIComponent(query)}&limit=20&sort=relevance`);
      const searchData = result.data as Record<string, unknown> | undefined;
      const passages = Array.isArray(searchData?.passages) ? searchData.passages as Array<Record<string, unknown>> : [];
      const verses = Array.isArray(searchData?.verses) ? searchData.verses as Array<Record<string, unknown>> : [];
      const results = [...passages, ...verses].map((item) => ({
        reference: typeof item.reference === "string" ? item.reference : "Pasaje",
        content: typeof item.content === "string" ? item.content : typeof item.text === "string" ? item.text : "",
      }));
      return NextResponse.json({ kind: "search", results, copyright, fumsId: result.meta?.fumsId, fumsJsInclude: result.meta?.fumsJsInclude });
    }
    if (!book) {
      const result = await bibleFetch("/books");
      return NextResponse.json({ kind: "books", items: result.data ?? [], copyright });
    }
    if (!/^[A-Z0-9]{3}$/.test(book)) return NextResponse.json({ error: "Libro no válido." }, { status: 400 });
    if (!chapter) {
      const result = await bibleFetch(`/books/${encodeURIComponent(book)}/chapters`);
      return NextResponse.json({ kind: "chapters", items: result.data ?? [], copyright });
    }
    if (!/^\d{1,3}$/.test(chapter)) return NextResponse.json({ error: "Capítulo no válido." }, { status: 400 });
    const result = await bibleFetch(`/chapters/${encodeURIComponent(`${book}.${chapter}`)}?content-type=text&include-titles=true&include-verse-numbers=true`);
    const passage = result.data as Record<string, unknown> | undefined;
    return NextResponse.json({
      kind: "chapter", reference: typeof passage?.reference === "string" ? passage.reference : `${book} ${chapter}`,
      content: typeof passage?.content === "string" ? passage.content : "", copyright,
      fumsId: result.meta?.fumsId, fumsJsInclude: result.meta?.fumsJsInclude,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "BIBLE_NOT_CONFIGURED") {
      return NextResponse.json({ configured: false }, { status: 503 });
    }
    return NextResponse.json({ error: "No pudimos cargar la lectura. Inténtalo de nuevo en unos momentos." }, { status: 502 });
  }
}
