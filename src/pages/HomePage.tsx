import { useInView } from '../hooks/useInView';
import { navigateTo } from '../utils/routes';

// Focus areas, drawn from Article II of the Coalition constitution.
const focusAreas = [
  {
    number: '01',
    accent: 'bg-brand-atmospheric-teal',
    title: 'Community & Connection',
    description: 'We connect researchers at all career stages — graduate students, postdocs, and staff — with one another and with faculty, building a strong and supportive department.',
  },
  {
    number: '02',
    accent: 'bg-brand-manoa-green',
    title: 'Professional Development',
    description: 'We serve as a hub for professional development, helping members build lasting professional relationships throughout their time at UH Mānoa.',
  },
  {
    number: '03',
    accent: 'bg-brand-solar-gold',
    title: 'Departmental Voice',
    description: 'We ensure non-faculty perspectives are heard. The Coalition represents member interests to the department and maintains open channels for dialogue.',
  },
];

export default function HomePage() {
  const { ref: missionRef, inView: missionInView } = useInView();
  const { ref: areasRef, inView: areasInView } = useInView();
  const { ref: ctaRef, inView: ctaInView } = useInView();

  return (
    <div>
      {/* Hero — full viewport */}
      <section className="flex min-h-[calc(100vh-3.75rem)] flex-col items-center justify-center bg-gradient-to-b from-brand-navy to-brand-midnight px-6 py-20 text-center">
        <img
          src="/logo_only.webp"
          alt="ATMO Coalition"
          width={384}
          height={384}
          className="anim-fade-up mb-8 h-96 w-96 drop-shadow-2xl"
          style={{ animationDelay: '0ms' }}
        />
        <h1
          className="anim-fade-up text-6xl font-brand-bold leading-none tracking-tight text-brand-white sm:text-7xl"
          style={{ animationDelay: '120ms' }}
        >
          ATMO Coalition
        </h1>
        <p
          className="anim-fade-up mt-3 text-brand-md text-brand-atmospheric-aqua"
          style={{ animationDelay: '200ms' }}
        >
          University of Hawaiʻi at Mānoa
        </p>
        <p
          className="anim-fade-up mx-auto mt-6 max-w-md text-brand-md leading-relaxed text-brand-neutral-cloud/80"
          style={{ animationDelay: '280ms' }}
        >
          A departmental council connecting graduate students, postdocs, and research staff in
          the Department of Atmospheric Sciences at UH Mānoa.
        </p>
        <div
          className="anim-fade-up mt-10 flex flex-wrap justify-center gap-4"
          style={{ animationDelay: '360ms' }}
        >
          <button
            className="rounded-brand-full bg-brand-solar-gold px-9 py-3.5 font-brand-bold text-brand-navy transition-opacity hover:opacity-90"
            onClick={() => navigateTo('/about')}
          >
            Learn About Us
          </button>
          <button
            className="rounded-brand-full border border-brand-white/30 px-9 py-3.5 font-brand-medium text-brand-white transition-colors hover:border-brand-white/60 hover:bg-brand-white/10"
            onClick={() => navigateTo('/board')}
          >
            Meet the Board
          </button>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-brand-white px-6 py-24">
        <div
          ref={missionRef}
          className={[
            'mx-auto max-w-4xl transition-all duration-700 ease-out',
            missionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
        >
          <p className="mb-4 text-xs font-brand-medium uppercase tracking-[0.25em] text-brand-atmospheric-blue">
            Who We Are
          </p>
          <h2 className="mb-6 max-w-xl text-4xl font-brand-bold leading-tight text-brand-navy">
            Our Mission
          </h2>
          <div className="mb-8 h-1 w-12 rounded-brand-full bg-brand-solar-gold" />
          <p className="max-w-2xl text-brand-md leading-relaxed text-brand-neutral-slate">
            The ATMO Coalition represents the graduate students, postdocs, and research staff of
            the Department of Atmospheric Sciences at UH Mānoa. We strengthen communication,
            collaboration, and community in the department, and make sure non-faculty voices are
            heard.
          </p>
        </div>
      </section>

      {/* Focus areas */}
      <section className="bg-brand-neutral-cloud px-6 py-24">
        <div ref={areasRef} className="mx-auto max-w-4xl">
          <div
            className={[
              'transition-all duration-700 ease-out',
              areasInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            ].join(' ')}
          >
            <p className="mb-4 text-xs font-brand-medium uppercase tracking-[0.25em] text-brand-atmospheric-blue">
              What We Do
            </p>
            <h2 className="mb-12 text-4xl font-brand-bold text-brand-navy">Our Focus Areas</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {focusAreas.map((area, i) => (
              <div
                key={area.number}
                className={[
                  'rounded-brand-lg bg-brand-white p-8 shadow-brand-sm transition-all duration-700 ease-out',
                  areasInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                ].join(' ')}
                style={{ transitionDelay: areasInView ? `${i * 100}ms` : '0ms' }}
              >
                <span className="text-5xl font-brand-bold leading-none text-brand-neutral-silver/40">
                  {area.number}
                </span>
                <div className={`mb-5 mt-4 h-0.5 w-10 rounded-brand-full ${area.accent}`} />
                <h3 className="mb-3 text-lg font-brand-bold text-brand-navy">{area.title}</h3>
                <p className="text-brand-sm leading-relaxed text-brand-neutral-slate">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get involved */}
      <section className="bg-brand-midnight px-6 py-20 text-center">
        <div
          ref={ctaRef}
          className={[
            'mx-auto max-w-lg transition-all duration-700 ease-out',
            ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
        >
          <h2 className="mb-4 text-3xl font-brand-bold text-brand-white">Join the Coalition</h2>
          <p className="mb-8 text-brand-md leading-relaxed text-brand-neutral-cloud/80">
            Open to all non-faculty research members of the Department of Atmospheric Sciences: graduate students, postdocs, and research staff. Reach out and join us.
          </p>
          <button
            className="rounded-brand-full bg-brand-solar-gold px-9 py-3.5 font-brand-bold text-brand-navy transition-opacity hover:opacity-90"
            onClick={() => navigateTo('/contact')}
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}
