"use client";
import { getElapsedTime } from "@/app/[locale]/actions/relativeTime";
import Loading from "@/app/[locale]/loading";
import { Clock, Eye } from "@phosphor-icons/react/dist/ssr";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface HeaderSection {
  Titile: string;
  CreatedDate: any;
  VerifiedSeller?: boolean;
  Member: boolean;
  ViewCount?: number;
  userID: any;
  id: any;
}

const HeaderSection: React.FC<HeaderSection> = ({
  Titile,
  CreatedDate,
  VerifiedSeller,
  Member,
  ViewCount,
  userID,
  id,
}) => {
  const [isVerified, setisVerified] = React.useState<string>();
  const [isMember, setisMember] = React.useState<string>();
  const [relativeTime, setRelativeTime] = useState(getElapsedTime(CreatedDate));
  const [FevoriteCheck, setFevoriteCheck] = useState<boolean>(false);
  const [FevoriteCheckData, setFevoriteCheckData] = useState<any>();
  const [PageLoader, setPageLoader] = useState<string | null>(null);
  const t = useTranslations("TopNav");
  const router = useRouter();
  useEffect(() => {
    const CheckFaExsisting = async () => {
      const userIdNew = parseInt(userID)
      const AdExsist = await fetch("/api/updateFaverite/getadsbyfav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIdNew, id }),
      });
      const data = await AdExsist.json();
 

      setFevoriteCheck(data.status);
      setFevoriteCheckData(data.data);
    };
    CheckFaExsisting();
  },[]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTime(getElapsedTime(CreatedDate));
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [CreatedDate]);

  useEffect(() => {
    if (VerifiedSeller) {
      setisVerified(t("VerifiedSeller"));
    } else {
      setisVerified(t("NotVerifiedSeller"));
    }
    if (Member) {
      setisMember(t("Member"));
    } else {
      setisMember(t("NotAMember"));
    }
  }, [VerifiedSeller, Member]);

  const AddTofaverite = async () => {
    setPageLoader("Loading");

    if (!userID) {
      setPageLoader("Error");
      router.push('/api/auth/login');
      
    }

    const response = await fetch("/api/updateFaverite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, id }),
    });

    if (response.status === 200) {
      setPageLoader("Error");
      Swal.fire({
        title: "Favorite Added!",
        text: `You've Favorited This Ad!`,
        icon: "success",
        allowOutsideClick: true,
        allowEscapeKey: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setFevoriteCheck(true);
        }
      });
    } else if (response.status === 401) {
      setPageLoader("Error");
      Swal.fire({
        title: "Unauthorized",
        text: `Unauthorized Access - Log In Required`,
        icon: "error",
        confirmButtonText: `Log In`,
        allowOutsideClick: true,
        allowEscapeKey: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/en/payments`);
        }
      });
    }
  };

  const RemoveTofaverite = async () => {
    setPageLoader("Loading");
    const Fvdata = FevoriteCheckData?.id;

    const response = await fetch("/api/updateFaverite", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, Fvdata }),
    });

    if (response.status === 200) {
      setPageLoader("Error");
      Swal.fire({
        title: "Favorite Removed!",
        text: `You've Removed From Favorite This Ad!`,
        icon: "success",
        allowOutsideClick: true,
        allowEscapeKey: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setFevoriteCheck(false);
        }
      });
    } else if (response.status === 401) {
      setPageLoader("Error");
      Swal.fire({
        title: "Unauthorized",
        text: `Unauthorized Access - Log In Required`,
        icon: "error",
        confirmButtonText: `Log In`,
        allowOutsideClick: true,
        allowEscapeKey: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/en/payments`);
        }
      });
    }
  };

  return (
    <div className="flex justify-between items-center   pb-4">
      <div className="flex flex-col gap-y-[12px]">
        <div className=" min-w-full md:min-w-[200px] min-h-[24px] flex gap-x-[12px] ">
          {/* <div className=" px-[12px] min-w-[76px] min-h-[24px] rounded-[100px] bg-warning100 flex justify-center items-center text-warning800 text-[13px]">
            Featured
          </div> */}
          <div className="px-[12px] min-w-[76px] min-h-[24px] rounded-[100px] bg-danger100 flex justify-center items-center text-danger800 text-[13px]">
            {isMember}
          </div>
          <div className=" px-[12px] min-w-[76px] min-h-[24px] rounded-[100px] bg-success50 flex justify-center items-center text-success800 text-[13px]">
            {isVerified}
          </div>

          <button className="inline lg:hidden">
            {FevoriteCheck == true ? (
              <>
                <Heart
                  onClick={RemoveTofaverite}
                  className={`${FevoriteCheck == true ? "text-red-600" : "text-[#6f68a8]"} cursor-pointer`}
                  width={24}
                  height={24}
                />
              </>
            ) : (
              <>
                <Heart
                  onClick={AddTofaverite}
                  className={`${FevoriteCheck == false ? " text-[#6f68a8]" : "text-red-600"} cursor-pointer`}
                  width={24}
                  height={24}
                />
              </>
            )}
          </button>
        </div>
        <div className="flex justify-between  ">
          <h1 className="text-grayscale900 text-bodylarge text-start md:text-start  lg:text-heading02">
            {Titile}
          </h1>
        </div>
        <div className="flex  gap-x-3">
          <div className="flex gap-x-[6px] items-center ">
            <Clock width={24} height={24} className="text-grayscale500" />
            <h1 className="text-grayscale500 text-bodytiny  md:text-bodymedium">
              {relativeTime}
            </h1>
          </div>

          <div className="flex gap-x-[6px] items-center ">
            <Eye width={24} height={24} className="text-grayscale500" />
            <h1 className="text-grayscale500 text-bodytiny  md:text-bodymedium">
              {ViewCount} {t("Viewed")}
            </h1>
          </div>
        </div>
      </div>
      <>{PageLoader === "Loading" ? <Loading /> : <></>}</>
    </div>
  );
};

export default HeaderSection;
