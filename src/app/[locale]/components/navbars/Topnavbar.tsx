import React from "react";
import LogoMain from "../../../../../public/logo.png";
import Link from "next/link";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import CountryChange from "./CountryChange";
export const revalidate = 1;
import { useTranslations } from "next-intl";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import UserSetting from "./UserSetting";
import { User } from "@phosphor-icons/react";
import Searchbar from "./Searchbar";
import Avatart from "../../../../../public/student.png";
import TopNavLogo from "./TopNavLogo";
import AddAds from "./AddAds";
import CategorySection from "./CategorySection";

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
  const t = useTranslations("TopNav");

  const locale = "en";

  return (
    <div className="bg-white border-b-[#EBEEF7] border">
      <div className="min-w-full flex flex-col justify-start border-b-[#EBEEF7] border bg-white">
        <div className=" container mx-auto px-5 lg:px-5 xl:px-20 md:px-5 min-h-[80px] flex md:gap-10 items-center justify-between ">
          <TopNavLogo logo={LogoMain} alt="" />

          <Searchbar searchStyle="hidden sm:inline" />

          <div className=" flex  space-x-[20px] rtl:gap-[20px]">
            <CountryChange />
            {user?.id ? (
              <UserSetting
                picture={Avatart}
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

            <AddAds />
          </div>
        </div>

        <div className="sm:hidden relative min-w-[20px] flex justify-center mb-2 rounded-full px-2  ">
          <Searchbar searchStyle="px-10  min-h-[52px] border-[#312783] border rounded-full" />
        </div>
      </div>

      <div className="container  mx-auto px-5 lg:px-5 xl:px-20 md:px-5  flex md:gap-10 items-center justify-between">
        <div className="  flex items-center xl:space-x-10">
          <CategorySection />

          <Link
            className="text-sm font-bold py-3"
            href={`/${locale}/commercial?slug=all`}
          >
            {t("Commercial")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topnavbar;
