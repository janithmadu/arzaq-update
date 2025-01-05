"use client";

import React, { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface FeaturesImagesStepProps {
  ImagesArray: Array<{
    postAdId: string;
    photoUrl: string;
    altText: string;
  }>;
  setImages: React.Dispatch<
    React.SetStateAction<
      Array<{
        postAdId: string;
        photoUrl: string;
        altText: string;
      }>
    >
  >;
}

const FeaturesImagesStep: React.FC<FeaturesImagesStepProps> = ({
  ImagesArray,
  setImages,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("TopNav");
  const [features, setFeatures] = useState<any[]>([{ feature: "" }]);

  const handleRemoveImage = async (id: string) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.postAdId !== id)
    );
  };
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features]; // Spread operator to create a new array
    newFeatures[index] = { feature: value }; // Update the specific feature as an object
    setFeatures(newFeatures); // Update the state
  };
  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };
  const addFeature = () => {
    setFeatures([...features, { feature: "" }]); // Add a new object with an empty feature value
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-y-[8px]">
        <label className="text-grayscale900">{t("Images")}</label>
        <div className="max-w-[400px] min-h-[300px] shadow rounded-xl flex justify-center items-center px-4">
          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            onSuccess={async (results: any) => {
              const id = results?.info?.public_id;
              const alt = results?.info?.original_filename;
              const imageUrl = results?.info?.secure_url;

              if (imageUrl) {
                setImages((prevImages) => [
                  ...prevImages,
                  { postAdId: id, photoUrl: imageUrl, altText: alt },
                ]);
              }
            }}
          >
            {({ open }) => (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center min-w-full min-h-[200px] flex justify-center items-center flex-col">
                <button
                  type="button"
                  onClick={() => open()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  {t("ImageUpload")}
                </button>
                <p className="mt-1 text-xs text-gray-400">
                  {t("ImageUploadWarning")}
                </p>
              </div>
            )}
          </CldUploadWidget>
        </div>

        <div className="flex gap-x-3 mb-2">
          {ImagesArray.map((ImageOptions) => (
            <div key={ImageOptions.postAdId}>
              <div className="min-w-full justify-end flex mb-1">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(ImageOptions.postAdId)}
                  className="p-2 flex items-center justify-center bg-red-600 rounded-full text-white text-sm w-3 h-3"
                >
                  X
                </button>
              </div>
              <CldImage
                alt={ImageOptions.altText}
                width={100}
                height={100}
                src={ImageOptions.photoUrl}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="text-grayscale900">{t("AdFeatures")}</label>

        {/* Render feature input fields */}
        {features.map((feature, index) => (
          <div key={index} className="mb-4 flex gap-x-5 items-center">
            <Input
              type="text"
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              placeholder={`Feature ${index + 1}`}
              className="min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              value={feature.feature} // Access the `feature` key of the object
            />
            <button
              onClick={() => removeFeature(index)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              {t("Remove")}
            </button>
          </div>
        ))}

        {/* Button to add a new feature */}
        <button
          onClick={addFeature}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="button"
        >
          {t("AdFeatures")}
        </button>
      </div>
    </div>
  );
};

export default FeaturesImagesStep;
