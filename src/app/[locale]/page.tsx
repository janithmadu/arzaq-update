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
import { getDetailSecionImages, HomePageImages } from "./actions/HomePageImages";
import GoogleAds from "./components/GoogleAds/GoogleAds";

export const revalidate = 1;

interface GetPostD {
  subcategoryId: {
    page: number;
    limit: number;
  };
}


export default async function Home() {
  const HeroImages = await getHeroImages();
  const GetCategory = await getAllCategory();
  const GetHomePageImages:any = await HomePageImages()
  const GetDetailPageImages = await getDetailSecionImages()
  
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
      <section>
        <GoogleAds adSecName="Test 01"/>
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
        <Details image={GetHomePageImages[0]} />
      </section>

      <section>
        <HomePageTipSection tipImages={GetDetailPageImages}/>
      </section>

      {/* Mobile App Section */}
      <section>
        <MobileApp image={GetHomePageImages[6]} image2={GetHomePageImages[7]} image3={GetHomePageImages[8]} />
      </section>

      <section className="mb-3">
        <GoogleAds adSecName="Test 01"/>
      </section>
    </main>
  );
}
