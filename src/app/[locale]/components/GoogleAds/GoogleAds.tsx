"use client";
import React, { useEffect, useState } from "react";

interface GoogleAds {
  id: number;
  adUnitId: string;
  adCode: string;
}
interface GetAdSectionName {
    adSecName:string
}

function GoogleAds({adSecName}:GetAdSectionName) {
  const [googleAdData, setGoogleAdData] = useState<GoogleAds | null>(null);

  useEffect(() => {
    const getGoogleAds = async () => {
      try {
        const response = await fetch("/api/google-ads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ section: adSecName }), // Adjusted body for clarity
        });

        if (response.ok) {
          const data = await response.json();
          setGoogleAdData(data);
        } else {
          console.error("Failed to fetch Google Ads");
        }
      } catch (error) {
        console.error("Error fetching Google Ads:", error);
      }
    };

    getGoogleAds();
  }, []);

  //   useEffect(() => {
  //     if (googleAdData?.adCode) {
  //       // Re-run ad scripts to ensure they load properly
  //       const scripts = document.querySelectorAll("script");
  //       scripts.forEach((script) => {
  //         const newScript = document.createElement("script");
  //         newScript.async = script.async;
  //         newScript.src = script.src;
  //         newScript.innerHTML = script.innerHTML;
  //         script.replaceWith(newScript);
  //       });
  //     }
  //   }, [googleAdData]);

  return (
    <div className="container mx-auto flex flex-col space-y-[10px] px-2  lg:px-5 xl:px-20 md:px-10 mb-3 mt-3">
      <div className="min-w-full flex justify-center">
      {googleAdData && googleAdData.adCode && (
        <div
          dangerouslySetInnerHTML={{ __html: googleAdData.adCode }}
          suppressHydrationWarning={true}
        />
      )}
      </div>
    </div>
  );
}

export default GoogleAds;
