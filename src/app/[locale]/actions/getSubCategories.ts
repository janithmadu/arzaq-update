import { PrismaClient } from "@prisma/client";

export const revalidate = 1;
export const getSubCategoryOptions = async () => {
  const prisma = new PrismaClient();

  try {
    const data = await prisma.option.findMany({
      include: {
        optionsubcategory: true, // Include subcategories
        optionvalue: true, // Include option values
      },
    });
    return data;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
