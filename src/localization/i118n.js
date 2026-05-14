import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './en.json';
import ru from './ru.json';

const locales = RNLocalize.getLocales();
const systemLanguage = locales[0]?.languageCode === 'ru' ? 'ru' : 'en';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: systemLanguage,
  fallbackLng: 'en',
});

export default i18n;
