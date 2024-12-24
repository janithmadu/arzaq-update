"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Range, getTrackBackground } from "react-range";
import { useTranslations } from "next-intl";

const STEP = 1;
const MIN = 0;
const MAX = 1000000;

const AddPriceFilter = () => {
  const [values, setValues] = useState([0, 100000]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("TopNav");

  const applyFilter = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("minPrice", values[0].toString());
    currentParams.set("maxPrice", values[1].toString());
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="w-full px-4 py-4" dir="ltr">
      <div className="text-xl font-semibold mb-2">{t("PriceRange")}</div>
      <div className="flex justify-between mb-4">
        <span>${values[0]}</span>
        <span>${values[1]}</span>
      </div>

      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-1 bg-gray-300 rounded"
            style={{
              background: getTrackBackground({
                values,
                colors: ["#ccc", "#0ea5e9", "#ccc"],
                min: MIN,
                max: MAX,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged, index }) => (
          <div
            {...props}
            key={index}
            className={`w-5 h-5 bg-[#312783] rounded-full shadow-md cursor-pointer ${
              isDragged ? "shadow-lg" : ""
            }`}
          />
        )}
      />

      <div className="mt-6">
        <button
          onClick={applyFilter}
          className="px-4 py-2 bg-[#312783] text-white rounded hover:bg-blue-600 transition duration-300"
        >
          {t("PriceApply")}
        </button>
      </div>
    </div>
  );
};

export default AddPriceFilter;
