

import { Metadata } from "next";
import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy";
export const revalidate = 1;

export const metadata: Metadata = {
  title:
    "Privacy Policy - Q8ARZAQ | Protecting Your Data and Privacy in Kuwait",
  description:
    "Read Q8ARZAQ's Privacy Policy to learn how we protect your personal data and ensure your privacy while using our platform. Your security is our top priority.",
};


const Page = () => {


  return (
    <div>
      <PrivacyPolicy/>
        
    </div>
  );
};

export default Page;
