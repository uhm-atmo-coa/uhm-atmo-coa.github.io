import { useTranslation } from 'react-i18next';
import logoOnly from './assets/logo_only.png';
import LanguageToggle from './components/LanguageToggle';
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

export default function App() {
  const currentPath = useCurrentPath();
  const route = getRoute(currentPath);
  const ActivePage = route ? pageByRouteKey[route.key as keyof typeof pageByRouteKey] : NotFoundPage;
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const isHome = currentPath === '/';

  return (
    <div className="flex min-h-screen flex-col bg-brand-neutral-cloud font-brand-primary">
      <header className="sticky top-0 z-50 bg-brand-navy shadow-brand-md">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
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
              <img src={logoOnly} alt="ATMO Coalition" className="h-11 w-11" />
            </a>
          )}

          <div className="flex flex-1 justify-center">
            <SiteNav currentPath={currentPath} />
          </div>

          <div className="flex-shrink-0">
            <LanguageToggle />
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
