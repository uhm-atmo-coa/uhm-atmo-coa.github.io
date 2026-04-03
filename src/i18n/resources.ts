import commonEn from '../locales/en/common.json';
import commonHaw from '../locales/haw/common.json';

export const defaultNamespace = 'common';

export const resources = {
  en: {
    common: commonEn,
  },
  haw: {
    common: commonHaw,
  },
} as const;

export type SupportedLanguage = keyof typeof resources;

export const supportedLanguages = Object.keys(resources) as SupportedLanguage[];

export const fallbackLanguage: SupportedLanguage = 'en';
