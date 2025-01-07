"use client";

import { useEffect, useState } from "react";
import { TipCard } from "@/components/ui/TipCard";
import { ImagePreview } from "@/components/ui/ImagePreview";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Camera, DollarSign, FileText, LayoutGrid, Type } from "lucide-react";



function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export default function HomePageTipSection() {
  const [selectedTip, setSelectedTip] = useState(0);
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const t = useTranslations("TopNav");

  const tipss = [
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
  ]

  useEffect(() => {
    const cookieLocale = (getCookie("NEXT_LOCALE") as "en" | "ar") || "en";
    setLocale(cookieLocale);
  }, []);


  return (
    <main className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
            {t("TipsforCreatingthePerfectListing")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("TipsforCreatingDes")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center mb-20">
          <div className="space-y-3">
            {tipss.map((tip, index) => (
              <TipCard
                key={index}
                icon={tip.icon}
                title={tip.title}
                description={tip.description}
                isActive={selectedTip === index}
                onClick={() => setSelectedTip(index)}
              />
            ))}
          </div>

          <ImagePreview
            image={tipss[selectedTip].image}
            title={tipss[selectedTip].title}
          />
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/addform/step01`}
            className="bg-[#312783] text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            {t("StartCreatingYourListing")}
          </Link>
        </div>
      </div>
    </main>
  );
}
