import { PostAd } from "@/lib/categoryInterface";
import React, { useEffect, useState } from "react";
import { ProfileAdCard } from "./ProfileAdCard";
import NoItem from "../../../../../public/rb_127823.png";
import Image from "next/image";
import PaginationComponent from "../AdsPriview/PaginationComponet/PaginationComponet";
import { useTranslations } from "next-intl";
interface MainProfileProps {
  UserAds: PostAd[]; // Expecting an array of PostAd objects
  resultCount?: any;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const DraftAds: React.FC<MainProfileProps> = ({ UserAds, resultCount }) => {
  const [locale, setLocale] = useState("en");
  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);
  const t = useTranslations("TopNav");

  const PageSize = 10;
  return (
    <>
      <h1 className="text-grayscale900 font-bold text-bodyxl mb-3">
        {t("DraftAds")}
      </h1>
      <div
        className={` ${UserAds?.length > 0 ? "min-w-full  grid grid-cols-1 xl:grid-cols-2 gap-3 " : "grid grid-cols-1"}`}
      >
        {UserAds.length > 0 ? (
          UserAds.map((ad: PostAd, index: number) => {
            return (
              <div key={index}>
                <ProfileAdCard
                  id={ad.id}
                  curruncy={locale === "en" ? ad.currency : ad.currency_Ar}
                  title={ad.adName}
                  category={
                    locale == "en" ? ad.category.title_en : ad.category.title_ar
                  }
                  price={ad.price}
                  image={ad.postad_photos[0]?.photoUrl}
                  timestamp={ad.createdAt}
                  paymentPending={true}
                  adprice={ad.category.price}
                  delteActive={true}
                  subcategory={
                    locale == "en"
                      ? ad.subcategory.title_en
                      : ad.subcategory.title_ar
                  }
                  state={ad.state}
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
            {t("NoDraftAds")}
            </h2>
          </div>
        )}
      </div>
      {UserAds.length > 0 && (
        <div className="min-w-full flex justify-center mt-6">
          <PaginationComponent TotoleCount={resultCount} PageSisze={PageSize} />
        </div>
      )}
    </>
  );
};

export default DraftAds;
