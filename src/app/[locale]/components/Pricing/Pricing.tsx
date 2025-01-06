"use client";
import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { convertToSub } from "@/lib/ConvertToSub";
import Checkout from "@/app/[locale]/components/Pricing/Checkout";
import { redirect } from "next/navigation";
import { PostAd } from "@/lib/categoryInterface";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY not define");
}

const stripePromis = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Pricing = () => {
  const [AdPrice, setAdPrice] = useState<number>(0);
  const [AdDetails, setAdDetails] = useState<PostAd[]>([]);

  useEffect(() => {
    const AdID = localStorage.getItem("AdID");
    if (!AdID) {
      redirect("/");
    }

    const GetAd = async () => {
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ AdID }), // Send the ID in the request body
      });

      const data = await response.json();
      const ID = data.categoryId;


      if (!response) {
        setAdPrice(0);
      } else {
        const response = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ID }), // Send the ID in the request body
        });

        const data = await response.json();
     

        setAdPrice(data.price);
        // setAdDetails(GetAdd);
      }
    };

    GetAd();
  }, []);

  return (
    <div className="min-w-full">
      {AdPrice > 0 ? (
        <Elements
          stripe={stripePromis}
          options={{
            mode: "payment",
            amount: convertToSub(AdPrice),
            currency: "usd",
          }}
        >
          {AdPrice > 0 && <Checkout amount={AdPrice} Ad={AdDetails[0]} />}
        </Elements>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Pricing;
