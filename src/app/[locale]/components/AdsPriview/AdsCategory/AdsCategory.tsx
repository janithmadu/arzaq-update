import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cookies } from "next/headers";
import Image from "next/image";
import AddSubcategory from "./AddSubcategory";
import { Category } from "@/lib/categoryInterface";

interface Categories {
  Categories: any[];
}

interface SubcategoryNew {
  _id: string;
  title: string[]; // Updated to string[] to match data structure
}

const AdsCategory: React.FC<Categories> = ({ Categories }) => {


  const cookieStore = cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "en") as "en" | "ar";
  const localeIndex = locale; // Assume the array has `en` at index 0 and `ar` at index 1
  return (
    <>
      {Categories.map((category: Category, index: number) => {
        return (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <Image
                  alt="categoryImages"
                  width={40}
                  height={40}
                  src={category?.image_url || "/default-image.jpg"}
                />
                {locale == "en" ? category.title_en : category.title_ar}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {category.subcategory.map((subcate: any) => {
                    return (
                      <AddSubcategory
                        key={subcate.id}
                        subcatotitle={
                          locale == "en" ? subcate.title_en : subcate.title_ar
                        }
                        subcatoId={subcate.slug}
                      />
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
};

export default AdsCategory;
