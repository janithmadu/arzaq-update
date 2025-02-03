"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppStoreButtons } from "./app-store-buttons";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";

interface Category {
  id: number;
  title_en: string;
  title_ar: string;
  slug: string;
  image_url: string | null;
  description_en: string | null;
  description_ar: string | null;
  price: number | Decimal;
  ad_count: number;
  created_at: Date;
  updated_at: Date;
}

interface SocialMedia {
  footerId: number;
  icon: string;
  id: number;
  platform: string;
  url: string;
}

interface FooterData {
  address: string;
  phoneNumber: string;
  email: string;
  SocialMedia: SocialMedia[];
}

interface LogoData {
  id: number;
  logo: string;
  name: string;
}
interface FooterSupport {
  id: number;
  dname: string;
  link: string;
  dnamear: string;
}

interface QuickLinks {
  id: number;
  dname: string;
  link: string;
  dnamear: string;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function Fotter() {
  const [locale, setLocale] = useState<string>("en");
  const [categories, setCategories] = useState<Category[]>([]);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [logoData, setlogoData] = useState<LogoData | null>(null);
  const [support, setsupport] = useState<FooterSupport[] | null>([]);
  const [quicklinks, setquicklinks] = useState<QuickLinks[] | null>(null);

  const t = useTranslations("TopNav");


  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  useEffect(() => {
    const getFooterData = async () => {
      const footerdata = await fetch("/api/footer");
      const footer = await footerdata.json();

      setFooterData(footer.footerdata);
    };
    getFooterData();
  }, []);

  useEffect(() => {
    const getFooterData = async () => {
      const categoryData = await fetch("/api/categories/getlimitcate");
      const categories = await categoryData.json();

      setCategories(categories);
    };
    getFooterData();
  }, []);

  useEffect(() => {
    const getLogoData = async () => {
      const logodata = await fetch("/api/logo");
      const logo = await logodata.json();

      setlogoData(logo.logodata);
    };
    getLogoData();
  }, []);

  useEffect(() => {
    const getSupportData = async () => {
      const supportdata = await fetch("/api/footer/support");
      try {
        if (!supportdata.ok) {
          console.error("Support Data Getting Error");
        }
        const support = await supportdata.json();
        setsupport(support);
      } catch (error) {
        console.error(error);
      }
    };

    getSupportData();
  }, []);

  useEffect(() => {
    const getQuickLinks = async () => {
      const quicklinks = await fetch("/api/footer/quicklink");

      try {
        if (!quicklinks.ok) {
          console.error("Quick Links Getting Error");
        }
        const quicklinksData = await quicklinks.json();
       
        
        setquicklinks(quicklinksData);
      } catch (error) {
        console.error(error);
      }
    };
    getQuickLinks()
  },[]);


  

  return (
    <div className="min-w-full min-h-[486px] FooterColor">
      <div className="items-center min-h-[414px] flex flex-col justify-center ">
        <div className="min-h-[216px]  min-w-full flex items-center  ">
          <div className="container mx-auto  p-5  lg:px-20 xl:px-64 md:px-10  grid     sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-5 min-w-full xl:place-items-center  min-h-[216px]">
            <div className="min-w-[124px] md:min-w-[347px] max-h-[216px]  flex justify-start items-center ">
              <div className="flex flex-col min-h-[216px] space-y-[32px]">
                <h1 className="text-heading02 font-bold mainColorText">
                  <Image
                    src={logoData?.logo || "/logo.png"}
                    width={100}
                    height={0}
                    className=""
                    alt="Logo"
                  ></Image>
                </h1>

                <div className="min-w-[124px] md:min-w-[347px] min-h-[120px] ">
                  <div className="max-w-[312px] max-h-[47px] flex flex-col space-y-[12px] ">
                    <p className="text-bodymedium BodyTextColor text-wrap">
                      {t("Address")}: {footerData?.address || "N/A"}
                    </p>
                    <p className="text-bodymedium BodyTextColor text-wrap">
                      {t("Phone")}: {footerData?.phoneNumber || "N/A"}
                    </p>
                    <p className="text-bodymedium BodyTextColor text-wrap">
                      {t("Mail")}: {footerData?.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-[175px] min-h-[216px] flex flex-col space-y-[32px]  justify-center items-start ">
              <h1 className="WhiteColorText text-bodylarge">{t("Supports")}</h1>
              <div className="min-w-[94px] min-h-[152px] flex space-y-[8px] flex-col">
                {support?.map((data: FooterSupport, index: number) => {
                  return (
                    <>
                      <Link
                        href={`/${locale}/${data.link}`}
                        className="BodyTextColor text-bodymedium"
                      >
                        {locale == "en" ? data.dname : data.dnamear}
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="min-w-[175px] min-h-[216px] flex flex-col space-y-[32px]  justify-center items-start ">
              <h1 className="WhiteColorText text-bodylarge">
                {t("QuickLinks")}
              </h1>
              <div className="min-w-[94px] min-h-[152px] flex space-y-[8px] flex-col">
              {quicklinks?.map((data: QuickLinks, index: number) => {
                  return (
                    <>
                      <Link
                        href={`/${locale}/${data.link}`}
                        className="BodyTextColor text-bodymedium"
                      >
                        {locale == "en" ? data.dname : data.dnamear}
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="min-w-[175px] min-h-[216px] flex flex-col space-y-[32px]  justify-center items-start ">
              <h1 className="WhiteColorText text-bodylarge">
                {t("Categoryfotter")}
              </h1>
              <div className="min-w-[94px] min-h-[152px] flex space-y-[8px] flex-col ">
                {categories.length === 0 ? (
                  <div className="text-grayscale600  text-heading04 hover:text-grayscale800 hover:font-bold">
                    {" "}
                    You have no category
                  </div>
                ) : (
                  categories?.map((item: any, index: number) => {
                    return (
                      <Link
                        key={index}
                        href={`${locale ? `/${locale}` : ""}/ads?page=1&category=${item?.slug?.current}`}
                        className="BodyTextColor text-bodymedium"
                      >
                        {locale == "en" ? item.title_en : item.title_ar}
                      </Link>
                    );
                  })
                )}
              </div>
            </div>

            <div className="min-w-[175px] min-h-[216px] flex flex-col space-y-[32px]  justify-center items-start ">
              <h1 className="WhiteColorText text-bodylarge">
                {t("DownloadOurApp")}
              </h1>
              <div className="min-w-[94px] min-h-[152px] flex space-y-[32px] flex-col ">
                <div className="flex space-x-[16px]">
                  <AppStoreButtons />
                </div>

                <div className="flex flex-col items-center ">
                 
                  {footerData?.SocialMedia.map((data, index: number) => {
                    return (
                      <Link key={index} href={data.url}>
                        <Image
                          alt={data.platform}
                          width={30}
                          height={30}
                          src={data.icon}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto  px-5  lg:px-20 xl:px-56 md:px-10   min-w-full  min-h-[72px] bg-grayscale800 flex items-center justify-between md:flex-row flex-col text-center md:text-start ">
        <h1 className="text-bodymedium text-gray-500">
          {t("ArzaqClassifiedListing")} © 2024
        </h1>
        <div className="flex BodyTextColor space-x-[29px]">
          <Link href={`/${locale}/privacy`}>{t("PrivacyPolicy")}</Link>
          <Link href={`/${locale}/terms`}>{t("TermsAndCondition")}</Link>
        </div>
      </div>
    </div>
  );
}

export default Fotter;
