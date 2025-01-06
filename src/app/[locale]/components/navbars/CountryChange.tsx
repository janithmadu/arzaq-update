"use client";

import React, { useState, useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { LanguageFlag } from "./LanguageFlag";
import { type Locale, languages, getInitialLocale, updateLanguage } from "./lib/language";

export default function CountryChange() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  const handleLanguageSwitch = useCallback(() => {
    const newLocale = languages[locale].nextLocale;
    
    // Update locale state and storage
    setLocale(newLocale);
    updateLanguage(newLocale);

    // Update URL
    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "ar") {
      segments[1] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    
    const newPath = segments.join("/");
    const search = searchParams.toString();
    const fullPath = `${newPath}${search ? `?${search}` : ''}`;
    
    // Navigate to new URL
    router.push(fullPath);
  }, [locale, pathname, router, searchParams]);

  return (
    <div className="flex items-center justify-between min-w-full md:min-w-0 md:space-x-5 md:justify-end rtl:gap-10 border-l pl-2">
      <button
        onClick={handleLanguageSwitch}
        className="flex items-center gap-2 rtl:gap-2"
      >
        <LanguageFlag 
          currentLocale={locale} 
          nextLocale={languages[locale].nextLocale} 
        />
      </button>
      <Link href={`/${locale}/commercial?slug=all`}>Commercial</Link>
    </div>
  );
}