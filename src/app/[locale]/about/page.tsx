
import { Metadata } from "next";
import About from "../components/About/About";
export const revalidate = 1;

  

  
export const metadata: Metadata = {
  title:
    "About Q8ARZAQ - Kuwait’s Leading Ad Listing Platform",
  description:
    "Learn about Q8ARZAQ, Kuwait’s trusted platform for connecting buyers and sellers. Discover our mission, vision, and commitment to making ad listing seamless and efficient for everyone in Kuwait.",
};

export default function AboutPage() {

  return (
    <>
      <About/>
    </>
  );
}
