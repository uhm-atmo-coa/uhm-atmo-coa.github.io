import { useInView } from '../hooks/useInView';

// Elliott's "ATMO Graduate Coalition Tip Form" (Google Forms). It does not collect
// email addresses, and the name question is optional. Google asks visitors to sign
// in (UH account), so it opens in a new tab instead of being embedded: a sign-in
// wall cannot load inside an iframe.
const anonymousFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLScoACeXRYKkV374S97Aw2XGWyRxzuTzyE6E8hyhMo3TXeThAw/viewform';

// The Coalition's Google Group address. It is the address Coalition announcements
// are sent from, and the one faculty and staff copy when writing to the Coalition.
const contactLinks = [
  { label: 'Email', href: 'mailto:atmo-coalition-grp@hawaii.edu', display: 'atmo-coalition-grp@hawaii.edu' },
  // Hidden until the Coalition has these accounts; add the real URLs before showing.
  // { label: 'Instagram', href: 'https://instagram.com/', display: '@atmocoalition' },
  // { label: 'Discord', href: '#', display: 'Join our server' },
];

/*
 * Earlier on-site form, kept for when a form service is chosen (e.g. Formspree).
 * Its submit never sent anything. To bring it back: restore `useState` from React,
 * the state below, a real handleSubmit, and the JSX at the bottom of this comment.
 *
 * const categories = [
 *   { value: 'suggestion', label: 'Suggestion' },
 *   { value: 'concern', label: 'Concern' },
 *   { value: 'question', label: 'General Question' },
 *   { value: 'other', label: 'Other' },
 * ];
 * const [category, setCategory] = useState('suggestion');
 * const [message, setMessage] = useState('');
 * const [submitted, setSubmitted] = useState(false);
 *
 *           {submitted ? (
 *             <div className="rounded-brand-lg border border-brand-neutral-silver bg-brand-neutral-cloud p-10 text-center">
 *               <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-brand-full bg-brand-manoa-green">
 *                 <svg
 *                   className="h-7 w-7 text-brand-white"
 *                   fill="none"
 *                   viewBox="0 0 24 24"
 *                   stroke="currentColor"
 *                 >
 *                   <path
 *                     strokeLinecap="round"
 *                     strokeLinejoin="round"
 *                     strokeWidth={2.5}
 *                     d="M5 13l4 4L19 7"
 *                   />
 *                 </svg>
 *               </div>
 *               <h3 className="mb-2 text-lg font-brand-bold text-brand-navy">Message Received</h3>
 *               <p className="text-brand-sm text-brand-neutral-slate">
 *                 Your submission is anonymous. Thank you for reaching out.
 *               </p>
 *               <button
 *                 className="mt-7 rounded-brand-full border border-brand-atmospheric-teal px-6 py-2.5 text-brand-sm font-brand-medium text-brand-atmospheric-teal transition-colors hover:bg-brand-atmospheric-teal hover:text-brand-white"
 *                 onClick={handleReset}
 *               >
 *                 Submit another message
 *               </button>
 *             </div>
 *           ) : (
 *             <form onSubmit={handleSubmit} className="space-y-6">
 *               <div>
 *                 <label
 *                   htmlFor="category"
 *                   className="mb-2 block text-brand-sm font-brand-medium text-brand-navy"
 *                 >
 *                   Type of submission
 *                 </label>
 *                 <select
 *                   id="category"
 *                   value={category}
 *                   onChange={(e) => setCategory(e.target.value)}
 *                   className="w-full rounded-brand-md border border-brand-neutral-silver bg-brand-neutral-cloud px-4 py-3 text-brand-sm text-brand-navy focus:border-brand-atmospheric-blue focus:outline-none"
 *                 >
 *                   {categories.map((c) => (
 *                     <option key={c.value} value={c.value}>
 *                       {c.label}
 *                     </option>
 *                   ))}
 *                 </select>
 *               </div>
 *
 *               <div>
 *                 <label
 *                   htmlFor="message"
 *                   className="mb-2 block text-brand-sm font-brand-medium text-brand-navy"
 *                 >
 *                   Your message
 *                 </label>
 *                 <textarea
 *                   id="message"
 *                   required
 *                   rows={6}
 *                   value={message}
 *                   onChange={(e) => setMessage(e.target.value)}
 *                   placeholder="Write your message here..."
 *                   className="w-full resize-none rounded-brand-md border border-brand-neutral-silver bg-brand-neutral-cloud px-4 py-3 text-brand-sm text-brand-navy placeholder:text-brand-neutral-silver focus:border-brand-atmospheric-blue focus:outline-none"
 *                 />
 *               </div>
 *
 *               <button
 *                 type="submit"
 *                 disabled={!message.trim()}
 *                 className="rounded-brand-full bg-brand-atmospheric-teal px-8 py-3 font-brand-medium text-brand-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
 *               >
 *                 Submit anonymously
 *               </button>
 *             </form>
 *           )}
 */

export default function ContactPage() {
  const { ref: formRef, inView: formInView } = useInView();
  const { ref: linksRef, inView: linksInView } = useInView();

  return (
    <div>
      {/* Anonymous form */}
      <section className="bg-brand-white px-6 py-20">
        <div
          ref={formRef}
          className={[
            'mx-auto max-w-2xl transition-all duration-700 ease-out',
            formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
        >
          <p className="mb-3 text-xs font-brand-medium uppercase tracking-[0.22em] text-brand-atmospheric-blue">
            Reach Out
          </p>
          <h1 className="mb-6 text-4xl font-brand-bold text-brand-navy">Contact Us</h1>
          <p className="mb-8 max-w-xl text-brand-md leading-relaxed text-brand-neutral-slate">
            Have a suggestion, a concern or a question for the Coalition? Share it through our
            anonymous form, or email us below.
          </p>

          <div className="rounded-brand-lg border border-brand-atmospheric-aqua/50 bg-brand-neutral-cloud p-6 sm:p-8">
            <h2 className="mb-3 text-xl font-brand-bold text-brand-navy">Anonymous form</h2>
            <div className="mb-6 flex items-start gap-3">
              <svg
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-atmospheric-teal"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-brand-sm leading-relaxed text-brand-neutral-slate">
                Google will ask you to sign in with your UH account, but the form does{' '}
                <strong className="text-brand-navy">not record your email</strong>. Adding your
                name is optional. Leave it blank, and leave out other identifying details, to stay
                anonymous. You can use the form as often as you like.
              </p>
            </div>
            <a
              href={anonymousFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-brand-full bg-brand-atmospheric-teal px-8 py-3 font-brand-medium text-brand-white transition-opacity hover:opacity-90"
            >
              Open the anonymous form
              <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-8 8M10 5H5v14h14v-5" />
              </svg>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact links */}
      <section className="bg-brand-neutral-cloud px-6 py-20">
        <div ref={linksRef} className="mx-auto max-w-2xl">
          <div
            className={[
              'transition-all duration-700 ease-out',
              linksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            ].join(' ')}
          >
            <p className="mb-3 text-xs font-brand-medium uppercase tracking-[0.22em] text-brand-atmospheric-blue">
              Connect
            </p>
            <h2 className="mb-8 text-3xl font-brand-bold text-brand-navy">Find Us</h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              {contactLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={[
                    'flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1 rounded-brand-lg bg-brand-white px-6 py-5 shadow-brand-sm transition-all duration-700 ease-out hover:shadow-brand-md',
                    linksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                  ].join(' ')}
                  style={{ transitionDelay: linksInView ? `${i * 80}ms` : '0ms' }}
                >
                  <span className="font-brand-bold text-brand-navy">{link.label}</span>
                  <span className="break-all text-brand-sm text-brand-atmospheric-teal">{link.display}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
