"use client"
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

function getCookie(name: string) {
  if (typeof window !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }
  return undefined;
}



export function HoverSelect({ CategoryName, Slug, SubCategory }: any) {
  const [locale, setLocale] = useState<"en" | "ar">(() => {
    return (getCookie("NEXT_LOCALE") as "en" | "ar") || "en";
  });

  useEffect(() => {
    const currentLocale = (getCookie("NEXT_LOCALE") as "en" | "ar") || "en";
    setLocale(currentLocale);
  }, []);

  const [activeDropdowns, setActiveDropdowns] = useState<{
    main: boolean;
    subMenus: Record<string, boolean>;
  }>({
    main: false,
    subMenus: {}
  });

  const handleMouseEnter = useCallback((type: "main" | string) => {
    setActiveDropdowns(prev => ({
      ...prev,
      ...(type === "main"
        ? { main: true }
        : { subMenus: { ...prev.subMenus, [type]: true } })
    }));
  }, []);

  const handleMouseLeave = useCallback((type: "main" | string) => {
    setActiveDropdowns(prev => ({
      ...prev,
      ...(type === "main"
        ? { main: false, subMenus: {} }
        : { subMenus: { ...prev.subMenus, [type]: false } })
    }));
  }, []);

  return (
    <div className="relative inline-block">
      {/* Trigger */}
      <div
        className={cn(
          "cursor-pointer px-3 py-2 transition-all duration-200",
          "hover:bg-gray-50",
          "border-b-2 border-transparent",
          activeDropdowns.main && "border-primary"
        )}
        onMouseEnter={() => handleMouseEnter("main")}
        onMouseLeave={() => handleMouseLeave("main")}
      >
        <Link href={`/${locale}/ads?page=1&category=${Slug}`}>
          <span>{CategoryName}</span>
        </Link>
      </div>

      {/* Main Dropdown */}
      {SubCategory && SubCategory.length > 0 && (
        <div
          className={cn(
            "absolute top-full mt-1 -right-[100px]",
            "bg-white rounded-lg shadow-lg w-60",
            "transform transition-all duration-200 origin-top-right",
            "border border-gray-100",
            activeDropdowns.main
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          )}
          onMouseEnter={() => handleMouseEnter("main")}
          onMouseLeave={() => handleMouseLeave("main")}
        >
          {SubCategory.map((category:any) => (
            <div key={category.id} className="relative">
              <div
                className={cn(
                  "flex items-center justify-between px-4 py-3",
                  "hover:bg-gray-50 transition-colors duration-200",
                  "border-b border-gray-100",
                  activeDropdowns.subMenus[category.id] && "bg-gray-50"
                )}
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={() => handleMouseLeave(category.id)}
              >
                <Link href={`/${locale}/ads?page=1&subcategory=${category.slug}`}>
                  <span className="font-medium">{locale == "en" ? category.title_en : category.title_ar}</span>
                </Link>
                {category.secondcategory && category.secondcategory.length > 0 && (
                  <ArrowRight className="h-4 w-4 text-gray-500" />
                )}
              </div>

              {/* Sub-dropdown */}
              {category.secondcategory && category.secondcategory.length > 0 && (
                <div
                  className={cn(
                    "absolute left-full top-0 ml-1",
                    "bg-white rounded-lg shadow-lg w-60",
                    "transform transition-all duration-200 origin-top-left",
                    "border border-gray-100",
                    activeDropdowns.subMenus[category.id]
                      ? "opacity-100 scale-100 translate-x-0"
                      : "opacity-0 scale-95 -translate-x-2 pointer-events-none"
                  )}
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={() => handleMouseLeave(category.id)}
                >
                  {category.secondcategory.map((subItem:any, index:any) => (
                    <div
                      key={subItem.id}
                      className={cn(
                        "px-4 py-3 hover:bg-gray-50 transition-colors duration-200 cursor-pointer",
                        index !== category.secondcategory!.length - 1 && "border-b border-gray-100"
                      )}
                    >
                      <Link href={`/${locale}/ads?page=1&secondcategory=${subItem.slug}`}>
                        <span>{subItem.title_en}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}