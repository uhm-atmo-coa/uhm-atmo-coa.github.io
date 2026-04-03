import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  defaultNamespace,
  fallbackLanguage,
  resources,
  supportedLanguages,
  type SupportedLanguage,
} from './resources';

function detectLanguage(): SupportedLanguage {
  if (typeof navigator === 'undefined') {
    return fallbackLanguage;
  }

  const candidates = [navigator.language, ...navigator.languages]
    .filter(Boolean)
    .map((value) => value.toLowerCase().split('-')[0]);

  for (const candidate of candidates) {
    if (supportedLanguages.includes(candidate as SupportedLanguage)) {
      return candidate as SupportedLanguage;
    }
  }

  return fallbackLanguage;
}

void i18n.use(initReactI18next).init({
  resources,
  lng: detectLanguage(),
  fallbackLng: fallbackLanguage,
  defaultNS: defaultNamespace,
  interpolation: {
    escapeValue: false,
  },
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.resolvedLanguage || fallbackLanguage;
  i18n.on('languageChanged', (language) => {
    document.documentElement.lang = language;
  });
}

export default i18n;
