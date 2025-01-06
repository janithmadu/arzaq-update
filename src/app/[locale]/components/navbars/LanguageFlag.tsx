"use client";

import Image from "next/image";
import { type Locale, getFlagForLocale } from "./lib/language";

interface LanguageFlagProps {
  currentLocale: Locale;
  nextLocale: Locale;
}

export function LanguageFlag({ currentLocale, nextLocale }: LanguageFlagProps) {
  return (
    <Image 
      width={25} 
      height={25}
      src={getFlagForLocale(currentLocale)} 
      alt={`Switch to ${nextLocale === 'en' ? 'English' : 'Arabic'}`}
      priority
    />
  );
}