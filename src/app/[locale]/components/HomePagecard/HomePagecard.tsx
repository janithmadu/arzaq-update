import React from "react";
import { getAllCategory } from "../../actions/getCategories";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cookies } from "next/headers";
import HomePageAdContainer from "./HomePageAdContainer";
import { GetAdByCategory } from "../../actions/getAds";

export default async function HomePagecard() {
  const category:any = await getAllCategory();
  const cookieStore = cookies();
  const locale: string = cookieStore.get("NEXT_LOCALE")?.value || "en";

  // Fetch ads for all categories
  const categoriesWithAds = await Promise.all(
    category.map(async (category: any) => {
      const ads:any = await GetAdByCategory(category.id); // Assuming this function fetches ads for a given category
      return ads.length > 0 ? category : null; // Include only categories with ads
    })
  );

  // Filter out null values (categories without ads)
  const filteredCategories = categoriesWithAds.filter(Boolean);

  return (
    <>
      {filteredCategories.map((data: any, index: number) => (
        <div
          key={index}
          className="container mx-auto flex flex-col space-y-[10px] px-2  lg:px-5 xl:px-20 md:px-10"
        >
          <div className="flex flex-col gap-y-3 mt-7">
            <h1 className="text-bodyxl TitleTextColor  font-bold">
              {locale === "en" ? " All In" : "كل شيء في"} {' '}
              <span className="mainColorText">
                {locale == "en" ? data.title_en : data.title_ar}
              </span>
            </h1>
            <Carousel dir="ltr">
              <CarouselContent className="-ml-4" dir="ltr">
                <HomePageAdContainer cateid={data.id} />
              </CarouselContent>
              <CarouselPrevious
                className="mainColor WhiteColorText hidden md:flex   "
                dir="ltr"
              />
              <CarouselNext
                className="mainColor WhiteColorText hidden md:flex"
                dir="ltr"
              />
            </Carousel>
          </div>
        </div>
      ))}
    </>
  );
}
