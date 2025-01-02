"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import PaginationComponent from "../PaginationComponet/PaginationComponet";
import LoadingImage from "../../../../../../public/system-regular-715-spinner-horizontal-dashed-circle-loop-jab.gif";
import NoItem from "../../../../../../public/rb_127823.png";
import { PostAd } from "@/lib/categoryInterface";
import { ProfileAdCard } from "../../ProfileComponets/ProfileAdCard";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import { CarCard } from "../../HomePagecard/CarCard";
import { useTranslations } from "next-intl";

interface Result {
  result: any;
  resultCount: number;
}

const isResult = (data: any): data is Result => {
  return (
    data && Array.isArray(data.result) && typeof data.resultCount === "number"
  );
};
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export default function FilterBySubs() {
  const [ads, setAds] = useState<PostAd[]>([]);
  const [adsCount, setAdsCounts] = useState<number>(0);
  const [adsLoader, setAdsLoader] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [subcategory, setsubcategory] = useState<any>();
  const PageSize = 50;
  const [locale, setLocale] = useState("en");
  const router = useRouter();
  const pathname = usePathname();
  const [titleCategory, settitleCategory] = useState<string>();
  const [titleSubCategory, settitleSubCategory] = useState<string>();
  const t = useTranslations("TopNav");
  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  useEffect(() => {
    const queryObject = Object.fromEntries(searchParams.entries());
    settitleCategory(queryObject.category);
    settitleSubCategory(queryObject.subcategories);
    const fetchAds = async () => {
      setAdsLoader(true); // Start loader

      const subcategoryId = {
        subcategories: queryObject.subcategories as string,
        subOptions: queryObject.subOptions as string,
        minPrice: parseInt(queryObject.minPrice, 10) || 0,
        maxPrice: parseInt(queryObject.maxPrice, 10) || 0,
        category: queryObject.category as string,
        page: parseInt(queryObject.page, 10) || 1,
        limit: PageSize,
      };

      let subads = { result: [], resultCount: 0 }; // Default value

      if (
        queryObject.subcategories ||
        queryObject.subOptions ||
        queryObject.minPrice ||
        queryObject.maxPrice ||
        queryObject.category
      ) {
        const res = await fetch("/api/filters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subcategoryId),
        });

        const data = await res.json();

        if (isResult(data)) {
          subads = data;
        }
      } else {
        const res = await fetch("/api/ads");

        const data = await res.json();

        if (isResult(data)) {
          subads = data;
        }
      }

      setAds(subads.result);
      setAdsCounts(subads.resultCount);
      setAdsLoader(false);
    };

    fetchAds();
  }, [searchParams]);

  useEffect(() => {
    console.log(category);
    const getSubcategory = async () => {
      if (category) {
        const subcategory = await fetch(
          "/api/subcategory/getsubcategorywithcategory",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ category }),
          }
        );
        const res = await subcategory.json();
        setsubcategory(res);
      } else {
        return null;
      }
    };
    getSubcategory();
  }, [category]);

  const handleSubcategoryChange = (subcategoryId: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    // Find the selected subcategory title based on the subcategory ID
    const selectedSubcategory = subcategory[0]?.subcategory.find(
      (data: any) => data.slug === subcategoryId
    );

    if (selectedSubcategory) {
      // Update the "subcategories" parameter in the query
      currentParams.set("subcategories", selectedSubcategory.slug);

      // Navigate to the updated URL
      router.push(`${pathname}?${currentParams.toString()}`);
    }
  };

  return (
    <div>
      <h1 className="text-bodyxl font-bold">
        {category && t("AllCategoryIn")}{" "}
        <span className="text-[#312783]">
          {titleCategory ? titleCategory : ""}
        </span>
      </h1>
      {subcategory && subcategory[0] ? (
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-y-3">
          {subcategory[0].subcategory.map((data: any, index: number) => {
            // Utility function to truncate text
            const truncateText = (text: string, maxLength: number) => {
              return text.length > maxLength
                ? text.slice(0, maxLength) + "..."
                : text;
            };

            return (
              <div className="flex flex-col items-center" key={data.id}>
                <div
                  key={index}
                  className="min-w-[80px] min-h-[120px] md:max-w-[100px] md:max-h-[100px] bg-[#f7f8fa] rounded-lg flex justify-center items-center flex-col cursor-pointer mt-7"
                  onClick={() => handleSubcategoryChange(data.slug)} // Trigger the change on click
                >
                  <div className="min-w-full flex justify-center items-center">
                    <Image
                      width={100}
                      height={100}
                      alt={data.title_en}
                      src={data.image || "/photo.png"}
                      className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-150"
                    />
                  </div>
                </div>
                <div className="min-w-full text-center text-sm min-h-[40px] mt-2">
                  {truncateText(
                    locale == "en" ? data.title_en : data.title_ar,
                    15
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}

      {adsLoader ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 min-w-full">
          <div className="text-center">
            <Image alt="Loading" src={LoadingImage} width={70} height={70} />
          </div>
        </div>
      ) : ads.length > 0 ? (
        <div className="mt-7">
          <h1 className="text-bodyxl font-bold">
            {category && t("AllAds")}{" "}
            <span className="text-[#312783]">
              {titleCategory ? titleCategory : t("AllAds")}
            </span>
          </h1>
          <div className="grid sm:grid-cols-2 sm:gap-x-10  md:grid-cols-3   md:gap-x-3 gap-x-5 lg:gap-y-1 xl:gap-y-0 lg:grid-cols-4  2xl:grid-cols-5 xl:gap-x-5 place-items-center place-content-center rtl:gap-x-[10px] ">
            {ads.map((ad: PostAd, index: number) => (
              <div className="min-w-full mt-7" key={index}>
                <CarCard
                  name={ad.adName}
                  brand={ad.brand}
                  currancy={ad.currency}
                  duration={ad.createdAt}
                  location={ad.state}
                  km={ad.model}
                  image={ad.postad_photos[0]?.photoUrl}
                  price={ad.price}
                  id={ad.id}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-center text-gray-500 space-y-4 ">
          <Image src={NoItem} alt="No Ads Available" width={160} height={160} />
          <h2 className="text-2xl font-semibold text-gray-700">
            Oops! No ads match your search.
          </h2>
          <p className="text-gray-500">
            Try adjusting your filters or check back later.
          </p>
        </div>
      )}
      {ads.length > 0 && (
        <div className="min-w-full flex justify-center mt-6">
          <PaginationComponent TotoleCount={adsCount} PageSisze={PageSize} />
        </div>
      )}
    </div>
  );
}
