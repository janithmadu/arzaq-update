import React from "react";
import CategoryCarousel from "./SubcategoryCourisole";
import CommercialAds from "./CommercialAds";

const Commercial = () => {
  return (
    <div className="container mx-auto flex flex-col space-y-[50px] px-5  lg:px-5 xl:px-20 md:px-10 mb-3">
      <CategoryCarousel/>
      <CommercialAds/>
    </div>
  );
};

export default Commercial;