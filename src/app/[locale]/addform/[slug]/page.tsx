import React from "react";

import { getAllCategory } from "../../actions/getCategories";
import UpdateForm from "../../components/Forms/UpdateForm";
import { redirect } from "next/navigation";
import { UpdateAd } from "@/lib/categoryInterface";
import { getAdById } from "../../actions/getAds";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CheckUserLog } from "../../actions/ChekAuth";

const Page = async ({ params }: { params: { slug: string } }) => {

  await CheckUserLog();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const UpdateAdDetails:any = await getAdById(params.slug);

  const GetCategory:any = await getAllCategory();
  return (
    <div>
      <UpdateForm params={Number(params.slug)} categories={GetCategory} />
    </div>
  );
};

export default Page;
