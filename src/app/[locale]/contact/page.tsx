import React from "react";
import Contact from "../components/Contact/Contact";
import { Metadata } from "next";
export const revalidate = 1;
export const metadata: Metadata = {
  title:
    "Contact Us - Get in Touch with Q8ARZAQ | Your Ad Listing Platform in Kuwait",
  description:
    "Have questions or need assistance? Contact Q8ARZAQ today! Our team is here to help you with posting ads, finding products, or anything else related to our platform. Get in touch now!",
};

function page() {
   
  return (
    <>
    <Contact/>
     </>
  );
}

export default page;
