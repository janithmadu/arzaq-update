import { Hero } from "./components/Hero/Hero";
import { getHeroImages } from "./actions/getHero";
import HomeCategory from "./components/Category/HomeCategory";
import { getAllCategory } from "./actions/getCategories";
import HomePageAdds from "./components/Ads/HomePageAdds";
import { getPostAds } from "./actions/getAds";
import Details from "./components/Details/Details";
import MobileApp from "./components/MobileApp/MobileApp";
import { UserRegistration } from "./actions/usersAction";
import HomePagecard from "./components/HomePagecard/HomePagecard";
import HomePageTipSection from "./components/HomePageTipSection/HomePageTipSection";
import { Metadata } from "next";

export const revalidate = 1;

export const metadata: Metadata = {
  title:
    "Q8ARZAQ - Kuwait’s #1 Ad Listing Platform | Buy, Sell, and Advertise Now",
  description:
    "Welcome to Q8ARZAQ, Kuwait’s premier ad listing platform. Easily post ads, buy, sell, and advertise products or services. Explore thousands of listings and connect with buyers and sellers across Kuwait!",
};

interface GetPostD {
  subcategoryId: {
    page: number;
    limit: number;
  };
}

export default async function Home() {
  const HeroImages = await getHeroImages();
  const GetCategory = await getAllCategory();
  await UserRegistration();

  const GetPostData: GetPostD = {
    subcategoryId: {
      page: 1,
      limit: 4,
    },
  };

  const getPost = await getPostAds(GetPostData);

  return (
    <main className="flex flex-col space-y-[40px]">
      {/* Hero Section */}
      <section>
        <Hero HeroImages={HeroImages} />
      </section>
      {/* Category Section */}
      <section>
        <HomeCategory getCategory={GetCategory} />
      </section>

      {/* Fresh recommended ads Section */}
      <section>
        <HomePageAdds Ads={getPost.result} />
      </section>

      <section>
        <HomePagecard />
      </section>

      {/* Details Section */}
      <section>
        <Details />
      </section>

      <section>
        <HomePageTipSection />
      </section>

      {/* Mobile App Section */}
      <section>
        <MobileApp />
      </section>
    </main>
  );
}
