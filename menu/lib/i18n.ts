import ar from '@/locales/ar.json';
import en from '@/locales/en.json';

export type Language = 'ar' | 'en';

const translations = {
  ar,
  en,
};

export const getTranslation = (lang: Language) => {
  return translations[lang] || translations.ar;
};

export const isRTL = (lang: Language) => lang === 'ar';
