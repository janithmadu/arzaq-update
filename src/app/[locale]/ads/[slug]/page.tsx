import HeaderSection from "../../components/Ads/SingleAds/HeaderSection";
import ImageGallery from "../../components/Ads/SingleAds/ImageGallery";
import ContactSection from "../../components/Ads/SingleAds/ContactSection";
import SellerInfo from "../../components/Ads/SingleAds/SellerInfo";
import DescriptionAds from "../../components/Ads/SingleAds/DescriptionAds";
import { getAdById } from "../../actions/getAds";
import PriceSection from "../../components/Ads/SingleAds/PriceSection";
import ProductOverwiew from "../../components/Ads/SingleAds/ProductOverwiew";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { GetUsers } from "../../actions/usersAction";
import { Metadata } from "next";

// Type for params in dynamic route
interface AdDetailsPageParams {
  params: {
    slug: string;
  };
}

// Dynamically generate metadata for the page
export async function generateMetadata({  params }: AdDetailsPageParams): Promise<Metadata> {
  const parm = await params
  const GetAdByID: any = await getAdById( parm?.slug);


  const adTitle = GetAdByID?.adName || "Ad Details"; // Default title if adName is unavailable
  const description =
    GetAdByID?.description ||
    "Explore this ad on Q8ARZAQ. Discover amazing deals and connect with sellers in Kuwait.";

  return {
    title: `${adTitle} - Q8ARZAQ | Buy & Sell in Kuwait`,
    description,
  };
}

// Main Page Component
export default async function AdDetailsPage({ params }: AdDetailsPageParams) {
  const parm = await params
  const GetAdByID: any = await getAdById(parm.slug);

  const adTitile = GetAdByID?.adName;
  const AddCratedDate = GetAdByID?.createdAt;
  const Price = GetAdByID?.price;
  const currency = GetAdByID?.currency;
  const Options = GetAdByID?.postad_options;
  const Description = GetAdByID?.description;
  const UserName = GetAdByID?.user?.name;
  const UserEmail = GetAdByID?.user.email;
  const UserAvatar = GetAdByID?.user.avatarUrl;
  const PhoneNumber = GetAdByID?.phoneNumber;
  const Features = GetAdByID?.postad_features;
  const Negotiable = GetAdByID?.negotiable;
  const Model = GetAdByID?.model;
  const Condition = GetAdByID?.condition;
  const Brand = GetAdByID?.brand;
  const Authenticity = GetAdByID?.authenticity;
  const State = GetAdByID?.state;
  const VerifiedSeller = GetAdByID?.user.verifiedSeller;
  const Member = GetAdByID?.user.member;
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const UserID = user?.id;
  const AdID = GetAdByID?.id;
  const ViewCount = GetAdByID?.ad_views;
  const CuUserID = await GetUsers(user?.id);

  return (
    <div className="min-w-full min-h-full bg-white">
      <div className="container mx-auto px-5 rtl:gap-20 lg:px-5 xl:px-20 md:px-10 flex space-x-6 flex-col lg:flex-row">
        <div className="flex-1 lg:min-w-[572px] mb-10 xl:min-w-[672px] 2xl:min-w-[872px] flex flex-col gap-x-[36px] mt-3">
          <HeaderSection
            Titile={adTitile as string}
            CreatedDate={AddCratedDate}
            VerifiedSeller={VerifiedSeller}
            Member={Member as any}
            userID={CuUserID?.id}
            id={AdID as number}
            ViewCount={ViewCount?.[0]?.viewCount || 0}
          />

          <ImageGallery images={GetAdByID?.postad_photos} />

          <DescriptionAds
            Options={Options}
            description={Description as string}
            Features={Features}
            price={Price as any}
            currency={currency as string}
            negotiable={Negotiable as boolean}
            UserID={UserID as string}
            id={AdID as number}
            model={Model as string}
            state={State as string}
            condition={Condition as string}
            brand={Brand as string}
            authenticity={Authenticity as string}
            PhoneNumber={PhoneNumber}
            name={UserName as string}
            email={UserEmail as string}
            UserAvatar={UserAvatar}
            ClientUserID={GetAdByID?.user?.userexid}
            verifiedSeller={VerifiedSeller as boolean}
            member={Member as any}
          />
        </div>

        <div className="flex-1 min-w-[424px] hidden lg:inline">
          <div className="w-[424px] border py-[36px] rounded-[12px]">
            <PriceSection
              price={Price as any}
              currency={currency as string}
              negotiable={Negotiable as boolean}
              userID={CuUserID?.id}
              id={AdID as number}
            />
            <ProductOverwiew
              model={Model as string}
              state={State as string}
              condition={Condition as string}
              brand={Brand as string}
              authenticity={Authenticity as string}
            />
            <div className="px-[32px] mt-[32px]">
              <ContactSection
                email={UserEmail as string}
                PhoneNumber={PhoneNumber as string}
              />
            </div>

            <div className="mt-[32px]">
              <div className="px-[32px] border-t border-b mt-[32px] py-[32px]">
                <SellerInfo
                  name={UserName as string}
                  email={UserEmail as string}
                  UserAvatar={UserAvatar as string}
                  UserID={GetAdByID?.user?.userexid}
                  member={Member as any}
                  VerifiedSeller={VerifiedSeller as boolean}
                />
              </div>
            </div>
          
          </div>
          
        </div>
        
      </div>
    
    </div>
  );
}
