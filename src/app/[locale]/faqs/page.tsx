import { Tabs } from "@/app/[locale]/components/ui/tabs/tabs";
import FaqHeader from "@/app/[locale]/components/faqs/faq-header";
import FaqTabs from "@/app/[locale]/components/faqs/faq-tabs";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "FAQs - Frequently Asked Questions | Q8ARZAQ - Your Trusted Ad Platform in Kuwait",
  description:
    "Find answers to the most common questions about Q8ARZAQ. Learn how to post ads, buy and sell products, and make the most of our platform. Get all the information you need today!",
};


export default function FaqsPage() {
  const t = useTranslations("TopNav");
  return (
    <>
      <FaqHeader />
      <main className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">{t("FrequentlyAskedQuestion")}</h2>
          <p className="text-muted-foreground">
          {t("FindAnswers")}
          </p>
        </div>
        <FaqTabs />
      </main>
    </>
  );
}
