import React from "react";

import { getAllCategory } from "../../actions/getCategories";
import StepOneForm from "../../components/Forms/StepOneForm";

import { CheckUserLog } from "../../actions/ChekAuth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Post Your Ad on Q8ARZAQ - Sell Faster in Kuwait",
  description:
    "Post your ad on Q8ARZAQ, Kuwait’s top platform for buying and selling. Create a listing in minutes and reach thousands of potential buyers across Kuwait. Start advertising today!",
};

async function page() {
  const GetCategory = await getAllCategory();
  
  
  await CheckUserLog();

  return (
    <div >
      <StepOneForm categories={GetCategory} />
    </div>
  );
}

export default page;
