import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

function MobileApp({ image, image2, image3 }: any) {
  const t = useTranslations("TopNav");


  return (
    <div className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 mb-3">
      <div className="flex justify-center items-center lg:items-start lg:justify-normal flex-col-reverse lg:flex-row lg:space-x-[110px] rtl:lg:gap-x-[110px]">
        {/* Main image */}
        <Image
          className="w-full h-full"
          alt={image?.alt}
          width={1000}
          height={1000}
          src={image?.image}
        />

        <div className="mt-12 flex flex-col space-y-[20px] mb-16 lg:mb-0">
          <h1 className="lg:text-start text-center text-heading01 TitleTextColor">
            {t("DownloadAPPTitle")}
          </h1>
          <p className="lg:text-start text-center text-bodylarge BodyTextColor text-wrap">
            {t("DownloadAPPDis")}
          </p>

          {/* App Store images */}
          <div className="flex justify-center lg:justify-normal items-center gap-y-3 md:gap-y-0 flex-col md:flex-row md:space-x-[16px]">
            <Image
              alt={image2?.alt}
              className="w-[150px] h-[70px]"
              width={1000}
              height={1000}
              src={image2?.image}
            />
            <Image
              alt={image3?.alt}
              className="w-[150px] h-[70px]"
              width={1000}
              height={1000}
              src={image3?.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileApp;
