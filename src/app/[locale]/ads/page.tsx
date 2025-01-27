

import { getCategoryAndSubcategory } from "../actions/getCategories";
import { getSubCategoryOptions } from "../actions/getSubCategories";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../../../components/ui/sheet";
import dynamic from "next/dynamic";

import { FunnelSimple, ListBullets } from "@phosphor-icons/react/dist/ssr";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Browse Ads on Q8ARZAQ - Find the Best Deals in Kuwait",
  description:
    "Explore thousands of ads on Q8ARZAQ. Find the best deals on products and services across Kuwait. Connect directly with sellers and buyers for a seamless experience!",
};


export const revalidate = 1;

const FilterBySubs = dynamic(
  () => import("../components/AdsPriview/GetAds/FilterBySubs"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const AdsCategory = dynamic(
  () => import("../components/AdsPriview/AdsCategory/AdsCategory"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const AdsSubOptions = dynamic(
  () => import("../components/AdsPriview/AdsCategory/AdsSubOptions"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const AddPriceFilter = dynamic(
  () => import("../components/AdsPriview/AdsCategory/AddPriceFilter"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default async function Home() {
  const [getSubCategoryAndCategory, getOptions] = await Promise.all([
    getCategoryAndSubcategory(),
    getSubCategoryOptions(),
  ]) as any;

  


  
  

  return (
    <div className="min-h-screen bg-gray-100 sm:p-4 p-1">
      {/* Main container */}

      <div className="container mx-auto md:flex sm:px-5 rtl:gap-20  lg:px-5 xl:px-20 md:px-5 rtl:gap-x-[100px]">
        {/* Sidebar */}
        {/* <aside className=" w-[210px] lg:w-[312px] hidden md:inline bg-white rounded-lg p-4 shadow "> 
       
        </aside> */}

        {/* Main Content - Grid */}

        <main className="  w-full">
          <Breadcrumb category={getSubCategoryAndCategory}>
            <div className="">
              <Sheet>
                <SheetTrigger>
                  <FunnelSimple size={32} className="text-bodymedium" />
                </SheetTrigger>
                <SheetContent className="overflow-scroll flex min-w-[300px] ">
                  <SheetHeader className=" min-w-full">
                    <div className="mb-6 ">
                      <AdsCategory Categories={getSubCategoryAndCategory} />
                    </div>
                    <div className="mb-6">
                      <AdsSubOptions Options={getOptions} />
                    </div>

                    <div className="mb-6">
                      <AddPriceFilter />
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </Breadcrumb>
          <FilterBySubs />
        </main>
      </div>
    </div>
  );
}
