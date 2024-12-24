import React from "react";
import MainProfile from "../components/ProfileComponets/MainProfile";
import { GetAdByUser, GetAdByUserPayementFalse } from "../actions/getAds";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import GetFavoritesAds from "../actions/GetFavoritesAds";
import { CheckUserLog } from "../actions/ChekAuth";
import { GetUsers } from "../actions/usersAction";

export const revalidate = 1;

async function page({ searchParams }: any) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    await CheckUserLog();
  }

  const Page = parseInt(searchParams.page);
  const Limit = 5;

  const UserAds = await GetAdByUser(user?.id, Page, Limit);
  const UserAdsPaymentFalse = await GetAdByUserPayementFalse(
    user?.id,
    Page,
    Limit
  );
  const UserFavoriteAds: any = await GetFavoritesAds(user?.id);


  const Users = await GetUsers(user?.id);

  return (
    <div>
      <MainProfile
        UserAds={UserAds}
        UserAdsPaymentfalse={UserAdsPaymentFalse}
        UserFavoriteAds={UserFavoriteAds?.favorites}
        // resultCount={UserAds.resultCount}
        verifiedSeller={Users?.verifiedSeller as boolean}
        member={Users?.member as boolean}
      />
    </div>
  );
}

export default page;
