import Image from "next/image";
import React from "react";
import Logo from "../../../../../public/fi_search.svg";
import LogoMain from "../../../../../public/logo.png";
import Link from "next/link";
import {
  PlusCircle,
  Usb,
  UserCheck,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";
import CategoryBar from "./CategoryBar";
import CountryChange from "./CountryChange";
export const revalidate = 1;
import { cookies } from "next/headers";
import { useTranslations } from "next-intl";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import UserSetting from "./UserSetting";
import { User } from "@phosphor-icons/react";
import Searchbar from "./Searchbar";

export interface User {
  user: {
    id?: number; // Make this non-optional if you're guaranteed to have an id
    email?: string; // Non-optional
    family_name?: string; // Non-optional
    given_name?: string; // Non-optional
    picture?: string; // Non-optional
    username?: string; // Optional
    phone_number?: string; // Optional
  } | null; // Allow the entire user to be null
}

const Topnavbar: React.FC<User> = ({ user }) => {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const t = useTranslations("TopNav");

  return (
    <div className="bg-white border-b-[#EBEEF7] border">
      <div className="min-w-full flex flex-col justify-start border-b-[#EBEEF7] border bg-white">
        {/* Top Nav Start */}
        <div className=" container mx-auto px-5 lg:px-5 xl:px-20 md:px-5 min-h-[80px] flex md:gap-10 items-center justify-between ">
          {/* Logo */}
          <Link href={`${locale == "en" ? "/en" : "/ar"}`}>
            <Image
              src={LogoMain}
              width={130}
              height={0}
              className=""
              alt="Logo"
            />
          </Link>

          {/* Search Box */}
          <Searchbar searchStyle="hidden sm:inline" />

          {/* Top Nav Button Section */}
          <div className=" flex  space-x-[20px] rtl:gap-[20px]">
          <CountryChange />
            {user?.id ? (
              <UserSetting
                picture={user.picture}
                email={user.email}
                family_name={user.family_name}
                given_name={user.given_name}
                id={user.id}
                phone_number={user.phone_number}
                username={user.username}
              />
            ) : (
              <>
                <button className="hidden md:inline  rounded-[4px]  text-[#312783] text-[16px] font-bold">
                  <LoginLink>{t("SignIn")}</LoginLink>
                </button>

                <button className=" hidden xl:inline rounded-[4px]  text-[#312783] text-[16px] font-bold">
                  <RegisterLink>{t("SignUp")}</RegisterLink>
                </button>

                <button className=" md:hidden rounded-[4px] text-[16px] font-bold">
                  <LoginLink>
                    <UserCircle size={39} className="text-primary500" />
                  </LoginLink>
                </button>
              </>
            )}

            <Link
           
              className=" mainColor hidden p-[6px] lg:min-w-[139px] min-h-[5px] md:flex items-center justify-center  text-grayscalewhite font-bold rounded-full lg:rounded-[4px] transition duration-300 ease-in-out hover:bg-primary700 hover:shadow-lg"
              href={`/${locale}/addform/step01`}
            >
              <div className=" flex space-x-[8px] rtl:gap-[8px]">
                <PlusCircle className="lg:min-w-[24px] min-w-[24px] min-h-[24px] lg:min-h-[24px]" />
                <h1 className="lg:inline-block hidden">{t("PostAds")}</h1>
              </div>
            </Link>
          </div>
        </div>

        <div className="sm:hidden relative min-w-[20px] flex justify-center mb-2 rounded-full px-2  ">
          <Searchbar searchStyle="px-10  min-h-[52px] border-[#312783] border rounded-full" />
        </div>
      </div>
      {/* Top Nav End */}

      <div className="container  mx-auto px-5 lg:px-5 xl:px-20 md:px-5  flex md:gap-10 items-center justify-between">
        <div className="  flex items-center xl:space-x-10">
          <CategoryBar
            CurrentLocal={locale}
            t={t("SelectYourCategory")}
            categorytitle={t("categorytitle")}
          />
          
           <Link className="text-sm font-bold py-3" href={`/${locale}/commercial?slug=all`}>{t("Commercial")}</Link>
        </div>
      </div>
    </div>
  );
};

export default Topnavbar;
