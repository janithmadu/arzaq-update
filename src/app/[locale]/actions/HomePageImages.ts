import { PrismaClient } from "@prisma/client";

export async function HomePageImages() {
  const prisma = new PrismaClient();
  try {
    const getImages = await prisma.homePage.findMany();

    
    return getImages;
  } catch (error) {
    console.error(error);
  }
}

export async function getDetailSecionImages() {
  const prisma = new PrismaClient();
  try {
    const getImages = await prisma.homePage.findMany({
      where: {
        alt: "tipsection",
      },
    });
    return getImages;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
