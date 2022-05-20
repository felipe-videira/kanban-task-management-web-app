import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import enUS from "./translations/en-US.json";

const resources = {
  "en-US": {
    translation: enUS,
  },
  en: {
    translation: enUS,
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["navigator"],
    },
  });
