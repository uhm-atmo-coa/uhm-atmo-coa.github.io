import { useInView } from '../hooks/useInView';

type Links = {
  email?: string;
  linkedin?: string;
  scholar?: string;
};

// Board listing. Add a link only when you are sure the profile belongs to that
// person; cards show an icon for each link that is set.
const boardMembers = [
  {
    name: 'Jake Casselman',
    title: 'President',
    bio: 'Provides overall leadership, facilitates board meetings, and represents member interests to the department.',
    research: 'Studies how climate variability influences cooling efficiency and energy demand.',
    initials: 'JC',
    photo: '/images/team/jake-casselman.jpg',
    links: {
      email: 'jakewc@hawaii.edu',
      linkedin: 'https://www.linkedin.com/in/jake-casselman',
      scholar: 'https://scholar.google.com/citations?user=qgP7-d0AAAAJ',
    },
  },
  {
    name: 'Elliott Fosler-Lussier',
    title: 'Vice President',
    bio: 'Supports the President and helps plan and coordinate coalition activities.',
    research: 'Researches hurricanes, with a focus on eyewall replacement cycles.',
    initials: 'EF',
    photo: '/images/team/elliott-fosler-lussier.jpeg',
    links: { email: 'elliottf@hawaii.edu' },
  },
  {
    name: 'Wasfia (Fia) Hoque',
    title: 'Events Coordinator',
    bio: 'Plans and coordinates coalition events and tracks associated expenses.',
    research: 'Uses chemistry-climate models to study the atmospheric effects of fluorinated gases (F-gases).',
    initials: 'WH',
    photo: '/images/team/wasfia-hoque.jpg',
    links: { email: 'wasfia@hawaii.edu' },
  },
  {
    name: 'Cameron Chuss',
    title: 'Outreach Coordinator',
    bio: 'Coordinates outreach, connects with other student organizations, and manages external communications.',
    research: 'Works on island-scale forecasting using high-resolution models.',
    initials: 'CC',
    photo: '/images/team/cameron-chuss.jpg',
    links: { email: 'cchuss@hawaii.edu' },
  },
] satisfies { name: string; title: string; bio: string; research: string; initials: string; photo: string; links: Links }[];

const supportingRoles = [
  {
    name: 'Gerardo Rivera Tello',
    title: 'Website Coordinator',
    bio: 'Maintains the coalition website and its digital presence.',
    photo: '/images/team/gerardo-rivera-tello.png',
    links: { email: 'griverat@hawaii.edu' },
  },
  {
    name: 'Theo Carr',
    title: 'Collaborator & Facilitator',
    bio: 'Helps with logistics and planning for coalition activities.',
    photo: '/images/team/theo-carr.jpg',
    links: { email: 'ktcarr@hawaii.edu' },
  },
  // Confirm with Ryan before showing.
  // TODO: Ryan's role is unknown; fill in title and bio once he confirms.
  // A public photo exists on the UH ATMO graduate students page (not added here):
  // https://www.soest.hawaii.edu/atmo/wp-content/uploads/2025/10/IMG_8440-800x1024.jpg
  // {
  //   name: 'Ryan Harrington',
  //   title: 'TODO: role',
  //   bio: 'TODO',
  //   photo: '/images/team/ryan-harrington.jpg',
  //   links: { email: 'rharrin@hawaii.edu' },
  // },
] satisfies { name: string; title: string; bio: string; photo: string; links: Links }[];

const iconClass = 'h-4 w-4';

function MailIcon() {
  return (
    <svg aria-hidden="true" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18v12H3z M3 7l9 6 9-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" className={iconClass} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function ScholarIcon() {
  return (
    <svg aria-hidden="true" className={iconClass} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2 1 9l11 7 9-5.73V17h2V9L12 2zm-6.5 10.4V16c0 2.2 2.9 4 6.5 4s6.5-1.8 6.5-4v-3.6L12 16.5l-6.5-4.1z" />
    </svg>
  );
}

function ProfileLinks({ name, links }: { name: string; links: Links }) {
  const items = [
    links.email && { href: `mailto:${links.email}`, label: `Email ${name}`, icon: <MailIcon /> },
    links.linkedin && { href: links.linkedin, label: `${name} on LinkedIn`, icon: <LinkedInIcon /> },
    links.scholar && { href: links.scholar, label: `${name} on Google Scholar`, icon: <ScholarIcon /> },
  ].filter(Boolean) as { href: string; label: string; icon: JSX.Element }[];

  if (items.length === 0) return null;

  return (
    <ul className="flex gap-2">
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            aria-label={item.label}
            title={item.label}
            {...(item.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            className="flex h-8 w-8 items-center justify-center rounded-brand-full bg-brand-neutral-cloud text-brand-atmospheric-teal ring-1 ring-brand-navy/10 transition-colors hover:bg-brand-atmospheric-teal hover:text-brand-white"
          >
            {item.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}

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

          {/* items-stretch + h-full: every card in a row is as tall as the tallest one. */}
          <div ref={gridRef} className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
            {boardMembers.map((member, i) => (
              <article
                key={member.name}
                className={[
                  'flex h-full w-full flex-col rounded-2xl bg-brand-white p-5 shadow-brand-sm ring-1 ring-brand-navy/10 transition-all duration-700 ease-out sm:p-6',
                  gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                ].join(' ')}
                style={{ transitionDelay: gridInView ? `${i * 80}ms` : '0ms' }}
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  {/* Fixed 3:4 box so every portrait is the same size, whatever the source file. */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    width={128}
                    height={171}
                    className="block aspect-[3/4] w-28 shrink-0 rounded-lg object-cover object-top sm:w-32"
                  />
                  <div className="min-w-0">
                    <p className="mb-2 text-brand-sm font-brand-medium tracking-wide text-brand-atmospheric-teal">
                      {member.title}
                    </p>
                    <h2 className="text-xl font-brand-bold text-brand-navy">{member.name}</h2>
                    <div aria-hidden="true" className="mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-brand-atmospheric-teal to-brand-atmospheric-blue" />
                  </div>
                </div>
                <div className="mt-5 flex flex-1 flex-col border-t border-brand-navy/10 pt-4">
                  <p className="text-base leading-relaxed text-brand-neutral-slate">{member.bio}</p>
                  <p className="mt-3 text-base leading-relaxed text-brand-neutral-slate">{member.research}</p>
                  <div className="mt-auto pt-5">
                    <ProfileLinks name={member.name} links={member.links} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section aria-labelledby="supporting-roles" className="mt-12 border-t border-brand-neutral-slate/20 pt-8">
            <h2 id="supporting-roles" className="text-xl font-brand-bold text-brand-navy">Supporting roles</h2>
            <div className="mt-5 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2">
              {supportingRoles.map((person) => (
                <article
                  key={person.name}
                  className="flex h-full items-start gap-4 rounded-2xl bg-brand-white p-5 shadow-brand-sm ring-1 ring-brand-navy/10"
                >
                  <img
                    src={person.photo}
                    alt={person.name}
                    width={80}
                    height={107}
                    loading="lazy"
                    className="aspect-[3/4] w-20 shrink-0 rounded-lg object-cover object-top"
                  />
                  <div className="flex h-full min-w-0 flex-col">
                    <h3 className="text-brand-sm font-brand-bold text-brand-navy">{person.name}</h3>
                    <p className="text-brand-sm font-brand-medium text-brand-atmospheric-teal">{person.title}</p>
                    <p className="mt-1 text-brand-sm leading-relaxed text-brand-neutral-slate">{person.bio}</p>
                    <div className="mt-auto pt-3">
                      <ProfileLinks name={person.name} links={person.links} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
