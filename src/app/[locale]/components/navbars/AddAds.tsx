"use client"
import {
    PlusCircle,
    Usb,
    UserCheck,
    UserCircle,
  } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import React, { useEffect, useState } from 'react'



function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }

function AddAds() {
      const [locale, setLocale] = useState<string>("en");

       useEffect(() => {
              const cookieLocale = getCookie("NEXT_LOCALE") || "en";
              setLocale(cookieLocale);
            }, []);

             const t = useTranslations("TopNav");
            
  return (
      <Link
           
    className=" mainColor hidden p-[6px] lg:min-w-[139px] min-h-[5px] md:flex items-center justify-center  text-grayscalewhite font-bold rounded-full lg:rounded-[4px] transition duration-300 ease-in-out hover:bg-primary700 hover:shadow-lg"
    href={`/${locale}/addform/step01`}
  >
    <div className=" flex space-x-[8px] rtl:gap-[8px]">
      <PlusCircle className="lg:min-w-[24px] min-w-[24px] min-h-[24px] lg:min-h-[24px]" />
      <h1 className="lg:inline-block hidden">{t("PostAds")}</h1>
    </div>
  </Link>
  )
}

export default AddAds