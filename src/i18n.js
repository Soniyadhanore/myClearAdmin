/**
 * @file i18n.js
 * @description This file contains the i18n configuration
 * @exports {Object} i18n
 * @requires i18next
 * @requires react-i18next
 * @requires en
 * @exports {Object} i18n
 * @handle translation of the application
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import eng from './lang/en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: eng()
      }
    },
    lng: 'en',
    fallbackLng: "en",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
