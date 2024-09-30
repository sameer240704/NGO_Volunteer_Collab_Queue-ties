import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json'; 
import hi from '../locales/hi.json'; 
import mr from '../locales/mr.json'; 

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: 'en', 
    fallbackLng: 'hi', 
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      mr: { translation: mr },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
