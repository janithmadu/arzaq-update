"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import UKflag from "../../../../../public/uk.png";
import Arab from "../../../../../public/arab.png";
import Image from "next/image";
import Link from "next/link";
import Loading from "../../loading";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("TopNav");

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
  const handleLanguageSwitch = async (newLocale: "en" | "ar") => {
    // Start progress bar
    NProgress.start();

    // Simulate slow progress
    let progress = 0.1;
    const interval = setInterval(() => {
      progress += 0.1;
      if (progress < 1) {
        NProgress.set(progress);
      } else {
        clearInterval(interval);
      }
    }, 110); // Adjust interval time for slower progress

    // Simulate language switch
    setLoading(true);

    if (typeof window !== "undefined") {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/;`;
    }

    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "ar") {
      segments[1] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPath = segments.join("/");

    await router.push(`${newPath}?${searchParams.toString()}`);

    // Slow down completion
    setTimeout(() => {
      setLoading(false);
      NProgress.done(); // Complete the progress bar
    }, 1000); // Delay completion by 1 second
  };

  useEffect(() => {
    // Initialize locale and flag after component mounts or pathname changes
    const segments = pathname.split("/");
    const currentLocale = (getCookie("NEXT_LOCALE") as "en" | "ar") || "en";
    setLocale(currentLocale);
    setFlgImage(segments[1] === "en" ? Arab : UKflag);
    const getColor = async()=>{
      const getColorRes = await fetch("/api/getcolor")
      const getColorData = await getColorRes.json()
      document.documentElement.style.setProperty('--primaryColor',getColorData[0].primaryColor);
      document.documentElement.style.setProperty('--TitleTextColor',getColorData[0].TitleTextColor);
      document.documentElement.style.setProperty('--BodyTextColor',getColorData[0].BodyTextColor);
      document.documentElement.style.setProperty('--FooterColor',getColorData[0].FooterColor);
      document.documentElement.style.setProperty('--WhiteColor',getColorData[0].WhiteColor);
      document.documentElement.style.setProperty('--WarningRed',getColorData[0].WarningRed);
      document.documentElement.style.setProperty('--InfoGreen',getColorData[0].InfoGreen);
      document.documentElement.style.setProperty('--WhatsAppButtion',getColorData[0].WhatsAppButtion);
      
    }
    getColor()
    
  }, [pathname]); // Added `pathname` as a dependency

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={() =>
            handleLanguageSwitch(languages[locale].nextLocale as "en" | "ar")
          }
          className="flex items-center gap-2 rtl:gap-2"
        >
          {
            flgimage ? <Image width={25} src={flgimage || null} alt={languages[locale].nextLocale} />  : <></>
          }
        </button>
       
      </div>
      {loading && <Loading />}
    </>
  );
}

export default CountryChange;
