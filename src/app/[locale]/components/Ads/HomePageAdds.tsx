"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PostAd } from "@/lib/categoryInterface";
import { CarCard } from "../HomePagecard/CarCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export const revalidate = 1;

interface Ads {
  Ads: PostAd[];
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const HomePageAdds: React.FC<Ads> = ({ Ads }) => {
  const t = useTranslations("TopNav");

  const [locale, setLocale] = useState<"en" | "ar">("en");

  useEffect(() => {
    const cookieLocale = (getCookie("NEXT_LOCALE") as "en" | "ar") || "en";
    setLocale(cookieLocale);
  }, []);

  return (
    <div className="container mx-auto flex flex-col space-y-[10px] px-2  lg:px-5 xl:px-20 md:px-10 ">
      {" "}
      {/* Heading */}
      <div>
        <h1 className=" text-bodyxl  font-bold ">
          {" "}
          {t("HomePageProductSectionHeading")} {' '}
          <span className="text-[#312783]">{t("ads")}</span>
        </h1>
      </div>
      {/* Heading End*/}
      {/* Main Grid */}
      
        <Carousel dir="ltr">
          <CarouselContent className="-ml-4" dir="ltr">
            {Ads.map((item: PostAd, index: number) => (
              <CarouselItem
                className=" basis-1/1 md:basis-1/3 xl:basis-1/5"
                dir="ltr"
                key={index}
              >
                <CarCard
                  id={item.id}
                  brand={item.brand}
                  duration={item.createdAt}
                  image={item?.postad_photos[0]?.photoUrl}
                  location={item.state}
                  name={item.adName}
                  price={item.price}
                  km={item.model}
                  currancy={item.currency}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="bg-[#312783] text-white hidden md:flex   "
            dir="ltr"
          />
          <CarouselNext
            className="bg-[#312783] text-white hidden md:flex"
            dir="ltr"
          />
        </Carousel>
     
      {/* Main Grid End */}
      <div className="min-w-full flex justify-center items-center mt-4">
        <Link
          href={`${locale}/ads?page=1`}
          className=" mt-5 flex space-x-[8px] items-center min-w-[144px] min-h-[50px] bg-[#312783] justify-center text-heading04 text-grayscalewhite rounded-[4px] rtl:flex-row-reverse transition duration-300 ease-in-out hover:bg-primary700 hover:shadow-lg"
        >
          <h1>{t("ViewAllButtion")}</h1>
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default HomePageAdds;
