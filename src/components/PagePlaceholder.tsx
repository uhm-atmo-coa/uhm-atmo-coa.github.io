interface PagePlaceholderProps {
  description: string;
  fileHint: string;
  title: string;
}

export default function PagePlaceholder({
  description,
  fileHint,
  title,
}: PagePlaceholderProps) {
  return (
    <section className="rounded-brand-lg border border-brand-atmospheric-aqua/70 bg-brand-white/90 p-brand-xl shadow-brand-md backdrop-blur">
      <div className="max-w-3xl space-y-brand-md">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-atmospheric-blue">
          Route scaffold
        </p>
        <div className="space-y-brand-sm">
          <h2 className="text-3xl font-brand-bold text-brand-navy">{title}</h2>
          <p className="max-w-2xl text-brand-lg text-brand-atmospheric-teal">{description}</p>
        </div>
        <div className="rounded-brand-md border border-dashed border-brand-neutral-silver bg-brand-neutral-cloud p-brand-lg">
          <p className="font-brand-medium text-brand-navy">This page is intentionally a placeholder.</p>
          <p className="mt-brand-sm text-brand-md text-brand-neutral-slate">
            Replace the stub in <code>{fileHint}</code> when you are ready to build this section.
          </p>
        </div>
      </div>
    </section>
  );
}
