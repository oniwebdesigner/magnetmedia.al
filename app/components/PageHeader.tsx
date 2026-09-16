/* Header i brendshëm i faqeve */

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-panel">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
          <span className="h-px w-8 bg-gold" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl leading-relaxed text-mute">{description}</p>
        )}
      </div>
    </section>
  );
}
