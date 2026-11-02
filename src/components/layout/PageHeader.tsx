type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_130%,rgba(232,117,50,0.35),transparent_60%)]"
      />
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        {eyebrow && <p className="mb-3 text-sm font-medium tracking-[0.25em] text-gold uppercase">{eyebrow}</p>}
        <h1 className="text-3xl font-semibold md:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-white/80">{description}</p>}
      </div>
    </section>
  );
}
