import { PrismaClient } from "@prisma/client";

export const revalidate = 1;

export async function getlimitedCategory() {
  const prisma = new PrismaClient();
  try {
    const categories = await prisma.categories.findMany({
      
      include:{
        subcategory:{
          include:{
            secondcategory:true
          }
        }
      }
    });
    return categories;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getlimitedCategoryFooter() {
  const prisma = new PrismaClient();
  try {
    const categories = await prisma.categories.findMany({
      take: 7,
    });
    return categories;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllCategory() {
  const prisma = new PrismaClient();

  try {
    const categories = await prisma.categories.findMany({
      select: {
        id: true,
        title_en: true,
        title_ar: true,
        slug: true,
        image_url: true,
        price: true,
      },
    });
    return categories;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

export const getCategoryAndSubcategory = async () => {
  const prisma = new PrismaClient();

  try {
    const data = await prisma.categories.findMany({
      include: {
        subcategory: true, // Include the subcategories for each category
      },
    });
    return data;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
