"use client";

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { Currency } from '@/lib/statics';

const LocationPriceStep = () => {
  const { register, formState: { errors } } = useFormContext();
  const t = useTranslations('TopNav');

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <label className="text-grayscale900">{t("Country")}</label>
        <select
          {...register("country")}
          className="min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
          defaultValue="DEFAULT"
        >
          <option value="DEFAULT" disabled>{t("SelectCountry")}</option>
          <option value="srilanka">Sri Lanka</option>
        </select>
        {errors.country && (
          <p className="text-red-600">{`${errors.country.message}`}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-grayscale900">{t("State")}</label>
        <select
          {...register("state")}
          className="min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
          defaultValue="DEFAULT"
        >
          <option value="DEFAULT" disabled>{t("SelectState")}</option>
          <option value="Gampaha">Gampaha</option>
        </select>
        {errors.state && (
          <p className="text-red-600">{`${errors.state.message}`}</p>
        )}
      </div>

      <div className="flex gap-x-4">
        <div className="flex flex-col flex-1">
          <label className="text-grayscale900">{t("Currency")}</label>
          <select
            {...register("Currency")}
            className="min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
            defaultValue="DEFAULT"
          >
            <option value="DEFAULT" disabled>{t("Currency")}</option>
            {Currency?.map((curr: any) => (
              <option key={curr.value.en} value={curr.value.en}>
                {curr.title.en}
              </option>
            ))}
          </select>
          {errors.Currency && (
            <p className="text-red-600">{`${errors.Currency.message}`}</p>
          )}
        </div>

        <div className="flex flex-col flex-1">
          <label className="text-grayscale900">{t("AdPrices")}</label>
          <Input
            type="text"
            {...register("price")}
            placeholder={t("Pickagoodprice-whatwouldyoupay?")}
            className="min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
          />
          {errors.price && (
            <p className="text-red-600">{`${errors.price.message}`}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-x-3">
        <input type="checkbox" {...register("negotiable")} />
        <label className="text-sm font-medium">
          {t("Negotiable")}
        </label>
      </div>
    </div>
  );
};

export default LocationPriceStep;