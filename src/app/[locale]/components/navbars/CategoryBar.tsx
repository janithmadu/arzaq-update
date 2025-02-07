import {
  getAllCategory,
  getlimitedCategory,
} from "@/app/[locale]/actions/getCategories";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//import Decimal from "decimal.js";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { HoverSelect } from "./HoverSelect";

export const revalidate = 1;

interface CurrentLocal {
  CurrentLocal: string;
  t: string;
  categorytitle: string;
}

interface Category {
  id: number;
  title_en: string; // English title
  title_ar: string; // Arabic title
  slug: string; // URL-friendly identifier
  image_url: string | null; // Optional image URL, allowing null
  price: number;
  subcategory: [
    {
      title_en: string;
      title_ar: string;
      slug: string;
      secondcategory: [];
    },
  ];
}

const CategoryBar: React.FC<CurrentLocal> = async ({
  CurrentLocal,
  t,
  categorytitle,
}) => {
  //get category that limit to 7
  const getLimitedCate: any = await getlimitedCategory();
  //get all category
  const getallCategory: any = await getAllCategory();
  const getCurentLocal = CurrentLocal;
 
  
  return (
   
      <div className="flex items-center rtl:gap-[24px]  ">
      <div className=" hidden lg:flex-wrap   rtl:gap-[24px] xl:flex items-center space-x-[24px] ">
          {getLimitedCate.length === 0 ? (
            <div className="BodyTextColor text-heading04 hover:BodyTextColor hover:font-bold">
              You have no category
            </div>
          ) : (
            <div className="reletive flex gap-x-3">
              {getLimitedCate.map((data: Category) => {
               
               
                
                return (
                  <div key={data.id} className=" ">
                    <HoverSelect
                      Slug={data.slug}
                      CategoryName={
                        getCurentLocal == "en" ? data.title_en : data.title_ar
                      }
                      CategoryData={getLimitedCate}
                      SubCategory={data.subcategory}
                      CategorySlug={data.slug}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* Select category section */}

        {/* <DropdownMenu>
          <DropdownMenuTrigger
            className={` hidden text-[8px] md:text-bodysmall rounded-lg text-black gap-x-2  px-1 justify-center py-2  md:flex items-center transition duration-300 ease-in-out hover:bg-grayscale200 hover:shadow-lg min-w-[90px] md:min-w-[140px] `}
          >
            {t} <CaretDown />{" "}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{categorytitle}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {getallCategory?.map((item: Category, index: number) => {
              return (
                <DropdownMenuItem key={index}>
                  <Link
                    href={`/${getCurentLocal}/ads?page=1&category=${item?.slug}`}
                  >
                    <span>
                      {getCurentLocal == "en" ? item.title_en : item.title_ar}
                    </span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* Select category section End */}

        {/* Category Bar section */}

       

        {/* Category Bar section End */}
      </div>
    
  );
};

export default CategoryBar;
