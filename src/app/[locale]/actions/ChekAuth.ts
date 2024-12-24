import {
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import CheckUserAuth from "./CheckUserAuth";

export const CheckUserLog = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userID = user?.id;
  const checkUserExsist = await CheckUserAuth(userID)
 
  
  if (!isUserAuthenticated || checkUserExsist?.errors) {
    redirect("/api/auth/login");
  }
};
