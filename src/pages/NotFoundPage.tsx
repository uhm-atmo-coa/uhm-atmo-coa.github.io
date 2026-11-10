import { navigateTo } from '../utils/routes';

export default function NotFoundPage() {
  return (
    <section className="bg-brand-white px-6 py-24 text-center">
      <div className="mx-auto max-w-xl">
        <p className="mb-3 text-xs font-brand-medium uppercase tracking-[0.22em] text-brand-atmospheric-blue">
          404
        </p>
        <h1 className="mb-4 text-4xl font-brand-bold text-brand-navy">Page not found</h1>
        <p className="mb-8 text-brand-md leading-relaxed text-brand-neutral-slate">
          We couldn't find that page. Use the menu above, or head back home.
        </p>
        <a
          href="/"
          className="inline-block rounded-brand-full bg-brand-atmospheric-teal px-8 py-3 font-brand-medium text-brand-white transition-opacity hover:opacity-90"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/');
          }}
        >
          Back to home
        </a>
      </div>
    </section>
  );
}
