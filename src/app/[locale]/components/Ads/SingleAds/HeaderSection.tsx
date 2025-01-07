"use client";
import { getElapsedTime } from "@/app/[locale]/actions/relativeTime";
import Loading from "@/app/[locale]/loading";
import { Clock, Eye } from "@phosphor-icons/react/dist/ssr";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface HeaderSectionProps {
  Titile: string;
  CreatedDate: any;
  VerifiedSeller?: boolean;
  Member: boolean;
  ViewCount?: number;
  userID: any;
  id: any;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  Titile,
  CreatedDate,
  VerifiedSeller,
  Member,
  ViewCount,
  userID,
  id,
}) => {
  const [isVerified, setIsVerified] = useState<string>("");
  const [isMember, setIsMember] = useState<string>("");
  const [relativeTime, setRelativeTime] = useState(getElapsedTime(CreatedDate));
  const [favoriteCheck, setFavoriteCheck] = useState<boolean>(false);
  const [favoriteCheckData, setFavoriteCheckData] = useState<any>();
  const [pageLoader, setPageLoader] = useState<string | null>(null);

  const t = useTranslations("TopNav");
  const router = useRouter();

  useEffect(() => {
    const checkExistingFavorite = async () => {
      const userIdNew = parseInt(userID);
      const response = await fetch("/api/updateFaverite/getadsbyfav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIdNew, id }),
      });
      const data = await response.json();

      setFavoriteCheck(data.status);
      setFavoriteCheckData(data.data);
    };
    checkExistingFavorite();
  }, [userID, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTime(getElapsedTime(CreatedDate));
    }, 60000);

    return () => clearInterval(interval);
  }, [CreatedDate]);

  useEffect(() => {
    setIsVerified(VerifiedSeller ? t("VerifiedSeller") : t("NotVerifiedSeller"));
    setIsMember(Member ? t("Member") : t("NotAMember"));
  }, [VerifiedSeller, Member, t]);

  const addToFavorite = async () => {
    setPageLoader("Loading");

    if (!userID) {
      setPageLoader("Error");
      router.push("/api/auth/login");
      return;
    }

    const response = await fetch("/api/updateFaverite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, id }),
    });

    if (response.status === 200) {
      setPageLoader(null);
      Swal.fire({
        title: "Favorite Added!",
        text: "You've favorited this ad!",
        icon: "success",
      }).then(() => setFavoriteCheck(true));
    } else if (response.status === 401) {
      setPageLoader(null);
      Swal.fire({
        title: "Unauthorized",
        text: "Unauthorized access - log in required.",
        icon: "error",
        confirmButtonText: "Log In",
      }).then(() => router.push(`/en/payments`));
    }
  };

  const removeFromFavorite = async () => {
    setPageLoader("Loading");
    const favoriteDataId = favoriteCheckData?.id;

    const response = await fetch("/api/updateFaverite", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, Fvdata: favoriteDataId }),
    });

    if (response.status === 200) {
      setPageLoader(null);
      Swal.fire({
        title: "Favorite Removed!",
        text: "You've removed this ad from favorites.",
        icon: "success",
      }).then(() => setFavoriteCheck(false));
    } else if (response.status === 401) {
      setPageLoader(null);
      Swal.fire({
        title: "Unauthorized",
        text: "Unauthorized access - log in required.",
        icon: "error",
        confirmButtonText: "Log In",
      }).then(() => router.push(`/en/payments`));
    }
  };

  return (
    <div className="flex justify-between items-center pb-4">
      <div className="flex flex-col gap-y-3">
        <div className="flex gap-x-3">
          <div className="px-3 rounded-full bg-danger100 text-danger800 text-sm">
            {isMember}
          </div>
          <div className="px-3 rounded-full bg-success50 text-success800 text-sm">
            {isVerified}
          </div>
          <button className="inline lg:hidden">
            {favoriteCheck ? (
              <Heart
                onClick={removeFromFavorite}
                className="text-red-600 cursor-pointer"
                width={24}
                height={24}
              />
            ) : (
              <Heart
                onClick={addToFavorite}
                className="text-[#6f68a8] cursor-pointer"
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
        <h1 className="text-grayscale900 text-bodylarge lg:text-heading02">
          {Titile}
        </h1>
        <div className="flex gap-x-3 items-center">
          <Clock width={24} height={24} className="text-grayscale500" />
          <h1 className="text-grayscale500 text-bodymedium">{relativeTime}</h1>
          <Eye width={24} height={24} className="text-grayscale500" />
          <h1 className="text-grayscale500 text-bodymedium">
            {ViewCount} {t("Viewed")}
          </h1>
        </div>
      </div>
      {pageLoader === "Loading" && <Loading />}
    </div>
  );
};

export default HeaderSection;
