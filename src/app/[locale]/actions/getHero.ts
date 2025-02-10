import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers"; // Correct way to get cookies in server components

const prisma = new PrismaClient(); // Create a singleton instance

export async function getHeroImages() {
  try {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value || "en"; // Correct way to read cookies

    const heroImages = await prisma.hero_image.findMany({
      where: {
        lan: cookieLocale,
      },
    });

    return heroImages;
  } catch (error) {
    console.error("Error fetching hero images:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
