"use client";

import { Clock, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
type Contact = {
  id: number;
  EmailTitle: string;
  Email: string;
  EmailText: string;
  PhoneTitle: string;
  Phone: string;
  PhoneTxt: string;
  OfficeHoursTitle: string;
  OpenDaysRange: string;
  OpenDaysTime: string;
  CloseDaysRange: string;
  CloseDaysTime: string;
  MainDes: string;
  MainTitle: string;
  MapLink: string;
  CloseDaysRangeAr: string;
  CloseDaysTimeAr: string;
  EmailTextAr: string;
  EmailTitleAr: string;
  MainDesAr: string;
  MainTitleAr: string;
  OfficeHoursTitleAr: string;
  OpenDaysRangeAr: string;
  OpenDaysTimeAr: string;
  PhoneTitleAr: string;
  PhoneTxtAr: string;
};

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const Contact = () => {
  const t = useTranslations("TopNav");
  const [contactData, setcontactData] = useState<Contact | undefined>();
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/contact");
      if (!response.ok) {
      } else {
        const data = await response.json();
        setcontactData(data);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {/* Hero Header */}
      <div className="relative h-[200px] mb-12">
        <div className="absolute inset-0 bg-[url('/photo-1521737711867-e3b97375f90xcontact.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative h-full container mx-auto px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44">
          <div className="flex flex-col justify-center items-center h-full text-white space-y-4">
            <h1 className="text-4xl font-bold">
              {locale == "en"
                ? contactData?.MainTitle
                : contactData?.MainTitleAr}
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <p className="text-center">
                {locale == "en" ? contactData?.MainDes : contactData?.MainDesAr}
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Email Card */}
          <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">
                {locale == "en"
                  ? contactData?.EmailTitle
                  : contactData?.EmailTitleAr}
              </h2>
            </div>
            <p className="text-muted-foreground mb-2">
              {locale == "en"
                ? contactData?.EmailText
                : contactData?.EmailTextAr}
            </p>
            <a
              href={`mailto:${contactData?.Email}`}
              className="text-primary hover:underline font-medium"
            >
              {locale == "en" ? contactData?.Email : contactData?.Email}
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">
                {locale == "en"
                  ? contactData?.PhoneTitle
                  : contactData?.PhoneTitleAr}
              </h2>
            </div>
            <p className="text-muted-foreground mb-2">
              {locale == "en" ? contactData?.PhoneTxt : contactData?.PhoneTxtAr}
            </p>
            <a
              href={contactData?.Phone}
              className="text-primary hover:underline font-medium"
            >
              {locale == "en" ? contactData?.Phone : contactData?.Phone}
            </a>
          </div>

          {/* Office Hours Card */}
          <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">
                {" "}
                {locale == "en"
                  ? contactData?.OfficeHoursTitle
                  : contactData?.OfficeHoursTitleAr}
              </h2>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                {locale == "en"
                  ? contactData?.OpenDaysRange
                  : contactData?.OpenDaysRangeAr}
              </p>
              <p className="font-medium">
                {locale == "en"
                  ? contactData?.OpenDaysTime
                  : contactData?.OpenDaysTimeAr}
              </p>
              <p className="text-muted-foreground mt-2">
                {locale == "en"
                  ? contactData?.CloseDaysRange
                  : contactData?.CloseDaysRangeAr}
              </p>
              <p className="font-medium">
                {locale == "en"
                  ? contactData?.CloseDaysTime
                  : contactData?.CloseDaysTimeAr}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Full-width Map Section */}
      <div className="w-full h-[400px] mt-12">
        <iframe
          src={contactData?.MapLink}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
