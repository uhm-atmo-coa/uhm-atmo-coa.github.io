import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '../i18n/resources';

const languageLabels: Record<SupportedLanguage, string> = {
  en: 'EN',
  haw: 'HAW',
};

export default function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const activeLanguage = supportedLanguages.includes(i18n.resolvedLanguage as SupportedLanguage)
    ? (i18n.resolvedLanguage as SupportedLanguage)
    : 'en';

  return (
    <div className="flex items-center gap-brand-sm">
      <span className="text-brand-sm font-brand-medium text-brand-neutral-cloud">{t('common.language')}</span>
      <div className="flex rounded-brand-full border border-brand-atmospheric-blue/60 bg-brand-midnight/30 p-1">
        {supportedLanguages.map((language) => {
          const isActive = language === activeLanguage;

          return (
            <button
              aria-pressed={isActive}
              key={language}
              type="button"
              className={[
                'rounded-brand-full px-brand-md py-1 text-brand-sm font-brand-medium transition-colors',
                isActive
                  ? 'bg-brand-solar-gold text-brand-navy'
                  : 'text-brand-white hover:bg-brand-white/10',
              ].join(' ')}
              onClick={() => {
                void i18n.changeLanguage(language);
              }}
            >
              {languageLabels[language]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
