"use client";
import React, { useEffect } from "react";
import complete from "../../../../../public/system-regular-31-check-hover-check (1).gif";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  // Change 'page' to 'Page'
  const router = useRouter();

  // useEffect(() => {
  //   const getAds = async () => {
  //     const AdID = localStorage.getItem("AdID");

  //     if (!AdID) {
  //       router.push("/");
  //       return;
  //     }

  //     const response = await fetch("/api/update", {
  //       method: "POST",
  //       body: JSON.stringify({ AdID }),
  //     });
  //     const responses = await response.json();
  //     if (response.status === 401) {
  //       router.push("/");
  //       return;
  //     }

  //     if (responses.status) {
  //       localStorage.removeItem("AdID");
  //     }
  //   };

  //   getAds();
  // }, [router]); // Adding router as a dependency to avoid exhaustive-deps warning

  return (
    <div className="min-w-full min-h-[60dvh] flex justify-center items-center flex-col bg-white" >
      <div className="flex flex-col justify-center items-center shadow-md p-20 rounded-lg gap-y-2 bg-white">
        <Image alt="Check" src={complete} />
        <h1 className="text-bodyxl font-bold">Your Ad has been completed</h1>
        <p>
          Thank you for posting your ad on{" "}
          <span className="text-[#312783] font-bold ">ARZAQ</span>.
        </p>
        <p>Have a great day!</p>
        <Link className="text-bodysmall" href="/">
          Go to home page
        </Link>
      </div>
    </div>
  );
}

export default Page; // Ensure the export matches the component name
