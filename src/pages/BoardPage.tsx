import { useInView } from '../hooks/useInView';

// Edit the boardMembers array to update the board listing.
const boardMembers = [
  {
    name: 'First Last',
    title: 'President',
    bio: 'Provides overall leadership, facilitates Executive Board meetings, and represents non-faculty member interests to the department.',
    initials: 'FL',
  },
  {
    name: 'First Last',
    title: 'Vice-President',
    bio: 'Supports the President in all duties, assists with planning and coordination of activities, and assumes the President\'s responsibilities when needed.',
    initials: 'FL',
  },
  {
    name: 'First Last',
    title: 'Secretary',
    bio: 'Maintains meeting records and organizational documentation, takes and distributes meeting minutes, and manages internal communications.',
    initials: 'FL',
  },
  {
    name: 'First Last',
    title: 'Events Coordinator',
    bio: 'Coordinates planning and execution of ATMO Coalition events and tracks any associated expenses.',
    initials: 'FL',
  },
  {
    name: 'First Last',
    title: 'Outreach Coordinator',
    bio: 'Leads outreach efforts within the department and beyond, coordinates with other student organizations, and manages external-facing communications.',
    initials: 'FL',
  },
  {
    name: 'First Last',
    title: 'Webmaster',
    bio: 'Maintains the ATMO Coalition website and manages the coalition\'s digital presence.',
    initials: 'FL',
  },
];

const avatarColors = [
  'bg-brand-atmospheric-teal',
  'bg-brand-manoa-green',
  'bg-brand-atmospheric-blue',
  'bg-brand-midnight',
  'bg-brand-environmental-forest',
  'bg-brand-atmospheric-ocean',
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
              'mb-10 transition-all duration-700 ease-out',
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            ].join(' ')}
          >
            <p className="mb-3 text-xs font-brand-medium uppercase tracking-[0.22em] text-brand-atmospheric-blue">
              Our Team
            </p>
            <h1 className="text-4xl font-brand-bold text-brand-navy">Meet the Board</h1>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {boardMembers.map((member, i) => (
              <div
                key={`${member.title}-${i}`}
                className={[
                  'rounded-brand-lg bg-brand-white p-8 shadow-brand-sm transition-all duration-700 ease-out',
                  gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                ].join(' ')}
                style={{ transitionDelay: gridInView ? `${i * 80}ms` : '0ms' }}
              >
                <div
                  className={[
                    'mb-5 flex h-14 w-14 items-center justify-center rounded-brand-full text-lg font-brand-bold text-brand-solar-gold',
                    avatarColors[i % avatarColors.length],
                  ].join(' ')}
                >
                  {member.initials}
                </div>
                <h3 className="font-brand-bold text-brand-navy">{member.name}</h3>
                <p className="mt-0.5 text-brand-sm font-brand-medium text-brand-atmospheric-teal">
                  {member.title}
                </p>
                <p className="mt-3 text-brand-sm leading-relaxed text-brand-neutral-slate">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
