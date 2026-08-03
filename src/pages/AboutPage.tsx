import { useInView } from '../hooks/useInView';
import { navigateTo } from '../utils/routes';

const values = [
  {
    title: 'Academic Excellence',
    description:
      'We champion rigorous study and intellectual curiosity in atmospheric and climate science.',
  },
  {
    title: 'Community',
    description:
      'We build genuine relationships among students, faculty, and the broader UH Mānoa community.',
  },
  {
    title: 'Environmental Kuleana',
    description:
      'Kuleana means responsibility. We take seriously our obligation to the land and climate we study.',
  },
  {
    title: 'Inclusive Membership',
    description:
      'Open to all non-faculty members of the department — graduate students, postdocs, and research staff — regardless of background or identity.',
  },
];

export default function AboutPage() {
  const { ref: missionRef, inView: missionInView } = useInView();
  const { ref: valuesRef, inView: valuesInView } = useInView();
  const { ref: joinRef, inView: joinInView } = useInView();

  return (
    <div>
      {/* Mission */}
      <section className="bg-brand-white px-6 py-20">
        <div
          ref={missionRef}
          className={[
            'mx-auto max-w-4xl transition-all duration-700 ease-out',
            missionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
        >
          <p className="mb-3 text-xs font-brand-medium uppercase tracking-[0.22em] text-brand-atmospheric-blue">
            About Us
          </p>
          <h1 className="mb-10 text-4xl font-brand-bold text-brand-navy">ATMO Coalition</h1>

          <p className="mb-6 max-w-2xl text-brand-md leading-relaxed text-brand-neutral-slate">
            ATMO Coalition is a departmental council representing non-faculty members of the
            Department of Atmospheric Sciences at the University of Hawaiʻi at Mānoa. We work
            to strengthen communication, collaboration, and community within the department by
            connecting researchers at all career stages with one another and with faculty.
          </p>
          <p className="max-w-2xl text-brand-md leading-relaxed text-brand-neutral-slate">
            We serve as a hub for professional development, social engagement, and departmental
            dialogue — ensuring that non-faculty voices are represented and heard. Through
            organized events, shared initiatives, and open communication channels, we support
            members in building lasting professional relationships and contributing to a strong
            academic community.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-neutral-cloud px-6 py-20">
        <div ref={valuesRef} className="mx-auto max-w-4xl">
          <div
            className={[
              'transition-all duration-700 ease-out',
              valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            ].join(' ')}
          >
            <p className="mb-3 text-xs font-brand-medium uppercase tracking-[0.22em] text-brand-atmospheric-blue">
              What We Stand For
            </p>
            <h2 className="mb-10 text-3xl font-brand-bold text-brand-navy">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {values.map((value, i) => (
              <div
                key={value.title}
                className={[
                  'flex gap-4 rounded-brand-lg bg-brand-white p-8 shadow-brand-sm transition-all duration-700 ease-out',
                  valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                ].join(' ')}
                style={{ transitionDelay: valuesInView ? `${i * 80}ms` : '0ms' }}
              >
                <div className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-brand-full bg-brand-atmospheric-ocean" />
                <div>
                  <h3 className="mb-1.5 font-brand-bold text-brand-navy">{value.title}</h3>
                  <p className="text-brand-sm leading-relaxed text-brand-neutral-slate">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get involved */}
      <section className="bg-brand-white px-6 py-20">
        <div
          ref={joinRef}
          className={[
            'mx-auto max-w-4xl transition-all duration-700 ease-out',
            joinInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
        >
          <p className="mb-3 text-xs font-brand-medium uppercase tracking-[0.22em] text-brand-atmospheric-blue">
            Join Us
          </p>
          <h2 className="mb-4 text-3xl font-brand-bold text-brand-navy">Get Involved</h2>
          <p className="mb-8 max-w-xl text-brand-md leading-relaxed text-brand-neutral-slate">
            Membership is open to all non-faculty members of the Department of Atmospheric
            Sciences — graduate students, postdoctoral researchers, and research staff. We meet
            at least once a month. Follow us on social media or reach out — we'd love to have you.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              className="rounded-brand-full bg-brand-atmospheric-teal px-8 py-3 font-brand-medium text-brand-white transition-opacity hover:opacity-90"
              onClick={() => navigateTo('/contact')}
            >
              Contact Us
            </button>
            <button
              className="rounded-brand-full border border-brand-atmospheric-teal px-8 py-3 font-brand-medium text-brand-atmospheric-teal transition-colors hover:bg-brand-atmospheric-teal hover:text-brand-white"
              onClick={() => navigateTo('/board')}
            >
              Meet the Board
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
