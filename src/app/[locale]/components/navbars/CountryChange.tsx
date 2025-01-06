"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import UKflag from "../../../../../public/uk.png";
import Arab from "../../../../../public/arab.png";
import Image from "next/image";
import Link from "next/link";
import Loading from "../../loading";

function getCookie(name: string) {
  if (typeof window !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }
  return undefined;
}

function CountryChange() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [locale, setLocale] = useState<"en" | "ar">(() => {
    // Initially check the cookie on the client-side
    return (getCookie("NEXT_LOCALE") as "en" | "ar") || "en";
  });
  
  const [flgimage, setFlgImage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const languages = {
    en: { label: "English", flag: UKflag, nextLocale: "ar" },
    ar: { label: "عربي", flag: Arab, nextLocale: "en" },
  };

  // Update the language and URL when switching
  const handleLanguageSwitch = (newLocale: "en" | "ar") => {
    // Update state immediately for instant UI feedback
    setLocale(newLocale);
    setFlgImage(newLocale === "en" ? UKflag : Arab);
    setLoading(true);

    // Update the cookie asynchronously
    if (typeof window !== "undefined") {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/;`;
    }

    const segments = pathname.split("/");

    // Update the locale in the URL path
    if (segments[1] === "en" || segments[1] === "ar") {
      segments[1] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPath = segments.join("/");

    // Navigate to the new URL
    router.push(`${newPath}?${searchParams.toString()}`);

    // Set loading state to false after the navigation
    setLoading(false);
  };

  useEffect(() => {
    // Initialize locale after component mounts
    const currentLocale = getCookie("NEXT_LOCALE") as "en" | "ar" || "en";
    setLocale(currentLocale);
    setFlgImage(currentLocale === "en" ? UKflag : Arab);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between min-w-full md:min-w-0 md:space-x-5 md:justify-end rtl:gap-10 border-l pl-2">
        <button
          onClick={() => handleLanguageSwitch(languages[locale].nextLocale as "en" | "ar")}
          className="flex items-center gap-2 rtl:gap-2"
        >
          <Image width={25} src={languages[locale].flag} alt={languages[locale].nextLocale} />
        </button>
        <Link href={`/${locale}/commercial?slug=all`}>Commercial</Link>
      </div>
      {loading && <Loading />}
    </>
  );
}

export default CountryChange;
