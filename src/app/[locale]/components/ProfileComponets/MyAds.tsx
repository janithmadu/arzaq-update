import { PostAd } from "@/lib/categoryInterface";
import React, { useEffect, useState } from "react";
import { ProfileAdCard } from "./ProfileAdCard";
import Image from "next/image";
import NoItem from "../../../../../public/rb_127823.png";
import PaginationComponent from "../AdsPriview/PaginationComponet/PaginationComponet";
import { useTranslations } from "next-intl";

interface MainProfileProps {
  UserAds: any; // Expecting an array of PostAd objects
  resultCount?: number;
  delteActive?: boolean;
  updateMount?: boolean;
  title?: boolean;
  timedate?: boolean;
  colcount: number;
}
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const MyAds: React.FC<MainProfileProps> = ({
  UserAds,
  resultCount,
  delteActive,
  updateMount,
  title,
  timedate,
  colcount,
}) => {
  const [locale, setLocale] = useState("en");
  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);
  const t = useTranslations("TopNav");

  const PageSize = 10;
  return (
    <>
      {title && (
        <h2 className="text-grayscale900 font-bold text-bodyxl mb-3">
          {t("MyAds")}
        </h2>
      )}
      <div
        className={` ${UserAds?.ads?.length > 0 ? `min-w-full  grid grid-cols-1 xl:grid-cols-2 gap-1` : "grid grid-cols-1"}`}
      >
        {UserAds?.ads?.length > 0 ? (
          UserAds?.ads?.map((ad: PostAd, index: number) => {
            return (
              <div key={index} className="flex min-w-full">
                <ProfileAdCard
                  id={ad.id}
                  title={ad.adName}
                  price={ad.price}
                  image={ad.postad_photos[0]?.photoUrl}
                  category={
                    locale == "en" ? ad.category.title_en : ad.category.title_ar
                  }
                  timestamp={ad.createdAt}
                  timedate={true}
                  updateMount={true}
                  delteActive={true}
                  state={ad.state}
                  subcategory={
                    locale == "en"
                      ? ad.subcategory.title_en
                      : ad.subcategory.title_ar
                  }
                />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-center text-gray-500 space-y-4 relative">
            <Image
              src={NoItem}
              alt="No Ads Available"
              width={160}
              height={160}
            />
            <h2 className="text-2xl font-semibold text-gray-700">
            {t("NoAdsStill")}
            </h2>
          </div>
        )}
      </div>
      {UserAds?.ads?.length > 0 && (
        <div className="min-w-full flex justify-center mt-6">
          <PaginationComponent TotoleCount={resultCount} PageSisze={PageSize} />
        </div>
      )}
    </>
  );
};

export default MyAds;
