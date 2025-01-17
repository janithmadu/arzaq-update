"use client";
import { useTranslations } from "next-intl";
import { BulletList } from "./BulletList";
import { PageHeader } from "./PageHeader";
import { Section } from "./Section";
import {
  Book,
  Shield,
  Scale,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Handshake,
  BadgeAlert,
} from "lucide-react";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";

interface AgreementData {
  agreementEn: string;
  agreementAr: string;
  intellectualPropertyEn: string;
  intellectualPropertyAr: string;
  userResponsibilitiesEn: string;
  userResponsibilitiesAr: string;
  prohibitedActivitiesEn: string;
  prohibitedActivitiesAr: string;
  userObligationsEn: string;
  userObligationsAr: string;
  disclaimersEn: string;
  disclaimersAr: string;
  serviceTermsEn: string;
  serviceTermsAr: string;
  acceptableUseEn: string;
  acceptableUseAr: string;
  terminationEn: string;
  terminationAr: string;
  contactInfoEn: string;
  contactInfoAr: string;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function TermsMain() {
  const t = useTranslations("TopNav");
  const [termsData, settermsData] = useState<AgreementData | undefined>();
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  useEffect(() => {
    const getTermsData = async () => {
      const create = await fetch("/api/terms", {
        method: "GET",
      });
      const data = await create.json();

      settermsData(data);
    };

    getTermsData();
  }, []);

 

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-3">
        <PageHeader
          title={t("TermsAndConditions")}
          subtitle={`${t("LastUpdated")}: ${new Date().toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          )}`}
        />

        <Section icon={Book} title={t("AgreementToTerms")}>
          <p className="text-gray-600 leading-relaxed">
            {locale === "en" ? termsData?.agreementEn : termsData?.agreementAr}
          </p>
        </Section>

        <Section icon={Shield} title={t("IntellectualProperty")}>
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              {locale === "en"
                ? termsData?.intellectualPropertyEn
                : termsData?.intellectualPropertyAr}
            </p>
          </div>
        </Section>

        <Section icon={Scale} title={t("UserResponsibilities")}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">
                {t("ProhibitedActivities")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {locale === "en"
                  ? termsData?.prohibitedActivitiesEn
                  : termsData?.prohibitedActivitiesAr}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">
                {t("UserObligations")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {locale === "en"
                  ? termsData?.userObligationsEn
                  : termsData?.userObligationsAr}
              </p>
            </div>
          </div>
        </Section>

        <Section icon={AlertCircle} title={t("Disclaimers")}>
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
            <h3 className="font-medium text-gray-900 mb-3">
              {t("ImportantNotice")}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {locale === "en"
                ? termsData?.disclaimersEn
                : termsData?.disclaimersAr}
            </p>
          </div>
        </Section>

        <Section icon={Handshake} title={t("ServiceTerms")}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600 mb-3" />
              <h3 className="font-medium text-gray-900 mb-2">
                {t("AcceptableUse")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {locale === "en"
                  ? termsData?.acceptableUseEn
                  : termsData?.acceptableUseAr}
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <BadgeAlert className="w-6 h-6 text-red-600 mb-3" />
              <h3 className="font-medium text-gray-900 mb-2">
                {t("Termination")}
              </h3>
              {locale === "en"
                ? termsData?.terminationEn
                : termsData?.terminationAr}
            </div>
          </div>
        </Section>

        <Section icon={MessageSquare} title={t("ContactInformation")}>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <p className="text-gray-600 text-sm">
              {locale === "en"
                ? termsData?.contactInfoEn
                : termsData?.contactInfoAr}
            </p>
          </div>
        </Section>

        <Footer />
      </div>
    </main>
  );
}

export default TermsMain;
