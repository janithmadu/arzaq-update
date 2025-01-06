import UKflag from "../../../../../../public/uk.png";
import Arab from "../../../../../../public/arab.png";

export type Locale = "en" | "ar";

export const languages = {
  en: { label: "English", flag: UKflag, nextLocale: "ar" },
  ar: { label: "عربي", flag: Arab, nextLocale: "en" },
} as const;

export function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem('NEXT_LOCALE') as Locale) || 'en';
}

export function getFlagForLocale(locale: Locale) {
  return locale === "en" ? Arab : UKflag;
}

export function updateLanguage(locale: Locale) {
  localStorage.setItem('NEXT_LOCALE', locale);
}