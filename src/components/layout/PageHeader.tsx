type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-sage text-night">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_10%,rgba(198,166,107,0.16),transparent_42%),radial-gradient(ellipse_at_10%_100%,rgba(69,111,100,0.10),transparent_52%)]"
      />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
        {eyebrow && <p className="mb-4 inline-flex rounded-full border border-calm/20 bg-white/65 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-calm-dark uppercase">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl leading-tight font-medium tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-base leading-7 text-night/70 sm:text-lg sm:leading-8">{description}</p>}
      </div>
    </section>
  );
}
