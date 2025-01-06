import { PrismaClient } from "@prisma/client";

const GetFavoritesAds = async (userId: string) => {
  const prisma = new PrismaClient();

  try {
    const favoriteAds = await prisma.users.findUnique({
      where: {
        userexid: userId, // Replace with the actual userexid
      },
      include: {
        favorites: {
          include: {
            postad: {
              include: {
                category: true, // Include details of the category
                subcategory: true, // Include details of the subcategory
                postad_photos: true,
              },
            },
          },
        },
      },
    });

    return favoriteAds;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export default GetFavoritesAds;
