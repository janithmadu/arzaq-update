"use client";
import React, { useEffect, useState } from "react";
import { CarCard } from "./CarCard";
import { CarouselItem } from "@/components/ui/carousel";
import { PostAd } from "@/lib/categoryInterface";

interface CateID {
  cateid: any;
}

const HomePageAdContainer = ({ cateid }: any) => {
  const [ad, setAds] = useState<any>();
  useEffect(() => {
    const getAds = async () => {
      const response = await fetch(
        `/api/homepageads?categoryId=${cateid}`
      );
      const ads = await response.json();
     
      setAds(ads);
    };

    getAds();
  }, [cateid]);

  console.log(ad);
  

  return (
    <>
      {ad?.map((data: PostAd, index: any) => (
        <CarouselItem
          className=" basis-1/1 md:basis-1/3 xl:basis-1/4"
          dir="ltr"
          key={index}
        >
          <CarCard
          
            id={data.id}
            brand={data.brand}
            duration={data.createdAt}
            image={data?.postad_photos[0]?.photoUrl}
            location={data.state}
            name={data.adName}
            price={data.price}
            km={data.model}
            currancy={data.currency}
          />
        </CarouselItem>
      ))}
    </>
  );
};

export default HomePageAdContainer;
