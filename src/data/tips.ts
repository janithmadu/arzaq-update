"use client";
import { Camera, DollarSign, LayoutGrid, Type, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

export const tips = () => {
  const t = useTranslations("TopNav");

  return [
    {
      icon: LayoutGrid,
      title: t("PicktheRightCategory"), // Correctly using the translation function
      description: t("PicktheRightCategoryDes"), // Add translation for the description as well
      image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: Camera,
      title: t("CaptureAttentionWithQualityPhotos"), // Correctly using the translation function
      description: t("CaptureAttentionWithQualityPhotosDes"), // Add translation for the description as well
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: Type,
      title: t("WriteaClearTitle"), // Correctly using the translation function
      description: t("WriteaClearTitleDes"), // Add translation for the description as well
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: FileText,
      title: t("DescribeYourItemWell"), // Correctly using the translation function
      description: t("DescribeYourItemWellDes"), // Add translation for the description as well
      image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: DollarSign,
      title: t("PriceItRight"), // Correctly using the translation function
      description: t("PriceItRightDes"), // Add translation for the description as well
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    },
  ];
};
