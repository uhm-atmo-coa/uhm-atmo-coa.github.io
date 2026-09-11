import { useInView } from '../hooks/useInView';

// Edit the boardMembers array to update the board listing.
const boardMembers = [
  {
    name: 'Jake Casselman',
    title: 'President',
    bio: 'Provides overall leadership, facilitates board meetings, and represents member interests to the department.',
    research: 'Studies how climate variability influences cooling efficiency and energy demand.',
    initials: 'JC',
    photo: '/images/team/jake-casselman.jpg',
  },
  {
    name: 'Elliott Fosler-Lussier',
    title: 'Vice President',
    bio: 'Supports the President and helps plan and coordinate coalition activities.',
    research: 'Researches hurricanes, with a focus on eyewall replacement cycles.',
    initials: 'EF',
    photo: '/images/team/elliott-fosler-lussier.jpeg',
  },
  {
    name: 'Wasfia (Fia) Hoque',
    title: 'Events Coordinator',
    bio: 'Plans and coordinates coalition events and tracks associated expenses.',
    research: 'Uses chemistry-climate models to study the atmospheric effects of fluorinated gases (F-gases).',
    initials: 'WH',
    photo: '/images/team/wasfia-hoque.jpg',
  },
  {
    name: 'Cameron Chuss',
    title: 'Outreach Coordinator',
    bio: 'Coordinates outreach, connects with other student organizations, and manages external communications.',
    research: 'Works on island-scale forecasting using high-resolution models.',
    initials: 'CC',
    photo: '/images/team/cameron-chuss.jpg',
  },
];

export default function BoardPage() {
  const { ref: headerRef, inView: headerInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView();

  return (
    <div>
      <section className="bg-brand-neutral-cloud px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div
            ref={headerRef}
            className={[
              'mb-10 text-center transition-all duration-700 ease-out',
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            ].join(' ')}
          >
            <p className="mb-3 text-xs font-brand-medium uppercase tracking-[0.22em] text-brand-atmospheric-blue">
              Our Team
            </p>
            <h1 className="text-4xl font-brand-bold text-brand-navy">Meet the Board</h1>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {boardMembers.map((member, i) => (
              <div
                key={`${member.title}-${i}`}
                className={[
                  'w-full rounded-2xl bg-brand-white p-5 shadow-brand-sm ring-1 ring-brand-navy/10 transition-all duration-700 ease-out sm:p-6',
                  gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                ].join(' ')}
                style={{ transitionDelay: gridInView ? `${i * 80}ms` : '0ms' }}
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="block h-auto w-28 shrink-0 rounded-lg sm:w-32"
                  />
                  <div className="min-w-0">
                    <p className="mb-2 text-brand-sm font-brand-medium tracking-wide text-brand-atmospheric-teal">
                      {member.title}
                    </p>
                    <h2 className="text-xl font-brand-bold text-brand-navy">{member.name}</h2>
                    <div aria-hidden="true" className="mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-brand-atmospheric-teal to-brand-atmospheric-blue" />
                  </div>
                </div>
                <div className="mt-5 border-t border-brand-navy/10 pt-4">
                  <p className="text-base leading-relaxed text-brand-neutral-slate">
                    {member.bio}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-brand-neutral-slate">
                    {member.research}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <section aria-labelledby="supporting-roles" className="mt-12 border-t border-brand-neutral-slate/20 pt-8">
            <h2 id="supporting-roles" className="text-xl font-brand-bold text-brand-navy">Supporting roles</h2>
            <div className="mt-5 flex items-start gap-4">
              <img
                src="/images/team/gerardo-rivera-tello.png"
                alt="Gerardo Rivera Tello"
                width={616}
                height={730}
                loading="lazy"
                className="aspect-[616/730] w-20 shrink-0 rounded-lg object-cover object-center"
              />
              <div>
                <h3 className="text-brand-sm font-brand-bold text-brand-navy">Gerardo Rivera Tello</h3>
                <p className="text-brand-sm font-brand-medium text-brand-atmospheric-teal">Website Coordinator</p>
                <p className="mt-1 text-brand-sm leading-relaxed text-brand-neutral-slate">
                  Maintains the coalition website and its digital presence.
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-start gap-4">
              <img
                src="/images/team/theo-carr.jpg"
                alt="Theo Carr"
                width={616}
                height={730}
                loading="lazy"
                className="aspect-[616/730] w-20 shrink-0 rounded-lg object-cover object-center"
              />
              <div>
                <h3 className="text-brand-sm font-brand-bold text-brand-navy">Theo Carr</h3>
                <p className="text-brand-sm font-brand-medium text-brand-atmospheric-teal">Collaborator &amp; Facilitator</p>
                <p className="mt-1 text-brand-sm leading-relaxed text-brand-neutral-slate">
                  Helps with logistics and planning for coalition activities.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
