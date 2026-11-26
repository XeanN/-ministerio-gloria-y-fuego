import { BibleReader } from "@/components/bible/BibleReader";

export const metadata = {
  title: "Leer la Biblia",
  description: "Explora libros y capítulos de la Biblia y busca pasajes.",
};

export default function BiblePage() {
  return <main className="bg-[#fbfaf7]"><BibleReader /></main>;
}
