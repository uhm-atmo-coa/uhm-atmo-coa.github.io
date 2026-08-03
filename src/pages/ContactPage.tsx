import { useState } from 'react';
import { useInView } from '../hooks/useInView';

// Update these with real URLs and email addresses.
const contactLinks = [
  { label: 'Email', href: 'mailto:atmo.coalition@hawaii.edu', display: 'atmo.coalition@hawaii.edu' },
  { label: 'Instagram', href: 'https://instagram.com/', display: '@atmocoalition' },
  { label: 'Discord', href: '#', display: 'Join our server' },
];

const categories = [
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'concern', label: 'Concern' },
  { value: 'question', label: 'General Question' },
  { value: 'other', label: 'Other' },
];

export default function ContactPage() {
  const [category, setCategory] = useState('suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { ref: formRef, inView: formInView } = useInView();
  const { ref: linksRef, inView: linksInView } = useInView();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to a form service (e.g. Formspree) to actually receive submissions.
    setSubmitted(true);
  }

  function handleReset() {
    setCategory('suggestion');
    setMessage('');
    setSubmitted(false);
  }

  return (
    <div>
      {/* Form */}
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
          <h1 className="mb-10 text-4xl font-brand-bold text-brand-navy">Contact Us</h1>

          <div className="mb-8 flex items-start gap-3 rounded-brand-lg border border-brand-atmospheric-aqua/50 bg-brand-neutral-cloud p-5">
            <svg
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
            <p className="text-brand-sm text-brand-neutral-slate">
              All submissions are <strong className="text-brand-navy">anonymous</strong>. Do not
              include personal information if you wish to remain anonymous. You can submit this
              form as many times as you like.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-brand-lg border border-brand-neutral-silver bg-brand-neutral-cloud p-10 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-brand-full bg-brand-manoa-green">
                <svg
                  className="h-7 w-7 text-brand-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-brand-bold text-brand-navy">Message Received</h3>
              <p className="text-brand-sm text-brand-neutral-slate">
                Your submission is anonymous. Thank you for reaching out.
              </p>
              <button
                className="mt-7 rounded-brand-full border border-brand-atmospheric-teal px-6 py-2.5 text-brand-sm font-brand-medium text-brand-atmospheric-teal transition-colors hover:bg-brand-atmospheric-teal hover:text-brand-white"
                onClick={handleReset}
              >
                Submit another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-brand-sm font-brand-medium text-brand-navy"
                >
                  Type of submission
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-brand-md border border-brand-neutral-silver bg-brand-neutral-cloud px-4 py-3 text-brand-sm text-brand-navy focus:border-brand-atmospheric-blue focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-brand-sm font-brand-medium text-brand-navy"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-brand-md border border-brand-neutral-silver bg-brand-neutral-cloud px-4 py-3 text-brand-sm text-brand-navy placeholder:text-brand-neutral-silver focus:border-brand-atmospheric-blue focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={!message.trim()}
                className="rounded-brand-full bg-brand-atmospheric-teal px-8 py-3 font-brand-medium text-brand-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit anonymously
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Social links */}
      <section className="bg-brand-neutral-cloud px-6 py-20">
        <div ref={linksRef} className="mx-auto max-w-4xl">
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
                    'flex items-center gap-4 rounded-brand-lg bg-brand-white px-6 py-5 shadow-brand-sm transition-all duration-700 ease-out hover:shadow-brand-md',
                    linksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                  ].join(' ')}
                  style={{ transitionDelay: linksInView ? `${i * 80}ms` : '0ms' }}
                >
                  <span className="font-brand-bold text-brand-navy">{link.label}</span>
                  <span className="text-brand-sm text-brand-atmospheric-teal">{link.display}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
