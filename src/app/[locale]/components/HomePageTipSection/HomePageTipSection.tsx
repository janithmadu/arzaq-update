"use client";

import { useEffect, useState } from "react";
import { TipCard } from "@/components/ui/TipCard";
import { ImagePreview } from "@/components/ui/ImagePreview";
import { tips } from "@/data/tips";
import Link from "next/link";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export default function HomePageTipSection() {
  const [selectedTip, setSelectedTip] = useState(0);
  const [locale, setLocale] = useState<"en" | "ar">("en");

  useEffect(() => {
    const cookieLocale = (getCookie("NEXT_LOCALE") as "en" | "ar") || "en";
    setLocale(cookieLocale);
  }, []);

  return (
    <main className=" container mx-auto flex flex-col space-y-[50px] px-5  lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
            Tips for Creating the Perfect Listing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow these proven strategies to create listings that attract
            buyers and sell faster on ARZAQ.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center mb-20">
          <div className="space-y-3">
            {tips.map((tip, index) => (
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
            image={tips[selectedTip].image}
            title={tips[selectedTip].title}
          />
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/addform/step01`}
            className="bg-[#312783] text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Start Creating Your Listing
          </Link>
        </div>
      </div>
    </main>
  );
}
