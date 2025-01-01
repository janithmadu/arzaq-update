import { Category } from "@/lib/categoryInterface";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const revalidate = 1;

interface getCategory {
  getCategory: any;
}

const HomeCategory: React.FC<getCategory> = ({ getCategory }) => {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const t = useTranslations("TopNav");

  return (
    <div className="container mx-auto flex flex-col space-y-[10px] px-2  lg:px-5 xl:px-20 md:px-10 ">
      {/* Heading */}
      <div>
        <h1 className="text-bodyxl font-bold  ">
          {" "}
          {t("HomePageCategortSectionHeading")}{" "}
          <span className="text-[#312783]">{t("Categories")}</span>
        </h1>
      </div>
      {/* Heading End*/}

      {/* Main Grid */}

      <div className="grid grid-cols-3 md:grid-cols-3  lg:grid-cols-5 xl:grid-cols-6  gap-3 ">
        {getCategory.map((data: Category, index: number) => {
          return (
            <Link
              key={index}
              href={`${locale}/ads?page=1&category=${data?.slug}`}
            >
              <div className=" min-w-[90px] min-h-[140px] md:min-w-[120px] md:min-h-[120px] bg-[#f7f8fa] rounded-lg flex justify-center items-center flex-col space-y-3 ">
                <Image
                  width={90}
                  height={90}
                  alt={data.title_en}
                  src={data.image_url || "/defultimage.png"}
                  className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-150 w-[100px] md:w-[100px]"
                />
              </div>

              <h1 className=" text-md md:text-xl  text-center">
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
