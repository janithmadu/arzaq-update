import React from "react";
import ClientProfile from "../../components/ProfileComponets/ClientProfile";
import { GetAdByUser } from "../../actions/getAds";
import { GetUsers } from "../../actions/usersAction";

async function page({
  params,
  searchParams,
}: {
  params: { slugs: string };
  searchParams: any;
}) {
  const pram = await params;
  const serchparm = await searchParams
  const Page = parseInt(serchparm.page);
  const Limit = 5;



  
   const Users = await GetUsers(pram.slugs);
   const UserAds = await GetAdByUser(Users?.userexid as string, Page, Limit);

  
  
  const date = new Date(Users?.createdDate as any);
  const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero

  const fulldate = year + "-" + month + "-" + day;
    
  
  return (
    <div>
      <ClientProfile
        createdAt={Users?.createdDate}
        email={Users?.email as string}
        verifiedSeller={Users?.verifiedSeller as boolean}
        member={Users?.member as boolean}
        name={Users?.name as string}
        avatarUrl={Users?.avatarUrl as string}
        UserAds={UserAds}
        
        // ResultCount={UserAds.resultCount }
      />

    
    </div>
  );
}

export default page;
