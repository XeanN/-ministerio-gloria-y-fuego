"use client";

import { useState } from "react";

type Question = { id: string; prompt: string; options: string[]; answerIndex: number; explanation: string | null };
export function Trivia({ title, questions }: { title: string; questions: Question[] }) {
  const [position, setPosition] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const question = questions[position];
  if (!question) return <div className="rounded-2xl border border-border bg-white p-8 text-center"><h2 className="text-2xl font-semibold text-night">Aún no hay preguntas</h2><p className="mt-2 text-muted-foreground">El equipo está preparando el contenido para esta actividad.</p></div>;
  const next = () => { if (position + 1 < questions.length) { setPosition((current) => current + 1); setSelected(null); } else { setPosition(questions.length); } };
  if (position >= questions.length) return <div className="rounded-2xl bg-white p-8 text-center"><h2 className="text-2xl font-semibold text-night">¡Terminaste!</h2><p className="mt-2 text-muted-foreground">Tu resultado: {score} de {questions.length}.</p><button onClick={() => { setPosition(0); setScore(0); setSelected(null); }} className="mt-5 rounded-full bg-calm px-5 py-3 font-semibold text-white">Volver a jugar</button></div>;
  return <section className="rounded-2xl bg-white p-6 sm:p-8"><p className="text-sm text-calm">{title} · Pregunta {position + 1} de {questions.length}</p><h2 className="mt-3 text-2xl font-semibold leading-snug text-night">{question.prompt}</h2><div className="mt-6 grid gap-3">{question.options.map((option, index) => { const answered = selected !== null; const correct = answered && index === question.answerIndex; const wrong = answered && selected === index && !correct; return <button key={`${question.id}-${index}`} onClick={() => { if (selected === null) { setSelected(index); if (index === question.answerIndex) setScore((value) => value + 1); } }} disabled={answered} className={`rounded-xl border p-4 text-left font-medium transition ${correct ? "border-calm bg-sage text-night" : wrong ? "border-fire bg-peach text-night" : "border-border hover:border-calm hover:bg-sage/50"}`}>{option}</button>; })}</div>{selected !== null && <><p role="status" className="mt-5 leading-6 text-muted-foreground">{selected === question.answerIndex ? "¡Correcto!" : "La opción correcta está marcada."}{question.explanation ? ` ${question.explanation}` : ""}</p><button onClick={next} className="mt-5 rounded-full bg-calm px-5 py-3 font-semibold text-white">{position + 1 === questions.length ? "Ver resultado" : "Siguiente"}</button></>}</section>;
}
