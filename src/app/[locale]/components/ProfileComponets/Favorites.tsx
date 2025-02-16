"use client";
import { PostAd } from "@/lib/categoryInterface";
import React, { useEffect, useState } from "react";
import { ProfileAdCard } from "./ProfileAdCard";
import Image from "next/image";
import NoItem from "../../../../../public/rb_127823.png";
import { useTranslations } from "next-intl";

interface MainProfileProps {
  UserAds: any; // Expecting an array of PostAd objects
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const Favorites: React.FC<MainProfileProps> = ({ UserAds }) => {
  const t = useTranslations("TopNav");
  const [locale, setLocale] = useState("en");
  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  return (
    <>
      <h1 className="text-grayscale900 font-bold text-bodyxl mb-3">
        {t("Favorites")}
      </h1>
      <div
        className={` ${UserAds?.length > 0 ? "min-w-full grid  grid-cols-1 xl:grid-cols-2 gap-3 " : "grid grid-cols-1"}`}
      >
        {UserAds?.length > 0 ? (
          UserAds.map((ad: any, index: number) => {
   

            return (
              <div key={index} className="">
                <ProfileAdCard
                  title={ad?.postad.adName}
                  curruncy={locale === "en" ? ad.currency : ad.currency_Ar}
                  category={
                    locale == "en"
                      ? ad.postad.category.title_en
                      : ad.postad.category.title_ar
                  }
                  price={ad?.postad.price}
                  image={ad?.postad.postad_photos[0]?.photoUrl}
                  timestamp={ad.postad.createdAt}
                  paymentPending={false}
                  id={ad?.postad?.id}
                  timedate={true}
                  state={ad.postad.state}
                  subcategory={
                    locale == "en"
                      ? ad.postad.subcategory.title_en
                      : ad.postad.subcategory.title_ar
                  }
                />
              </div>
            );
          })
        ) : (
          <div className="min-w-full ">
            <div className="flex flex-col items-center justify-center min-h-[400px] min-w-full text-center text-gray-500 space-y-4 relative ">
              <Image
                src={NoItem}
                alt="No Ads Available"
                width={160}
                height={160}
              />
              <h2 className="text-2xl font-semibold text-gray-700">
              {t("NoFavoriteAds")}
              </h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
