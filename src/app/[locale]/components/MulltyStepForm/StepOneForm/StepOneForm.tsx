"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, setFormErrors } from "@/app/store/formSlice";
import { useTranslations } from "next-intl";
import { SchemaAdPostForm } from "@/lib/schemas";
import BasicInfoStep from "./steps/BasicInfoStep";
import StepIndicator from "./StepIndicator";
import { RootState } from "@/app/store";
import DetailsStep from "./steps/DetailsStep";
import FeaturesImagesStep from "./steps/FeaturesImagesStep";
import LocationPriceStep from "./steps/LocationPriceStep";
import Image from "next/image";
import FormHeader from "../../../../../../public/AdForm.png";

interface StepOneFormProps {
  categories: any;
}

const StepOneForm: React.FC<StepOneFormProps> = ({ categories }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [ImagesArray, setImages] = useState<
    { postAdId: string; photoUrl: string; altText: string }[]
  >([]);
  const t = useTranslations("TopNav");
  const dispatch = useDispatch();

  const formData = useSelector((state: RootState) => state.form.data);
  const formErrors = useSelector((state: RootState) => state.form.errors);

  const methods = useForm({
    resolver: zodResolver(SchemaAdPostForm),
    mode: "onChange",
  });

  const nextStep = async () => {
    const isValid = methods.formState.errors;


    if (!isValid.name && !isValid.description) {
      setCurrentStep((prev) => Math.min(prev + 1, 2));
    }

    if (!isValid.condition && !isValid.authenticity && !isValid.mobileNumbe) {
      setCurrentStep((prev) => Math.min(prev + 2, 3));
    }

    if (ImagesArray)
      if (ImagesArray.length > 5) {
        alert("Pleace Add less than 5 Images");
      } else {
        setCurrentStep((prev) => Math.min(prev + 3, 4));
      }

   
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: any) => {
    // Your existing submit logic here
  
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep categories={categories} />;
      case 2:
        return <DetailsStep />;
      case 3:
        return (
          <FeaturesImagesStep ImagesArray={ImagesArray} setImages={setImages} />
        );
      case 4:
        return <LocationPriceStep />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-y-[20px]">
      <div className="min-h-[100px] rounded-xl relative">
        <Image
          alt="formHeader"
          src={FormHeader}
          className="rounded-xl min-h-[100px] min-w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <h1 className="text-[32px]">{t("PostYourAd")}</h1>
        </div>
      </div>

      <StepIndicator currentStep={currentStep} totalSteps={4} />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-[20px]"
        >
          {renderStep()}

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-gray-200 rounded-md"
              >
                Previous
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-primary500 text-white rounded-md ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-primary500 text-white rounded-md ml-auto"
              >
                Submit Ad
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default StepOneForm;
