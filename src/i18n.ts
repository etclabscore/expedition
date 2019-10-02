import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enJSON from "./translations/en";
import krJSON from "./translations/kr";
import cnJSON from "./translations/cn";
import moment from "moment";
import "moment/locale/ko";
import "moment/locale/zh-cn";
import "moment/locale/en-ca";
import i18next from "i18next";

interface IMap {
  [key: string]: string;
}

const momentMap: IMap = {
  "kr": "ko",
  "cn": "zh-cn",
  "en-US": "en-ca",
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enJSON },
      kr: { translation: krJSON },
      cn: { translation: cnJSON },
    },
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (!lng) {
          return;
        }
        if (format !== "date") {
          return;
        }
        const ln = momentMap[lng];
        const result = moment(value).locale(ln || "en").format("MMMM Do YYYY, h:mm:ss a");
        return result as any;
      },
    },
  });

export const reverseSupportedLanguages: IMap = {
  "EN": "en-US", //tslint:disable-line
  "中文": "cn", //tslint:disable-line
  "한국어": "kr", //tslint:disable-line
};

export const supportedLanguages: IMap = {
  "en-US": "EN",
  "cn": "中文",
  "kr": "한국어",
};

export const changeLanguage = (l: string) => {
  return i18next.changeLanguage(l);
};
