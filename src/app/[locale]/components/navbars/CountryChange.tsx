"use client";

import React, { useEffect, useState } from "react";
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

  const languages = [
    { code: "en", label: "English", image: UKflag },
    { code: "ar", label: "عربي", image: Arab },
  ];

  const [locale, setLocale] = useState<"en" | "ar">("en");

  // Fetch the current locale from cookies on mount
  useEffect(() => {
    const cookieLocale = (getCookie("NEXT_LOCALE") as "en" | "ar") || "en";
    setLocale(cookieLocale);
  }, []);

  // Update URL and locale when switching the language
  const handleLanguageSwitch = (newLocale: "en" | "ar") => {
    const params = new URLSearchParams(searchParams.toString());
    const segments = pathname.split("/");

    if (segments[1] === "en" || segments[1] === "ar") {
      segments[1] = newLocale; // Replace the first segment with the new locale
    } else {
      segments.unshift(newLocale); // Add the new locale if it doesn't exist
    }

    const newPath = segments.join("/");
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/`; // Update the cookie
    router.push(`${newPath}?${params.toString()}`); // Navigate to the new URL
    setLocale(newLocale); // Update the local state
  };

  // Get the current flag image based on the locale
  const currentFlag = locale === "en" ? Arab : UKflag;
  const nextLocale = locale === "en" ? "ar" : "en";

  return (
    <div className="flex items-center justify-between min-w-full md:min-w-0 md:space-x-5 md:justify-end rtl:gap-10 border-l pl-2">
      <button
        onClick={() => handleLanguageSwitch(nextLocale)}
        className="flex items-center gap-2 rtl:gap-2"
      >
        <Image
         
          width={25}
          src={currentFlag}
          alt={nextLocale}
        />
      </button>
      <Link href={"/"+locale+"/commercial?slug=all"}>Commercial</Link>
    </div>
  );
}

export default CountryChange;
