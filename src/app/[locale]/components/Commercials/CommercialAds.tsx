"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CommercialCard from "./CommercialCard";
import NoItem from "../../../../../public/rb_127823.png";
import Image from "next/image";
import LoadingImage from "../../../../../public/system-regular-715-spinner-horizontal-dashed-circle-loop-jab.gif";
import { useTranslations } from "next-intl";

type Commercial = {
  created_at: Date;
  description: string;
  id: number;
  image: string;
  phone_number: string;
  subcategory_id: number;
  updated_at: Date;
  view_count: number;
  whatsapp_number: string;
};

function CommercialAds() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const myParam = searchParams.get("slug");
  const [commercials, setCommercials] = useState<Commercial[] | null>([]);
  const [errorHandle, setErrorHandle] = useState<boolean>();
  const [adsLoader, setAdsLoader] = useState<boolean>(false);
const t = useTranslations("TopNav");
  useEffect(() => {
    const getCommercialsBySlug = async () => {
      setAdsLoader(true);

      const response = await fetch(`/api/commercials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: myParam }),
      });

      const data = await response.json();

  

      if (data.status === 404) {
        setAdsLoader(false);
        setErrorHandle(true);
        setCommercials(null);
        
      } else {
        setCommercials(data.res);
        setErrorHandle(false);
        setAdsLoader(false);
      }
    };

    getCommercialsBySlug();
  }, [myParam]); // Only depend on `myParam`


  return (
    <>
      {adsLoader === true ? (
        <div className="fixed -top-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 min-w-full">
          <div className="text-center">
            <Image alt="Loading" src={LoadingImage} width={70} height={70} />
          </div>
        </div>
      ) : (
        <></>
      )}
      {errorHandle === false ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 min-w-full">
          {commercials?.map((data: Commercial) => (
            <div key={data.id}>
              <CommercialCard
                created_at={data?.created_at as Date}
                description={data?.description as string}
                id={data?.id as number}
                image={data?.image as string}
                phone_number={data?.phone_number as string}
                subcategory_id={data?.subcategory_id as number}
                view_count={data?.view_count as number}
                updated_at={data?.updated_at as Date}
                whatsapp_number={data?.whatsapp_number as string}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-center text-gray-500 space-y-4 ">
          <Image src={NoItem} alt="No Ads Available" width={160} height={160} />
          <h2 className="text-2xl font-semibold text-gray-700">
          {t("NoCommercialsMatchSearch")}
          </h2>
          <p className="text-gray-500">
          {t("TryAdjustFilters")}
          </p>
        </div>
      )}
    </>
  );
}

export default CommercialAds;