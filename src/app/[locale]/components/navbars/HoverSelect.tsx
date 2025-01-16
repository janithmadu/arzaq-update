"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const categories = [
  {
    name: "Automotive",
    subcategories: [
      {
        name: "New Cars",
        items: [
          { name: "Mercedes - New", slug: "mercedes-new" },
          { name: "BMW - New", slug: "bmw-new" },
          { name: "Ford - New", slug: "ford-new" },
          { name: "Nissan - New", slug: "nissan-new" },
          { name: "Lexus - New", slug: "lexus-new" },
          { name: "Chevrolet - New", slug: "chevrolet-new" },
        ]
      },
      { name: "Used Cars", slug: "used-cars" },
      { name: "Classic Cars", slug: "classic-cars" },
      { name: "Premium", slug: "premium" },
      { name: "Junk Cars", slug: "junk-cars" },
      { name: "Wanted Cars", slug: "wanted-cars" },
      { name: "Bikes", slug: "bikes" },
      { name: "Watercraft", slug: "watercraft" },
    ]
  }
]

export function HoverSelect() {
  return (
    <NavigationMenu className="max-w-none w-full bg-white border-b">
  <NavigationMenuList className="w-full max-w-screen-xl mx-auto px-6">
    {categories.map((category) => (
      <NavigationMenuItem key={category.name} className="relative group">
        <NavigationMenuTrigger className="h-14 text-base font-medium">
          {category.name}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="absolute">
          <div className="w-[220px] bg-white p-1 shadow-lg rounded-md relative">
            {category.subcategories.map((subcategory) => (
              <div
                key={subcategory.name}
                className="relative group/item"
              >
                <Link
                  href={subcategory.slug ? `/category/${subcategory.slug}` : '#'}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                >
                  <span>{subcategory.name}</span>
                  {subcategory.items && <ChevronRight className="h-4 w-4" />}
                </Link>

                {subcategory.items && (
                  <div
                    className="hidden group-hover/item:block absolute left-full top-0 ml-0.5 w-[220px] bg-white shadow-lg rounded-md p-1 z-50"
                    style={{ position: 'absolute' }} // Ensures dropdown positions correctly
                  >
                    {subcategory.items.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/category/${item.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    ))}
  </NavigationMenuList>
</NavigationMenu>

  )
}