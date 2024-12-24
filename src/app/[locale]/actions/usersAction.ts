import { client } from "@/lib/sanity";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";
import CheckUserAuth from "./CheckUserAuth";

export const UserRegistration = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const prisma = new PrismaClient();
  const userID = user?.id;
  const UserExsit = await CheckUserAuth(userID);


  if (!userID || !UserExsit) {
 
  } else {
    const email = user.email;
    const name = user.given_name;
    const phoneNumber = "";
    const verifiedSeller = false;
    const member = false;
    const avatarUrl = user.picture;
    const userexid = user.id;

    if (user.id) {
      const existingUser = await prisma.users.findUnique({
        where: { userexid: user.id },
      });

      
      if (existingUser) {
        return null;
      } else {
        const newUser = await prisma.users.create({
          data: {
            email,
            name,
            phoneNumber,
            verifiedSeller: verifiedSeller || false, // Default value if not provided
            member: member || false, // Default value if not provided
            avatarUrl: avatarUrl || "",
            userexid: userexid || "",
          },
        });
      }
    } else {
      return null;
    }
  }
};

export const GetFavoritesOfUsers = async (userId: string, adId: string) => {
  const query = `*[_type == "user" && _id == $userId && favoriteAds[]._ref == $adId] {
    favoriteAds
  }`;

  const params = {
    userId,
    adId,
  };

  try {
    const result = await client.fetch(query, params);

    if (result.length > 0) {
      return true; // Indicate that the ad is a favorite
    } else {
      return false; // Indicate that the ad is not a favorite
    }
  } catch (error) {
    return error; // Return null in case of error
  }
};

export const GetUsers = async (userId: string) => {
  if (!userId) {
    
  } else {
    const prisma = new PrismaClient();

    try {
      const user = await prisma.users.findUnique({
        where: { userexid: userId },
      });

      if (!user) {
     
        return null;
      }

      return user;
    } catch (error) {
     
      throw error;
    }
  }
};
