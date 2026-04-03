import { useTranslation } from 'react-i18next';
import LanguageToggle from './components/LanguageToggle';
import SiteNav from './components/SiteNav';
import { useCurrentPath } from './hooks/useCurrentPath';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ResourcesPage from './pages/ResourcesPage';
import { getRoute } from './utils/routes';

const pageByRouteKey = {
  about: AboutPage,
  contact: ContactPage,
  events: EventsPage,
  home: HomePage,
  resources: ResourcesPage,
} as const;

export default function App() {
  const currentPath = useCurrentPath();
  const route = getRoute(currentPath);
  const ActivePage = route ? pageByRouteKey[route.key] : NotFoundPage;
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-neutral-cloud via-brand-white to-brand-atmospheric-aqua/30">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-brand-lg py-brand-lg">
        <header className="rounded-brand-lg bg-brand-navy px-brand-xl py-brand-lg text-brand-white shadow-brand-lg">
          <div className="flex flex-col gap-brand-lg lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-brand-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-atmospheric-aqua">
                Student organization site
              </p>
              <div className="space-y-brand-xs">
                <h1 className="text-3xl font-brand-bold">{t('app.name')}</h1>
                <p className="max-w-xl text-brand-md text-brand-neutral-cloud">{t('app.tagline')}</p>
              </div>
            </div>
            <LanguageToggle />
          </div>
          <div className="mt-brand-lg border-t border-brand-atmospheric-blue/60 pt-brand-md">
            <SiteNav currentPath={currentPath} />
          </div>
        </header>

        <div className="flex-1 py-brand-xl">
          <ActivePage />
        </div>
      </div>
    </main>
  );
}
