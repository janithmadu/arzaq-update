"use client";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Bell,
  Users,
  Globe,
  Scale,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { useEffect, useState } from "react";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

type PrivacyPolicyType = {
  id: number;
  introductionEn: string;
  introductionAr: string;
  informationEn: string;
  informationAr: string;
  usagePrimaryEn: string;
  usagePrimaryAr: string;
  usageSecondaryEn: string;
  usageSecondaryAr: string;
  dataProtectionEn: string;
  dataProtectionAr: string;
  rightsEn: string;
  rightsAr: string;
  contactEn: string;
  contactAr: string;
  createdAt: string; // ISO 8601 string (e.g., "2025-01-15T05:11:49.414Z")
  updatedAt: string; // ISO 8601 string
};

const PrivacyPolicy = () => {
  const [privacyData, setprivacyData] = useState<
    PrivacyPolicyType | undefined
  >();
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  useEffect(() => {
    const getPrivacyData = async () => {
      const create = await fetch("/api/privacy", {
        method: "GET",
      });
      const data = await create.json();

      setprivacyData(data);
    };

    getPrivacyData();
  }, []);
  const t = useTranslations("TopNav");


  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-3">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Shield className="w-16 h-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            {t("PrivacyPolicy")}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("LastUpdated")}:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Introduction */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              {t("Introduction")}
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {locale == "en"
              ? privacyData?.introductionEn
              : privacyData?.introductionAr}
          </p>
        </section>

        {/* Data Collection */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              {t("InformationWeCollect")}
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {locale == "en"
              ? privacyData?.informationEn
              : privacyData?.informationAr}
          </p>
        </section>

        {/* Data Usage */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col items-start gap-3 mb-4">
            <Lock className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              {t("HowWeUseYourData")}
            </h2>
            <p className="text-gray-600 leading-relaxed flex gap-x-2">
              <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
              <span>
                {locale == "en"
                  ? privacyData?.usagePrimaryEn
                  : privacyData?.usagePrimaryAr}
              </span>
            </p>
            <p className="text-gray-600 leading-relaxed flex gap-x-2">
            <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
              {locale == "en"
                ? privacyData?.usageSecondaryEn
                : privacyData?.usageSecondaryAr}
            </p>
          </div>
        </section>

        {/* Data Protection */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              {t("DataProtection")}
            </h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed">
            {locale == "en"
              ? privacyData?.dataProtectionEn
              : privacyData?.dataProtectionAr}
          </p>
          
          
        </section>

        {/* Your Rights */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              {t("YourRights")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">
                {t("YourRightsText")}:
              </h3>
              <p className="text-gray-600 leading-relaxed">
            {locale == "en"
              ? privacyData?.rightsEn
              : privacyData?.rightsAr}
          </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">
                {t("ContactUs")}
              </h3>
              <p className="text-gray-600 text-sm">
              {locale == "en"
              ? privacyData?.contactEn
              : privacyData?.contactAr}
                
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="w-4 h-4" />
            <span>{t("AvailableInMultipleLanguages")}</span>
          </div>
          <p>
            © {new Date().getFullYear()} Arzaq. {t("Copyright")}.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
