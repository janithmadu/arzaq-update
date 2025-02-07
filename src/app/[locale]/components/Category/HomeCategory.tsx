"use client";
import { Category } from "@/lib/categoryInterface";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const revalidate = 1;

interface getCategory {
  getCategory: any;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const HomeCategory: React.FC<getCategory> = ({ getCategory }) => {
  const [locale, setLocale] = useState<string>("en");
  // const cookieStore = cookies();
  // const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const t = useTranslations("TopNav");

    useEffect(() => {
      const cookieLocale = getCookie("NEXT_LOCALE") || "en";
      setLocale(cookieLocale);
    }, []);

  return (
    <div className="container mx-auto flex flex-col space-y-[10px] px-2  lg:px-5 xl:px-20 md:px-10 ">
      {/* Heading */}
      <div>
        <h1 className="text-bodyxl font-bold  TitleTextColor">
          {" "}
          {t("HomePageCategortSectionHeading")}{" "}
          <span className="mainColorText">{t("Categories")}</span>
        </h1>
      </div>
      {/* Heading End*/}

      {/* Main Grid */}

      <div className="grid grid-cols-4  lg:grid-cols-5 xl:grid-cols-6  gap-5 ">
        {getCategory?.map((data: Category, index: number) => {
          return (
            <Link
              key={index}
              href={`${locale}/ads?page=1&category=${data?.slug}`}
               className="flex flex-col gap-y-5"
            >
              <div className=" min-w-[90px] max-h-[70px] md:min-w-[120px] md:min-h-[115px] bg-[#f7f8fa] rounded-lg flex justify-center items-center flex-col space-y-3 ">
                <Image
                  width={270}
                  height={150}
                  alt={data.title_en}
                  src={data.image_url || "/defultimage.png"}
                  className=" w-[270px] h-[150px]"
                />
              </div>

              <h1 className=" text-md md:text-xl font-bold TitleTextColor  text-center">
                {locale == "en" ? data.title_en : data.title_ar}
              </h1>
            </Link>
          );
        })}
      </div>
      {/* Main Grid End */}
    </div>
  );
};

export default HomeCategory;
