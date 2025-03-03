"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AboutInterface {
  title: string;
  content: string;
  image: string;
  titlear: string;
  contentar: string;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function About() {
  const t = useTranslations("TopNav");
  const [About, setAbout] = useState<AboutInterface[]>([]); // Initialize with undefined
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  useEffect(() => {
    const getAbout = async () => {
      const response = await fetch("/api/about");
      const data = await response.json();
      setAbout(data);
    };
    getAbout();
  }, []);

  return (
    <>
      {/* Hero Header */}
      <div className="relative h-[200px] mb-12">
        <div className="absolute inset-0">
          <Image
            src="/photo-1521737711867-e3b97375f902.jpg"
            alt="Hero background"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative h-full container mx-auto px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44">
          <div className="flex flex-col justify-center items-center h-full text-white space-y-4">
            <h1 className="text-4xl font-bold">{About[0]?.title}</h1>
            <div className="flex items-center gap-2 text-sm"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-12">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              {locale === "en" ? About[0]?.title : About[0]?.titlear}
            </h2>
            <p className="text-muted-foreground whitespace-pre-line text-wrap">
              {locale === "en" ? About[0]?.content : About[0]?.contentar}
            </p>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden bg-muted">
            <Image
              src={About[0]?.image}
              alt="Office team meeting"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* <div className="text-center space-y-12">
          <h2 className="text-3xl font-bold">{t("HowItWorks")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
            <div className="relative p-6 bg-card rounded-xl shadow-sm">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center">
                  <UserPlus className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="text-6xl font-bold text-muted/20">01</div>
                <h3 className="text-xl font-semibold">{t("CreateAccount")}</h3>
                <p className="text-muted-foreground">{t("CreateAccountDescription")}</p>
              </div>
            </div>

            
            <div className="relative p-6 bg-card rounded-xl shadow-sm">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="text-6xl font-bold text-muted/20">02</div>
                <h3 className="text-xl font-semibold">{t("PostAnAd")}</h3>
                <p className="text-muted-foreground">{t("PostAnAdDescription")}</p>
              </div>
            </div>

           
            <div className="relative p-6 bg-card rounded-xl shadow-sm">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="text-6xl font-bold text-muted/20">03</div>
                <h3 className="text-xl font-semibold">{t("StartEarning")}</h3>
                <p className="text-muted-foreground">{t("StartEarningDescription")}</p>
              </div>
            </div>
          </div>
        </div> */}
      </main>
    </>
  );
}

export default About;
