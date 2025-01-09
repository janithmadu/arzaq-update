"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useTranslations } from "next-intl";

function Map() {
  const MapRef = useRef<HTMLDivElement>(null); // Simplified declaration
  const t = useTranslations("TopNav");

  useEffect(() => {
    const mapInit = async () => {
      try {
        const loader = new Loader({
          apiKey: "AIzaSyDN3XsX4sCLXCrWNikpn_NTb2fY3AmgxMw", // Ensure this API key is valid
          version: "weekly",
        });

        const { Map } = await loader.importLibrary("maps");
        const { Marker } = (await loader.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary;

        const position = {
          lat: 6.866042368324042,
          lng: 80.01313805285554,
        };

        const MapOptions: google.maps.MapOptions = {
          center: position,
          zoom: 12,
          mapId: "My_NEXTJS_MAPID", // Replace with a valid Map ID if using one
        };

        const map = new Map(MapRef.current as HTMLDivElement, MapOptions);

        // Add a marker
        new Marker({
          map: map,
          position: position,
        });
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
      }
    };

    mapInit();
  }, []);

  return (
    <>
      <h1 className="text-grayscale900 text-bodylarge">{t("AdsLocation")}</h1>
      <div
        className="min-w-full min-h-[348px] rounded-[8px]"
        ref={MapRef}
      />
    </>
  );
}

export default Map;
