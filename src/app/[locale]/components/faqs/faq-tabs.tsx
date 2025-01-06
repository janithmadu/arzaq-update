"use client";

import { Settings2, UserCircle2, CreditCard } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/[locale]/components/ui/tabs/tabs";
import FaqAccordion from "./faq-accordion";
import { useTranslations } from "next-intl";



export default function FaqTabs() {
  const t = useTranslations("TopNav");
  const generalQuestions = [
    {
      question: t("PostAdStep1"),
      answer:
      t("PostAdAnswer"),
    },
    {
      question: t("AdApprovalTime"),
      answer:
      t("AdApprovalAnswer"),
    },
    {
      question: t("EditAd"),
      answer:
      t("EditAdAnswer"),
    },
    {
      question: t("AdDuration"),
      answer:
      t("AdDurationAnswer"),
    },
  ];
  
  const accountQuestions = [
    {
      question: t("CreateAccount"),
      answer:
      t("CreateAccountAnswer"),
    },
    {
      question: t("ResetPassword"),
      answer:
      t("ResetPasswordAnswer"),
    },
    {
      question: t("MultipleAccounts"),
      answer:
      t("MultipleAccountsAnswer"),
    },
  ];
  
  const paymentQuestions = [
    {
      question: t("PaymentMethods"),
      answer:
      t("PaymentMethodsAnswer"),
    },
    {
      question: t("Refund"),
      answer:
      t("RefundAnswer"),
    },
    {
      question: t("HiddenFees"),
      answer:
      t("HiddenFeesAnswer"),
    },
  ];
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 max-w-[600px] mx-auto h-auto gap-4 bg-transparent">
        <TabsTrigger
          value="general"
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Settings2 className="h-4 w-4" />
          {t("General")}
        </TabsTrigger>
        <TabsTrigger
          value="account"
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <UserCircle2 className="h-4 w-4" />
          {t("YourAccount")}
        </TabsTrigger>
        <TabsTrigger
          value="payment"
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <CreditCard className="h-4 w-4" />
          {t("MoneyAndPayment")}
        </TabsTrigger>
      </TabsList>
      <div className="mt-8">
        <TabsContent value="general">
          <FaqAccordion items={generalQuestions} />
        </TabsContent>
        <TabsContent value="account">
          <FaqAccordion items={accountQuestions} />
        </TabsContent>
        <TabsContent value="payment">
          <FaqAccordion items={paymentQuestions} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
