import { client } from "@/sanity/lib/client";
import { Prisma, PrismaClient } from "@prisma/client";

export const revalidate = 1;

export async function getlimitedCategory() {
  const prisma = new PrismaClient();
  const categories = await prisma.categories.findMany({
    take: 7,
  });
  return categories;
}

export async function getlimitedCategoryFooter() {

  const prisma = new PrismaClient();
  const categories = await prisma.categories.findMany({
    take: 7,
  });
  return categories;
}

export async function getAllCategory() {

  const prisma = new PrismaClient();

  const categories = await prisma.categories.findMany({
    select: {
      id:true,
      title_en: true,
      title_ar: true,
      slug: true,
      image_url: true,
      price: true,
    },
  });

  return categories;
}

export const getCategoryAndSubcategory =  async()=>{
  const prisma = new PrismaClient();

  const data = await prisma.categories.findMany({
    include: {
      subcategory: true, // Include the subcategories for each category
    },
  });
return data

}
