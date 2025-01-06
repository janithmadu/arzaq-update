"use client";

import React, { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import UKflag from "../../../../../public/uk.png";
import Arab from "../../../../../public/arab.png";
import Image from "next/image";
import Link from "next/link";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function CountryChange() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [locale, setLocale] = useState<"en" | "ar">(() => {
    // Fetch the locale from the cookie or default to 'en'
    return (getCookie("NEXT_LOCALE") as "en" | "ar") || "en";
  });

  const languages = {
    en: { label: "English", flag: UKflag, nextLocale: "ar" },
    ar: { label: "عربي", flag: Arab, nextLocale: "en" },
  };

  // Update the language and URL when switching
  const handleLanguageSwitch = (newLocale: "en" | "ar") => {
    const segments = pathname.split("/");

    // Update the locale in the URL path
    if (segments[1] === "en" || segments[1] === "ar") {
      segments[1] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPath = segments.join("/");
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/;`; // Update the cookie

    // Update state immediately for instant UI feedback
    setLocale(newLocale);

    // Navigate to the new URL
    router.push(`${newPath}?${searchParams.toString()}`);
  };

  return (
    <div className="flex items-center justify-between min-w-full md:min-w-0 md:space-x-5 md:justify-end rtl:gap-10 border-l pl-2">
      <button
        onClick={() => handleLanguageSwitch(languages[locale].nextLocale as "en" | "ar")}
        className="flex items-center gap-2 rtl:gap-2"
      >
        <Image width={25} src={languages[locale].flag} alt={languages[locale].nextLocale} />
      </button>
      <Link href={`/${locale}/commercial?slug=all`}>Commercial</Link>
    </div>
  );
}

export default CountryChange;
