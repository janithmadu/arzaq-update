"ues client";
import React from "react";
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

const Page = () => {
  const t = useTranslations("TopNav");
  return (
    <div>
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
              {t("IntroductionText")}
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
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-2">
                <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                <span>{t("PersonalIdentificationInfo")}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                <span>{t("UsageData")}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                <span>{t("TechnicalData")}</span>
              </li>
            </ul>
          </section>

          {/* Data Usage */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                {t("HowWeUseYourData")}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">
                  {t("PrimaryUses")}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>{t("PrimaryUsesText")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>{t("NotifyingChanges")}</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">
                  {t("SecondaryUses")}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>{t("SecondaryUsesText")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>{t("AnalyzingUsagePatterns")}</span>
                  </li>
                </ul>
              </div>
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
            <p className="text-gray-600 leading-relaxed mb-4">
              {t("DataProtectionText")}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Lock className="w-6 h-6 text-indigo-600 mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">
                  {t("Encryption")}
                </h3>
                <p className="text-sm text-gray-600">{t("EncryptionText")}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Users className="w-6 h-6 text-indigo-600 mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">
                  {t("AccessControl")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("AccessControlText")}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Bell className="w-6 h-6 text-indigo-600 mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">
                  {t("Monitoring")}
                </h3>
                <p className="text-sm text-gray-600">{t("MonitoringText")}</p>
              </div>
            </div>
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
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>{t("AccessYourPersonalData")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>{t("CorrectYourPersonalData")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
                    <span>{t("RequestDeletionOfYourPersonalData")}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">
                  {t("ContactUs")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("ContactUsText")}
                  <br />
                  <br />
                  {t("Email")}: info@q8arzaq.com
                  <br />
                  {t("Phone")}: 96597397310+
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
    </div>
  );
};

export default Page;
