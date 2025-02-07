"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface LogoInter {
  logo: any;
  alt?: string;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const TopNavLogo: React.FC<LogoInter> = (LogoInter) => {
  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  return (
    <div>
      <Link href={`${locale == "en" ? "/en" : "/ar"}`}>
        <Image
          src={LogoInter.logo}
          width={130}
          height={0}
          className=""
          alt="Logo"
        />
      </Link>
    </div>
  );
};

export default TopNavLogo;
