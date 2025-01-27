"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowArcRight } from "@phosphor-icons/react";

type Category = {
  title_ar: string;
  title_en: string;
  subcategory?: Category[];
};

type BreadcrumbProps = {
  children: ReactNode;
  category?: Category[];
};

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(";").shift() : undefined;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ children, category }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryQu = searchParams.get("category");
  const subcategoriesQu = searchParams.get("subcategories");
  const secondcategoryQu = searchParams.get("secondcategory");

  const [locale, setLocale] = useState<"en" | "ar">("en");
  const BredCambArray: string[] = [];

  useEffect(() => {
    const cookieLocale = (getCookie("NEXT_LOCALE") as "en" | "ar") || "en";
    setLocale(cookieLocale);
  }, []);

  // Add breadcrumbs based on query parameters and category data
  if (!categoryQu && !subcategoriesQu && !secondcategoryQu) {
    BredCambArray.push(locale === "en" ? "All Ads" : "جميع الإعلانات");
  } else {
    // Filter main category
    const filteredCategory = category?.find(
      (cat) => cat.title_ar === categoryQu || cat.title_en === categoryQu
    );

    if (filteredCategory) {
      BredCambArray.push(
        locale === "en" ? filteredCategory.title_en : filteredCategory.title_ar
      );

      // Filter subcategory
      const filterSubCategory = filteredCategory.subcategory?.find(
        (subcat) => subcat.title_ar === subcategoriesQu || subcat.title_en === subcategoriesQu
      );

      if (filterSubCategory) {
        BredCambArray.push(
          locale === "en" ? filterSubCategory.title_en : filterSubCategory.title_ar
        );

        // Handle second category (if needed later)
        // Add logic for filtering second category if it's part of the data structure
      }
    }
  }

  // Render breadcrumbs
  return (
    <nav aria-label="breadcrumb" className="mb-3 flex justify-between">
      <ol className="flex flex-wrap items-center text-sm text-gray-600">
        <li>
          <Link href="/" className="hover:underline font-bold">
            {locale === "en" ? "Home" : "الرئيسية"}
          </Link>
        </li>
        {BredCambArray.map((segment, index) => (
          <li
            key={index}
            className={`flex items-center ${
              index === BredCambArray.length - 1
                ? "font-semibold"
                : "hover:underline"
            }`}
          >
            <span className="mx-2">
              <ArrowArcRight />
            </span>
            <Link href={"#"}>{decodeURIComponent(segment)}</Link>
          </li>
        ))}
      </ol>
      <div>{children}</div>
    </nav>
  );
};

export default Breadcrumb;
