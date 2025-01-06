"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import MyAds from "./MyAds";
import Image from "next/image";
import { ProfileAdCard } from "./ProfileAdCard";
import { useTranslations } from "next-intl";
interface ClientUserAds {
  ResultCount?: number;
  UserAds?: any;
  verifiedSeller?: boolean;
  member?: boolean;
  name?: string;
  email?: string;
  avatarUrl?: string;
  createdAt?: any;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const ClientProfile: React.FC<ClientUserAds> = ({
  UserAds,
  verifiedSeller,
  member,
  name,
  email,
  avatarUrl,
  createdAt,
}) => {
  const [locale, setLocale] = useState("en");
  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);
  const t = useTranslations("TopNav");

  const [seller] = useState({
    name: name,
    email: email,
    avatarUrl: avatarUrl,
    storeName: "Doe’s Electronics",
    storeDescription: "The best electronics store in town.",
  });

  const formattedDate = new Date(createdAt).toLocaleDateString();


  return (
    <div className=" container mx-auto flex flex-col px-3  lg:px-5 xl:px-20 md:px-3 gap-y-4  mt-3">
      <div className=" bg-white p-6 rounded-lg shadow-md flex flex-row justify-between items-center gap-y-3 ">
        <div className="flex items-center space-x-6">
          {/* Seller Avatar */}
          <Image
            width={300}
            height={300}
            className="w-14 h-14 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-200"
            src={seller.avatarUrl || "/placeholder.jpg"} // Fallback to a placeholder
            alt={seller.name as string}
          />

          {/* Seller Details */}
          <div className="flex flex-col gap-y-1">
            <h1 className="text-3xl font-bold text-gray-800">{seller.name}</h1>
            <p className="text-gray-500 text-[8px] md:text-bodysmall">
              {seller.email}
            </p>
            <p className="text-gray-700 md:text-bodysmall text-[8px]">
            {t("MemberSince")} {formattedDate}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-y-1 sm:gap-y-0  sm:gap-x-3">
          <div className="px-[12px] min-w-[76px] min-h-[24px] rounded-[100px] bg-danger100 flex justify-center items-center text-danger800 text-[8px] md:text-[13px]">
            <span>{member ? <>{t("Member")}</> : <>{t("NotAMember")}</>}</span>
          </div>
          <div className=" px-[12px] min-w-[76px] min-h-[24px] rounded-[100px] bg-success50 flex justify-center items-center text-success800 text-[8px] md:text-[13px]">
            {verifiedSeller ? <>{t("VerifiedSeller")}</> : <>{t("NotVerifiedSeller")}</>}
          </div>
        </div>
      </div>

      {/* Products list */}
      <div className=" min-w-full">
        <h2 className="text-2xl font-semibold text-gray-800">Ads</h2>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-x-3">
          {UserAds.ads.map((ad: any) => {
            return (
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
                updateMount={false}
                delteActive={false}
                state={ad.state}
                subcategory={
                  locale == "en"
                    ? ad.subcategory.title_en
                    : ad.subcategory.title_ar
                }
              />
            );
          })}
        </div>
        {/* <MyAds
          delteActive={false}
          updateMount={false}
          UserAds={UserAds}
          resultCount={UserAds?.resultCount}
          colcount={3}
        /> */}
      </div>
    </div>
  );
};

export default ClientProfile;
