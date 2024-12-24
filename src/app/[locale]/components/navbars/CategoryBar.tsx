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
import Decimal from 'decimal.js';

import { CaretDown } from "@phosphor-icons/react/dist/ssr";

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
  price: number | Decimal;
}

const CategoryBar: React.FC<CurrentLocal> = async ({
  CurrentLocal,
  t,
  categorytitle,
}) => {
  //get category that limit to 7
  const getLimitedCate = await getlimitedCategory();
  //get all category
  const getallCategory = await getAllCategory();
  const getCurentLocal = CurrentLocal;

  return (
    <div className="min-h-[50px] flex items-center ">
      <div className="flex items-center rtl:gap-[24px]  space-x-[34px]">
        {/* Select category section */}

        <DropdownMenu>
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
        </DropdownMenu>

        {/* Select category section End */}

        {/* Category Bar section */}

        <div className="border-l hidden   lg:flex-wrap  rtl:border-r rtl:border-l-0 rtl:gap-[24px]  xl:flex items-center space-x-[24px] px-[24px] ">
          {getLimitedCate.length === 0 ? (
            <div className="text-grayscale600  text-heading04 hover:text-grayscale800 hover:font-bold">
              {" "}
              You have no category
            </div>
          ) : (
            getLimitedCate.map((item: Category, index: number) => {
              
              return (
                <Link
                  key={index}
                  href={`${getCurentLocal ? `/${getCurentLocal}` : ""}/ads?page=1&category=${item?.slug}`}
                  className="text-grayscale600 text-heading04 transition duration-300 ease-in-out  hover:text-grayscale800 hover:font-bold"
                >
          
                  {getCurentLocal == "en" ? item.title_en : item.title_ar}
                </Link>
              );
            })
          )}
        </div>
        {/* Category Bar section End */}
      </div>
    </div>
  );
};

export default CategoryBar;
