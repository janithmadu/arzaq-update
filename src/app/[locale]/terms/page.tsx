import React from 'react';

import { Book, Shield, Scale, MessageSquare, AlertCircle, CheckCircle2, Handshake, BadgeAlert } from 'lucide-react';
import { PageHeader } from '../components/Terms/PageHeader';
import { Section } from '../components/Terms/Section';
import { BulletList } from '../components/Terms/BulletList';
import { Footer } from '../components/Terms/Footer';
import { useTranslations } from 'next-intl';


const Page = () => {
  const t = useTranslations("TopNav");
    return (
        <div>
             <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-3">
        <PageHeader 
          title={t("TermsAndConditions")}
          subtitle={`${t("LastUpdated")}: ${new Date().toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}`}
        />

        <Section icon={Book} title={t("AgreementToTerms")}>
          <p className="text-gray-600 leading-relaxed">
          {t("AgreementText")}
          </p>
        </Section>

        <Section icon={Shield} title={t("IntellectualProperty")}>
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
            {t("IntellectualPropertyText")}
            </p>
            <BulletList items={[
              t("AllContentProperty"),
              t("NoReproductionWithoutPermission"),
              t("TrademarksProtection")
            ]} />
          </div>
        </Section>

        <Section icon={Scale} title={t("UserResponsibilities")}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">{t("ProhibitedActivities")}</h3>
              <BulletList items={[
                t("ViolationOfLaws"),
                t("Impersonation"),
                t("SpreadingMaliciousSoftware"),
                t("InterferingWithSecurity")
              ]} />
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">{t("UserObligations")}</h3>
              <BulletList items={[
                t("MaintainAccurateInformation"),
                t("ProtectAccountCredentials"),
                t("ReportUnauthorizedAccess"),
                t("ComplyWithLaws")
              ]} />
            </div>
          </div>
        </Section>

        <Section icon={AlertCircle} title={t("Disclaimers")}>
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
            <h3 className="font-medium text-gray-900 mb-3">{t("ImportantNotice")}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
            {t("ServiceProvidedAsIs")}
            </p>
          </div>
        </Section>

        <Section icon={Handshake} title={t("ServiceTerms")}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600 mb-3" />
              <h3 className="font-medium text-gray-900 mb-2">{t("AcceptableUse")}</h3>
              <BulletList items={[
                t("FollowCommunityGuidelines"),
                t("RespectOtherUsers"),
                t("UseServicesAsIntended")
              ]} />
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <BadgeAlert className="w-6 h-6 text-red-600 mb-3" />
              <h3 className="font-medium text-gray-900 mb-2">{t("Termination")}</h3>
              <p className="text-gray-600 text-sm">
              {t("TerminationText")}
              </p>
            </div>
          </div>
        </Section>

        <Section icon={MessageSquare} title={t("ContactInformation")}>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <p className="text-gray-600 text-sm">
              {t("ContactUs")}
              <br /><br />
              {t("Email")}: info@q8arzaq.com<br />
              {t("Phone")}: 96597397310+<br />
              {t("Address")}: Arzaq Kuwait jahra
            </p>
          </div>
        </Section>

        <Footer />
      </div>
    </main>
        </div>
    );
}

export default Page;
