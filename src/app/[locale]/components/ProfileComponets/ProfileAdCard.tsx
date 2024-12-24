"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/app/[locale]/components/badge";
import { Card, CardContent } from "@/app/[locale]/components/Card";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { getElapsedTime } from "../../actions/relativeTime";
import { ArrowClockwise, Trash } from "@phosphor-icons/react/dist/ssr";
import Loading from "../../loading";
import { useTranslations } from "next-intl";
import { PencilSimpleLine } from "@phosphor-icons/react";

export const revalidate = 1;

interface ProductCardProps {
  title: string;
  category: string;
  subcategory?: string;
  price: number;
  image: string;
  timestamp: string;
  id?: string;
  paymentPending?: boolean;
  updateMount?: boolean;
  delteActive?: boolean;
  adprice?: number;
  timedate?:boolean
  state?:string
}
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export function ProfileAdCard({
  title,
  category,
  subcategory,
  price,
  image,
  timestamp,
  id,
  paymentPending,
  updateMount,
  adprice,
  delteActive,
  timedate,
  state
}: ProductCardProps) {
  const [locale, setLocale] = useState("en");
  const [loading, setloading] = useState(true);
  const router = useRouter();
  const t = useTranslations("TopNav");


  const [elapsedTime, setElapsedTime] = useState(getElapsedTime(timestamp));


  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(getElapsedTime(timestamp));
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timestamp]);
  

  

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

 

  const PaymentPendingPay = () => {
    localStorage.setItem("AdID", id as string);
    Swal.fire({
      title: "Action Required: Payment Pending",
      text: `Pay Your Pending Payment of ${adprice} USD`,
      icon: "info",
      confirmButtonText: `Pay ${adprice} USD`,
      allowOutsideClick: false,
      allowEscapeKey: true,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/${locale}/payments`); // Redirect to payments page on confirm
      }
    });
  };

  const DeleteAd = () => {
    Swal.fire({
      title: "Are You Sure You Want to Delete?",
      text: `This action cannot be undone. Do you want to proceed?`,
      icon: "info",
      confirmButtonText: `Yes, Delete`,
      allowOutsideClick: true,
      allowEscapeKey: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setloading(false);
        const getAds = async () => {
          const response = await fetch("/api/delete", {
            method: "POST",
            body: JSON.stringify({ id }),
          });
          const responses = await response.json();
          if (responses.status === 401) {
            router.push("/");
            return;
          }
          if (responses.status == 200) {
            setloading(true);
            Swal.fire({
              title: "Deleting Ad...",
              text: `Your ad will be deleted shortly. Please wait.`,
              icon: "info",
              confirmButtonText: `Close`,
              allowOutsideClick: false,
              allowEscapeKey: true,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        };
        getAds();
      }
    });
  };

  return (
    <div className="relative">
      <div className="min-w-full flex justify-end p-1  gap-x-3">
        {paymentPending ? (
          <button
            type="button"
            className="cursor-pointer bg-danger600 p-[4px] text-bodytiny px-2 rounded-full text-white transition duration-300 ease-in-out hover:bg-danger700 hover:shadow-lg"
            onClick={PaymentPendingPay}
          >
            {t("pandingpayment")}
          </button>
        ) : null}

        {delteActive ? (
          <button
            type="button"
            className="cursor-pointer bg-danger600 p-[7px] rounded-full text-white transition duration-300 ease-in-out hover:bg-danger700 hover:shadow-lg"
            onClick={DeleteAd}
          >
            <Trash />
          </button>
        ) : null}

        {updateMount ? (
           <Link
           href={`${locale ? `/${locale}` : ""}/addform/${id}`}
           className="cursor-pointer bg-warning500 p-[7px] rounded-full text-white transition duration-300 ease-in-out hover:bg-danger700 hover:shadow-lg"
           
         >
           <PencilSimpleLine />
         </Link>
        ) : null}
      </div>

      <Link
        href={`${locale ? `/${locale}` : ""}/ads/${id}`}
        className="block transition-transform hover:-translate-y-1 "
      >
        <Card className="overflow-hidden border-0 shadow-lg ">
          <CardContent className="p-0">
            <div className="flex gap-4 p-4">
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={image || "/"}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 96px) 100vw, 96px"
                />
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between">
                    <div className="max-w-[200px]">
                    <h3 className="font-medium text-gray-900">{title}</h3>
                    </div>
                    {state}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm text-gray-600">{category}</span>
                    {subcategory && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">
                          {subcategory}
                        </span>
                      </>
                    )}
                   
                  </div>
                  
                </div>
                <div className="flex items-center sm:justify-between sm:max-w-[700px] 2xl:min-w-[360px] lg:min-w-[520px] sm:min-w-[360px]  max-w-[600px] gap-x-[10px]">
                  <span className=" text-bodytiny sm:text-lg font-semibold text-[#312783]">
                    Rs {price}
                  </span>
                 {timedate &&  <Badge
                    variant="secondary"
                    className=" text-[0.7rem] sm:text-xs font-normal"
                  >
                    {elapsedTime}
                  </Badge>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
      {!loading ? <Loading /> : <></>}
    </div>
  );
}
