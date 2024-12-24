"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

type SubCategory = {
  category_id: number;
  created_at: string;
  description_ar: string | null;
  description_en: string | null;
  id: number;
  image: string;
  slug: string;
  title_ar: string;
  title_en: string;
  updated_at: string;
};

export default function CategoryCarousel() {
  const router = useRouter();
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [subCategory, setSubCategory] = useState<SubCategory[]>([]);
  

  useEffect(() => {
    const cookieLocale = (getCookie("NEXT_LOCALE") as "en" | "ar") || "en";
    setLocale(cookieLocale);
  }, []);

  const handleSubcategoryClick = (slug: string) => {
    router.push(`/${locale}/commercial?slug=${encodeURIComponent(slug)}`);
  };

  useEffect(() => {
    const getSubcategory = async () => {
      const subcategory = await fetch("/api/subcategory/getallsubcategory");

      const subcategoryData = await subcategory.json();

      setSubCategory(subcategoryData.res);
    };

    getSubcategory();
  }, []);

  return (
    <div className="relative w-full mt-3">
      {/* Left Navigation Button */}
      <button
        className="absolute left-2 z-10 p-2 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 focus:outline-none -translate-y-1/2 top-1/2"
        id="prevButton"
      >
        <ArrowLeft size={20} className="text-gray-700" />
      </button>

      {/* Right Navigation Button */}
      <button
        className="absolute right-2 z-10 p-2 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 focus:outline-none -translate-y-1/2 top-1/2"
        id="nextButton"
      >
        <ArrowRight size={20} className="text-gray-700" />
      </button>

      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        navigation={{
          prevEl: "#prevButton",
          nextEl: "#nextButton",
        }}
        modules={[Navigation]}
        className="mySwiper"
        style={{ padding: "0 50px" }}
      >
        <SwiperSlide className="!w-auto px-2">
          <button
            onClick={() => handleSubcategoryClick("all")}
            className="border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-200 focus:bg-blue-100 focus:outline-none"
          >
            All
          </button>
        </SwiperSlide>
        {subCategory.map((subcategory, index) => (
          <SwiperSlide key={index} className="!w-auto px-2">
            <button
              onClick={() => handleSubcategoryClick(subcategory.slug)}
              className="border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-200 focus:bg-blue-100 focus:outline-none"
            >
              {locale === "en" ? subcategory.title_en : subcategory.title_ar}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}