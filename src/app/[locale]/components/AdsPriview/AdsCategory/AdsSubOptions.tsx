"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter, useSearchParams } from "next/navigation";
import { Option } from "@/lib/categoryInterface";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

interface AdsSubOptionsProps {
  Options: any[];
}

const AdsSubOptions: React.FC<AdsSubOptionsProps> = ({ Options }) => {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Hold selected subcategories based on the query parameters
  const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>([]);

  // Sync checkboxes with the URL query parameters
  useEffect(() => {
    const querySubOptions = searchParams.get("subOptions");
    if (querySubOptions) {
      setSelectedSubOptions(querySubOptions.split(","));
    } else {
      setSelectedSubOptions([]);
    }
  }, [searchParams]);

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale as "en" | "ar"); // Ensure locale is either 'en' or 'ar'
  }, []);

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    optionValue: string
  ) => {
    const isChecked = e.target.checked;
    let updatedSubOptions = [...selectedSubOptions];

    if (isChecked) {
      updatedSubOptions.push(optionValue);
    } else {
      updatedSubOptions = updatedSubOptions.filter((id) => id !== optionValue);
    }

    setSelectedSubOptions(updatedSubOptions);

    // Get existing query parameters and convert them to an object
    const params = new URLSearchParams(window.location.search);

    // Set or update the subOptions parameter
    if (updatedSubOptions.length > 0) {
      params.set("subOptions", updatedSubOptions.join(","));
    } else {
      params.delete("subOptions");
    }

    // Update the URL with all query parameters
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <>
      {Options.map((option, index) => (
        <div key={index}>
          <Accordion type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>
                {locale == "en" ? option.title_ar : option.title_ar}
              </AccordionTrigger>
              <AccordionContent>
                {option.optionvalue.map((value:any) => {
                  const optionValue = value.value_en;
                  return (
                    <ul key={optionValue} className="no-bullets">
                      <li>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={selectedSubOptions.includes(optionValue)}
                            onChange={(e) => handleOptionChange(e, optionValue)}
                          />
                          <span className="ml-2">
                            {locale == "en" ? value.value_en : value.value_ar}
                          </span>
                        </label>
                      </li>
                    </ul>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </>
  );
};

export default AdsSubOptions;
