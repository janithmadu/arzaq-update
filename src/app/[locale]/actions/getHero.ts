import { PrismaClient } from "@prisma/client";

export async function getHeroImages() {
  const prisma = new PrismaClient();

  try {
    const heroImages = await prisma.hero_image.findMany();

    return heroImages;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}
