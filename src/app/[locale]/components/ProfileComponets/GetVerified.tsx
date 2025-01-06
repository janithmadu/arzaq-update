"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import ContactImage from "../../../../../public/contact.png";
import { useTranslations } from "next-intl";

function GetVerified() {
  const t = useTranslations("TopNav");
  return (
    <Dialog>
      <DialogTrigger className="bg-[#312783] p-2 text-white text-[16px] rounded-[4px] hover:bg-primary700 hover:shadow-lg">
        {" "}
        {t("GetVerifiedButton")}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("ContactUs")}</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center p-8">
              {/* Image Section */}
              <div className="w-full max-w-md mb-6 flex justify-center items-center">
                {/* Replace with your own image URL */}
                <Image
                  src={ContactImage}
                  alt={t("ContactUs")}
                  className="w-[260px]"
                />
              </div>

              {/* Divider */}
              <hr className="w-full border-gray-300 my-4" />

              {/* Contact Heading */}
              <h2 className="text-xl font-bold text-gray-800">
                {t("ContactUs")}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-center my-4">{t("NeedHelp")}</p>
              <p className="text-gray-600 text-center mb-6">
                {t("VerificationHelp")}
              </p>

              {/* Sub-heading */}
              <h3 className="text-lg font-medium text-gray-800 mt-6">
                {t("ReachUsVia")}
              </h3>

              {/* Contact Methods */}
              <div className="flex flex-col md:flex-row gap-8 mt-6">
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="text-blue-500 text-3xl">📞</div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">
                      {t("CallUs")}
                    </h4>
                    <p className="text-sm text-gray-600">96597397310+</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="text-blue-500 text-3xl">📧</div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">
                      {t("EmailUs")}
                    </h4>
                    <p className="text-sm text-gray-600">info@q8arzaq.com</p>
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default GetVerified;
