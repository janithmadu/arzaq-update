import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import "./globals.css";
import Topnavbar from "./components/navbars/Topnavbar";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Fotter from "./components/Fotter/Fotter";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GetUsers } from "./actions/usersAction";
import { FloatingMenu } from "./components/ui/floating-dock";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const revalidate = 1;

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title:
    "Arzaq - Kuwait’s Leading Ad Listing Platform | Buy, Sell, & Advertise Today",
  description:
    "Discover Arzaq, Kuwait’s trusted platform for posting and finding ads. Buy, sell, and advertise products or services effortlessly. Join thousands of users connecting daily on Arzaq for the best deals in Kuwait!",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params; // Destructure inside the function

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const dir = locale === "ar" ? "rtl" : "ltr";
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const getUsers = await GetUsers(user?.id);

  const users = {
    id: getUsers?.id as number,
    email: getUsers?.email ?? "",
    family_name: getUsers?.name ?? "",
    given_name: getUsers?.name ?? "",
    picture: getUsers?.avatarUrl ?? "",
    username: getUsers?.name ?? undefined,
    phone_number: getUsers?.phoneNumber ?? undefined,
  };

  const messages = await getMessages();

  const fontClass = locale === "ar" ? cairo.className : roboto.className;

  return (
    <html lang={locale} dir={dir}>
      <body className={`${fontClass} bg-gray-100`}>
        <div className="bg-white"></div>
        <NextIntlClientProvider messages={messages}>
          <Topnavbar user={users} />
          {children}
          <Fotter />
        </NextIntlClientProvider>
        <FloatingMenu />
        <Toaster />
      </body>
    </html>
  );
}
