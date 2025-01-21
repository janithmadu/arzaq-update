"use client";
import {
  Handshake,
  MapPinLine,
  Package,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

type CountType = {
  CommercialAds: number;
  ads: number;
  status: number;
  verifiedUsers: number;
};
type homePageImage = {
  image:any
};

function Details(image:any) {
  const [CountData, setCountData] = useState<CountType | null>(null); // Set initial state to null
  
  
  useEffect(() => {
    const getCounts = async () => {
      const getcount = await fetch("/api/count");
      const data = await getcount.json();
      setCountData(data);
    };
    getCounts();
  }, []);

  const t = useTranslations("TopNav");
 

  
  
  return (
    <div style={{
      backgroundImage: `url(${image.image.image})`,
    }} className={`min-h-[284px] mb-10  container mx-auto   place-content-center   lg:px-36 xl:px-64 md:px-36 min-w-full   grid grid-cols-2 md:grid-cols-2  lg:grid-cols-2  xl:grid-cols-3 place-items-center md:gap-20`}>
      <div className="md:min-w-[312px] min-h-[84px] flex space-x-[24px] rtl:gap-[24px] items-center">
        <Package className="w-[32px] h-[32px] md:w-[64px] md:h-[64px] mainColorText" />
        <div>
          <h1 className="WhiteColorText text-heading03 md:text-heading02">
            {CountData?.ads !== undefined ? `${CountData.ads}+` : "Loading..."}
          </h1>
          <h1 className="text-bodymedium md:text-bodylarge WhiteColorText">
            {t("PulishedAds")}
          </h1>
        </div>
      </div>

      <div className="md:min-w-[312px] min-h-[84px] flex space-x-[24px] rtl:gap-[24px] items-center">
        <Users className="w-[32px] h-[32px] md:w-[64px] md:h-[64px] mainColorText" />
        <div>
          <h1 className="WhiteColorText text-heading03 md:text-heading02">
            {CountData?.verifiedUsers !== undefined
              ? `${CountData?.verifiedUsers}+`
              : "Loading..."}
          </h1>
          <h1 className="text-bodymedium md:text-bodylarge WhiteColorText">
            {t("VerifiedUser")}
          </h1>
        </div>
      </div>

      <div className="md:min-w-[312px] min-h-[84px] flex space-x-[24px] rtl:gap-[24px] items-center">
        <Handshake className="w-[32px] h-[32px] md:w-[64px] md:h-[64px] mainColorText" />
        <div>
          <h1 className="WhiteColorText text-heading03 md:text-heading02">
            {CountData?.CommercialAds !== undefined
              ? `${CountData.CommercialAds}+`
              : "Loading..."}
          </h1>
          <h1 className="text-bodymedium md:text-bodylarge WhiteColorText">
            {t("ProMembers")}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Details;
