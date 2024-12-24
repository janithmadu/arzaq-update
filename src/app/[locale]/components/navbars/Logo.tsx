"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
interface LogoData {
    id: number;
    logo: string;
    name: string;
  }
const Logo = () => {
    const [logoData, setlogoData] = useState<LogoData | null>(null);

    useEffect(() => {
        const getLogoData = async () => {
          const logodata = await fetch("/api/logo");
          const logo = await logodata.json();
    
          setlogoData(logo.logodata);
        };
        getLogoData();
      }, []);

    return (
        <div>
             <Image
              src={logoData?.logo || "/logo.png"}
              width={130}
              height={0}
              className=""
              alt="Logo"
            />
        </div>
    );
}

export default Logo;
