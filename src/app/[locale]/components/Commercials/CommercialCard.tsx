import { WhatsappLogo } from "@phosphor-icons/react";
import { Phone } from "lucide-react";
import { CldImage } from "next-cloudinary";
import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Commercial = {
  created_at: Date;
  description: string;
  id: number;
  image: string;
  phone_number: string;
  subcategory_id: number;
  updated_at: Date;
  view_count: number;
  whatsapp_number: string;
};

function CommercialCard(Commercial: Commercial) {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden ">
      {/* Image Section */}
      <div className="w-full">
        <CldImage
          src={Commercial.image}
          alt="Car Rental"
          className="w-full 2xl:h-64 xl:h-96 object-cover"
          width={160}
          height={160}
        />
      </div>

      {/* Buttons Section */}
      <div className="flex justify-evenly items-center p-4 bg-gray-50">
        <AlertDialog>
          <AlertDialogTrigger className="flex items-center justify-center w-16 h-16 bg-[#312783] text-white rounded-full shadow-md">
            <Phone size={20} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Phone Number</AlertDialogTitle>
              <AlertDialogDescription>
                {Commercial.phone_number}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-md">
            <WhatsappLogo size={20} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Whatsapp Number</AlertDialogTitle>
              <AlertDialogDescription>
                {Commercial.whatsapp_number}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default CommercialCard;