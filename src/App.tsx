import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// Hawaiian toggle paused until Hawaiian copy exists. To re-enable: uncomment this
// import and the <LanguageToggle /> block in the header, and restore language
// detection in src/i18n/index.ts.
// import LanguageToggle from './components/LanguageToggle';
import SiteNav from './components/SiteNav';
import { useCurrentPath } from './hooks/useCurrentPath';
import AboutPage from './pages/AboutPage';
import BoardPage from './pages/BoardPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { getRoute, navigateTo } from './utils/routes';

const pageByRouteKey = {
  about: AboutPage,
  board: BoardPage,
  contact: ContactPage,
  home: HomePage,
} as const;

export default function App({ path }: { path?: string }) {
  const currentPath = useCurrentPath(path);
  const route = getRoute(currentPath);
  const ActivePage = route ? pageByRouteKey[route.key as keyof typeof pageByRouteKey] : NotFoundPage;
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const isHome = currentPath === '/';

  // Every route change starts at the top of the new page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  return (
    <div className="flex min-h-screen flex-col bg-brand-neutral-cloud font-brand-primary">
      <header className="sticky top-0 z-50 bg-brand-navy shadow-brand-md">
        {/*
          Three columns: logo | nav | spacer. The outer columns are equal (1fr), so the
          nav sits at the true center of the bar whether or not the logo is shown.
          On phones the logo and nav stack, both centered.
        */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center justify-items-center gap-2 px-4 py-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-6 sm:px-6">
          <div className="sm:justify-self-start">
            {/* Logo hidden on home — shown in the hero instead */}
            {!isHome && (
              <a
                href="/"
                className="flex flex-shrink-0 items-center"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/');
                }}
              >
                <img
                  src="/logo_nav.webp"
                  alt="ATMO Coalition"
                  width={44}
                  height={44}
                  className="h-11 w-11"
                />
              </a>
            )}
          </div>

          <SiteNav currentPath={currentPath} />

          <div className="hidden sm:block sm:justify-self-end">
            {/* Language toggle paused (no Hawaiian copy yet). See the note at the top of this file.
            <LanguageToggle />
            */}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div key={currentPath} className="anim-page-enter">
          <ActivePage />
        </div>
      </main>

      <footer className="bg-brand-navy py-8 text-brand-neutral-cloud">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-brand-sm">© {year} ATMO Coalition · University of Hawai'i at Mānoa</p>
          <p className="mt-1 text-brand-sm text-brand-neutral-slate">{t('app.tagline')}</p>
        </div>
      </footer>
    </div>
  );
}
