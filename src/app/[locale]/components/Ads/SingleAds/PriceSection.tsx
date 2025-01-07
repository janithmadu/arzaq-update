"use client";
import { Heart, Star } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Loading from "@/app/[locale]/loading";

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
  const [NegotiableCheck, setNegotiableCheck] = useState<boolean>(false);
  const [FevoriteCheck, setFevoriteCheck] = useState<boolean>(false);
  const [FevoriteCheckData, setFevoriteCheckData] = useState<any>();
  const [PageLoader, setPageLoader] = useState<string | null>(null);
  const t = useTranslations("TopNav");

  const router = useRouter();

  useEffect(() => {
    setNegotiableCheck(negotiable);
  }, [negotiable]);

  useEffect(() => {
    const CheckFaExsisting = async () => {
      const userIdNew = parseInt(userID);
      if (!userIdNew || !id) return;

      try {
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
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };

    CheckFaExsisting();
  }, [id, userID]);

  const AddTofaverite = async () => {
    setPageLoader("Loading");
    const userIdNew = parseInt(userID);

    if (Number.isNaN(userIdNew)) {
      setPageLoader("Error");
      router.push("/api/auth/login");
      return;
    }

    try {
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
    } catch (error) {
      console.error("Error adding to favorite:", error);
    }
  };

  const RemoveTofaverite = async () => {
    setPageLoader("Loading");
    const userIdNew = parseInt(userID);
    const Fvdata = FevoriteCheckData?.id;

    try {
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
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div>
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
              <button>
                {FevoriteCheck ? (
                  <Heart
                    onClick={RemoveTofaverite}
                    className="text-red-600 cursor-pointer"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Heart
                    onClick={AddTofaverite}
                    className="text-[#6f68a8] cursor-pointer"
                    width={24}
                    height={24}
                  />
                )}
              </button>
            </div>
          </div>
          {NegotiableCheck && (
            <div className="flex gap-x-4 items-center">
              <Star className="text-blue-500" />
              <h1 className="text-grayscale900 text-bodysmall">
                {t("Negotiable")}
              </h1>
            </div>
          )}
        </div>
      </div>
      {PageLoader === "Loading" && <Loading />}
    </div>
  );
};

export default PriceSection;
