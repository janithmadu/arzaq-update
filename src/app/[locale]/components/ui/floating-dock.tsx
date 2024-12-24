"use client";

import { Home, PlusCircle, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Category {
  title_ar: string;
  title_en: string;
  slug: string;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export function FloatingMenu() {
  const [locale, setLocale] = useState<string>("en");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await fetch("/api/categories");
        const data: Category[] = await response.json();

        // Ensure the data is mapped correctly
        const mappedCategories = data.map((item) => ({
          title_ar: item.title_ar,
          title_en: item.title_en,
          slug: item.slug,
        }));

        setCategories(mappedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategory();
  }, [locale]); // Run effect when locale changes

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Post Ad", href: `/${locale}/addform/step01`, icon: PlusCircle },
    {
      name: "Categories",
      href: "/categories",
      icon: LayoutGrid,
      isDropdown: true,
      dropdownItems: categories, // Pass categories (title + slug)
    },
  ];

  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-white border-t">
        <nav className="container flex items-center justify-between px-4 py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return item.isDropdown ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex flex-col items-center gap-1 p-2 text-xs transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white shadow-md rounded-md mt-1">
                  {item.dropdownItems?.map((dropdownItem, index) => (
                    <DropdownMenuItem key={index}>
                      <Link
                        href={`/${locale}/ads?page=1&category=${dropdownItem.slug}`} // Use dropdownItem.slug
                        className="block p-2  hover:bg-gray-100 min-w-full rounded-lg text-bodymedium"
                      >
                        {dropdownItem[`title_${locale}` as keyof Category]} {/* Access the correct title */}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center gap-1 p-2 text-xs transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
