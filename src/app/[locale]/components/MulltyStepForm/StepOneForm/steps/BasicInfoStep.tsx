"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

interface BasicInfoStepProps {
  categories: any;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ categories }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("TopNav");

  const [Options, setOptions] = useState<any[] | undefined>();
  const [subCategoriesID, setsubCategoriesID] = useState<string | undefined>();
  const [secondCategoriesID, setsecondCategoriesID] = useState<
    string | undefined
  >();
  const [CategoriesID, setCategoriesID] = useState<string | undefined>();
  const [locale, setLocale] = useState<string>("en");
  const [subCategories, setsubCategories] = useState<any[] | undefined>();
  const [AdPrice, setAdPrice] = useState<number>();
  const [secondCategories, setsecondCategories] = useState<any>();

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  const handleSubCategoryChange = (e: string) => {
    setOptions([]);
    setsubCategoriesID(e);
  };

  const handleSecondCategoryChange = (e: string) => {
  


    setOptions([]);
    setsecondCategoriesID(e);
  };

  const handleInputChange = (e: string) => {
    const { id, price } = JSON.parse(e);
    setCategoriesID(id);
    setAdPrice(price);
  };

  useEffect(() => {
    const getSubCategory = async () => {
      if (CategoriesID) {
        // const response = await getSubCategoriesByID(CategoriesID);
        const response = await fetch(
          `/api/subcategory?categoryId=${CategoriesID}`
        );
        const data = await response.json();

        setOptions([]);
        setsubCategories(data);
      }
    };
    getSubCategory();
  }, [CategoriesID]);
 
useEffect(() => {
    const getSecondCategory = async () => {
      if (subCategoriesID) {
        // const response = await getSubCategoriesByID(CategoriesID);
        const response = await fetch(
          `/api/secondcategory?categoryId=${subCategoriesID}`
        );
        const data = await response.json();
        setsecondCategories(data);
      }
    };
    getSecondCategory();
  }, [subCategoriesID]);

  
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <label className="text-grayscale900">{t("AdName")}</label>
        <Input
          {...register("name")}
          type="text"
          className="min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
          placeholder={t("AdName")}
        />
        {errors.name && (
          <p className="text-red-600">{`${errors.name.message}`}</p>
        )}
      </div>

      <div className="flex flex-col ">
        <label className="text-grayscale900">{t("Category")}</label>
        <select
          className="sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
          {...register("category")}
          onChange={(e) => handleInputChange(e.target.value)}
          defaultValue={"DEFAULT"}
        >
          <option value="DEFAULT" disabled>
            {t("SelectCategory")}
          </option>
          {categories?.map((selectData: any) => (
            <option
              key={selectData?.id}
              value={JSON.stringify({
                id: selectData?.id,
                price: selectData?.price,
              })}
            >
              {locale == "en" ? selectData.title_en : selectData.title_ar}
              {/* {selectData?.title[locale as "en" | "ar"]} */}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="text-red-600">{`${errors.category.message}`}</p>
        )}
        {/* Show error for name */}
      </div>

      <div className="flex flex-col">
        <label className="text-grayscale900">{t("Subcategory")}</label>
        <select
          className=" min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
          {...register("subcategory")}
          onChange={(e) => handleSubCategoryChange(e.target.value)}
          defaultValue={"DEFAULT"}
        >
          <option className="min-w-full" value="DEFAULT" disabled>
            {t("SelectCategory")}
          </option>
          {subCategories?.map((selectData: any) => (
            <option key={selectData.id} value={Number(selectData.id)}>
              {locale == "en" ? selectData.title_en : selectData.title_ar}
            </option>
          ))}
        </select>
        {errors.subcategory && (
          <p className="text-red-600">{`${errors.subcategory.message}`}</p>
        )}
        {/* Show error for name */}
      </div>


      <div className="flex flex-col">
          <label className="text-grayscale900">{t("SecondSubcategory")}</label>
          <select
            className="sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
            {...register("secondcategory")}
            onChange={(e) => handleSecondCategoryChange(e.target.value)}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              {t("SecondSubcategory")}
            </option>
            {secondCategories?.map((selectData: any) => (
              <option key={selectData.id} value={Number(selectData.id)}>
                {locale == "en" ? selectData.title_en : selectData.title_ar}
              </option>
            ))}
          </select>
          {errors.secondcategory && (
            <p className="text-red-600">{`${errors.secondcategory.message}`}</p>
          )}
          {/* Show error for name */}
        </div>
      <div className="flex flex-col">
        <label className="text-grayscale900">{t("Description")}</label>
        <textarea
          {...register("description")}
          className="min-h-[120px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
          placeholder={t("Addescription")}
        />
        {errors.description && (
          <p className="text-red-600">{`${errors.description.message}`}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInfoStep;
