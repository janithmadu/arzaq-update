import { useTranslations } from "next-intl";
import React from "react";

interface ProductOverwiew {
  model?: string;
  condition?: string;
  brand?: string;
  authenticity?: string;
  state?: string;
}

const ProductOverwiew: React.FC<ProductOverwiew> = ({
  model,
  condition,
  brand,
  authenticity,
  state,
}) => {
  const t = useTranslations("TopNav");


  return (
    <div className="min-w-full border-b px-[32px] py-5">
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">{t("Model")}</h1> <span>{model}</span>
      </div>
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">{t("Condition")}:</h1>{" "}
        <span>{condition}</span>
      </div>
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">{t("Brand")}:</h1> <span>{brand}</span>
      </div>
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">{t("Authenticity")}:</h1>{" "}
        <span>{authenticity}</span>
      </div>
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">{t("State")}:</h1> <span>{state}</span>
      </div>
    </div>
  );
};

export default ProductOverwiew;
