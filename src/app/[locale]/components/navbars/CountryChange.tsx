"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import UKflag from "../../../../../public/uk.png";
import Arab from "../../../../../public/arab.png";
import Image from "next/image";
import Link from "next/link";

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function CountryChange() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [locale, setLocale] = useState<"en" | "ar">(() => {
    return (getCookie("NEXT_LOCALE") as "en" | "ar") || "en";
  });

  // Set the initial flag image based on the current locale
  const [currentFlag, setCurrentFlag] = useState(() => 
    locale === "en" ? Arab : UKflag
  );

  const languages = {
    en: { label: "English", flag: UKflag, nextLocale: "ar" },
    ar: { label: "عربي", flag: Arab, nextLocale: "en" },
  };

  const handleLanguageSwitch = (newLocale: "en" | "ar") => {
    // Update flag immediately for better UX
    setCurrentFlag(newLocale === "en" ? Arab : UKflag);
    
    // Update locale state
    setLocale(newLocale);

    // Update URL
    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "ar") {
      segments[1] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    const newPath = segments.join("/");

    // Update cookie and navigate
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/;`;
    router.push(`${newPath}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
  };

  // Ensure flag is correct on initial load
  useEffect(() => {
    setCurrentFlag(locale === "en" ? Arab : UKflag);
  }, [locale]);

  return (
    <div className="flex items-center justify-between min-w-full md:min-w-0 md:space-x-5 md:justify-end rtl:gap-10 border-l pl-2">
      <button
        onClick={() => handleLanguageSwitch(languages[locale].nextLocale as "en" | "ar")}
        className="flex items-center gap-2 rtl:gap-2"
      >
        <Image 
          width={25} 
          height={25}
          src={currentFlag} 
          alt={`Switch to ${languages[locale].nextLocale === 'en' ? 'English' : 'Arabic'}`}
          priority
        />
      </button>
      <Link href={`/${locale}/commercial?slug=all`}>Commercial</Link>
    </div>
  );
}

export default CountryChange;