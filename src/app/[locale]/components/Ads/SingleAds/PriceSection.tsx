"use client";
import { Heart, Star } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Loading from "@/app/[locale]/loading";
import { CheckUserLog } from "@/app/[locale]/actions/ChekAuth";


export const revalidate = 1;

interface Price {
  price: number;
  currency: string;
  negotiable: boolean;
  userID: any;
  id: any;
}

const PriceSection: React.FC<Price> = ({
  price,
  currency,
  negotiable,
  userID,
  id,
}) => {
  const [NegotiableCheck, setNegotiableCheck] = useState<boolean>();
  const [FevoriteCheck, setFevoriteCheck] = useState<boolean>(false);
  const [FevoriteCheckData, setFevoriteCheckData] = useState<any>();
  const [PageLoader, setPageLoader] = useState<string | null>(null);
  const t = useTranslations("TopNav");

  const router = useRouter();

  useEffect(() => {
    if (negotiable) {
      setNegotiableCheck(true);
    } else {
      setNegotiableCheck(false);
    }
  }, [id]);

  useEffect(() => {
    const CheckFaExsisting = async () => {
      const userIdNew = parseInt(userID)
      
      console.log(userIdNew);
      

      const AdExsist = await fetch("/api/updateFaverite/getadsbyfav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIdNew, id }),
      });
      const data = await AdExsist.json()
      setFevoriteCheck(data.status);
      setFevoriteCheckData(data.data);
    };
    CheckFaExsisting();
  }, []);

  const AddTofaverite = async () => {
   
    setPageLoader("Loading");
    const userIdNew = parseInt(userID)

    if (Number.isNaN(userIdNew)) {
      setPageLoader("Error");
      router.push('/api/auth/login');
      
    }
    else {
      const response = await fetch("/api/updateFaverite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIdNew, id }),
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
            window.location.reload();
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
            window.location.reload();
          }
        });
      }
    }


  };

  console.log(FevoriteCheck);
  


  const RemoveTofaverite = async () => {
    setPageLoader("Loading");
    const userIdNew = parseInt(userID)
    const Fvdata = FevoriteCheckData?.id;
    const response = await fetch("/api/updateFaverite", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userIdNew, Fvdata }),
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
          window.location.reload();
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
          window.location.reload();
        }
      });
    }
  };

  return (
    <div className="">
      <div className="min-w-full border-b px-[32px] py-5">
        <div>
          <div className="flex items-center min-h-[72px] justify-between max-w-[322px]">
            <div>
              <h1 className="text-grayscale900 text-[32px]">
                <span>{currency} </span>
                <span>{price}.00</span>
              </h1>
            </div>

            <div className="min-w-[48px] flex items-center justify-center min-h-[48px] rounded-[4px] ">
              {/* Reminder:- Need to Create This after the User Functions  are done */}
              <button>
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
          </div>
          {negotiable && (
            <div className="flex gap-x-4 items-center">
              {" "}
              <Star className="text-blue-500" />
              <h1 className="text-grayscale900 text-bodysmall">
                {t("Negotiable")}
              </h1>
            </div>
          )}
        </div>
      </div>
      <>{PageLoader === "Loading" ? <Loading /> : <></>}</>
    </div>
  );
};

export default PriceSection;
