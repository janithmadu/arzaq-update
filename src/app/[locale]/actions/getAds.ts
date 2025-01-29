import { PrismaClient } from "@prisma/client";

export interface Params {
  subcategoryId: {
    category?: string;
    subcategories?: string;
    subOptions?: string;
    minPrice?: number;
    maxPrice?: number;
    page: number;
    limit: number;
    resultcount?: number;
  };
}

export interface Result {
  result: any; // Adjust the type based on your actual data structure
  resultCount: number; // Change this to match the property name used in the return object
}

export async function getPostAds(data: Params): Promise<Result> {
  const prisma = new PrismaClient();
  const result = await prisma.postad.findMany({
    where: {
      payment: true, // Filter ads by payment status
    },
    include: {
      postad_features: true, // Include features
      postad_options: true, // Include options
      postad_photos: true, // Include photos
      category: true, // Include category
      subcategory: true,
    },
    orderBy: {
      updatedAt: "desc", // Order by the most recently updated
    },
    take: 10, // Limit the results to 4 ads
  });

  const resultCount = result.length;

 
  

  return {
    result,
    resultCount, // Ensure this uses camel case
  };
}

export async function getAdById(id: string) {
  const prisma = new PrismaClient();

  try {
    if (!id) {
      return { error: "id is required" };
    }

    const result = await prisma.postad.findUnique({
      where: {
        id: Number(id), // Replace adId with the actual ad ID you're querying
      },
      include: {
        category: true,
        subcategory: true,
        postad_features: true,
        postad_options: true,
        postad_photos: true,
        ad_views: true,
        user: {
          // Include the related user based on userId
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            verifiedSeller: true,
            member: true,
            avatarUrl: true,
            userexid: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function GetAdByUser(userID: string, page: number, Limit: number) {
  const prisma = new PrismaClient();

  try {
    const ads = await prisma.postad.findMany({
      where: {
        user: {
          userexid: userID,
        },
        payment: true,
      },
      skip: (page - 1) * Limit,
      take: Limit,
      include: {
        postad_features: true,
        postad_options: true,
        postad_photos: true,
        category: true,
        subcategory: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const resultCount = await prisma.postad.count({
      where: {
        payment: true, // Filter ads by userId
      },
    });
    return {
      resultCount,
      ads,
    };
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function GetAdByUserPayementFalse(
  userID: string,
  page: number,
  Limit: number
) {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.postad.findMany({
      where: {
        user: {
          userexid: userID,
        },
        payment: false, // Filter ads by userId
      },
      skip: (page - 1) * Limit,
      take: Limit,
      include: {
        postad_features: true, // Include features
        postad_options: true, // Include options
        postad_photos: true, // Include photos
        category: true,
        subcategory: true,
      },
    });

    const resultCount = await prisma.postad.count({
      where: {
        payment: false, // Filter ads by userId
      },
    });
    return result;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function GetAdByCategory(cateid: any) {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.postad.findMany({
      where: {
        categoryId: cateid, // Filter by categoryId
      },
      include: {
        category: true, // Optional: Include category details
        subcategory: true, // Optional: Include subcategory details
        user: true, // Optional: Include user details
        postad_photos: true, // Optional: Include photos
        postad_features: true, // Optional: Include features
        postad_options: true, // Optional: Include options
      },
    });

    return result;
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }

 
}
