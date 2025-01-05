"use client";

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { Authenticity, ConditionList } from '@/lib/statics';

const DetailsStep = () => {
  const { register, formState: { errors } } = useFormContext();
  const t = useTranslations('TopNav');

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <label className="text-grayscale900">{t("Conditions")}</label>
        <select
          className="min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
          {...register("conditions")}
          defaultValue="DEFAULT"
        >
          <option value="DEFAULT" disabled>{t("SelectConditions")}</option>
          {ConditionList?.map((condition: any) => (
            <option key={condition.value.en} value={condition.value.en}>
              {condition.title.en}
            </option>
          ))}
        </select>
        {errors.conditions && (
          <p className="text-red-600">{`${errors.conditions.message}`}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-grayscale900">{t("Authenticity")}</label>
        <select
          className="min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
          {...register("authenticity")}
          defaultValue="DEFAULT"
        >
          <option value="DEFAULT" disabled>{t("SelectanAuthenticity")}</option>
          {Authenticity?.map((auth: any) => (
            <option key={auth.value.en} value={auth.value.en}>
              {auth.title.en}
            </option>
          ))}
        </select>
        {errors.authenticity && (
          <p className="text-red-600">{`${errors.authenticity.message}`}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-grayscale900">{t("MobileNumbe")}</label>
        <Input
          type="text"
          {...register("mobileNumbe")}
          placeholder="Ex: +96*********"
          className="min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
        />
        {errors.mobileNumbe && (
          <p className="text-red-600">{`${errors.mobileNumbe.message}`}</p>
        )}
      </div>
    </div>
  );
};

export default DetailsStep;