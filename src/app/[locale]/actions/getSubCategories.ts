import { client } from "@/sanity/lib/client";
import { Prisma, PrismaClient } from "@prisma/client";

export const revalidate = 1;

export const getAllSubCategories = async () => {
  const query = `*[_type == "subcategory"]{
    title,
    slug,
    _id,
    "category": category->{
      title,
      slug,
      description,
      "imageUrl": image.asset->url
    },
    "imageUrl": image.asset->url,
    description,
    options[]->{
      title,
      slug,
      values[] {
        en,
        ar
      }
    }
  }`

  const data = await client.fetch(query);

  return data;
};



export const getSubCategoryOptions = async () => {
  const prisma = new PrismaClient();
  const data = await prisma.option.findMany({
    include: {
      optionsubcategory: true, // Include subcategories
      optionvalue: true, // Include option values
    },
  });


  return data;

}

export const getSubCategoriesByID = async (id: string) => {
  const prisma = new PrismaClient();
  const ID = Number(id)
  const result = await prisma.subcategory.findMany({
    where: {
      category_id: 1,
    },
    select: {
      id: true,
      title_en: true,
      title_ar: true,
      slug: true,
      description_en: true,
      description_ar: true,
      image: true,
      categories: {
        select: {
          id: true,
          title_en: true,
          title_ar: true,
          slug: true,
          description_en: true,
          description_ar: true,
          image_url: true,
        },
      },
    },
  });




  const query = `*[_type == "subcategory" && category._ref == $categoryId]{
    _id,
    title,
    slug,
    "category": category->{
      _id,
      title,
      slug,
      description,
      "imageUrl": image.asset->url
    },
    "imageUrl": image.asset->url,
    description,
    options[]->{
      title,
      slug,
      values[] {
        en,
        ar
      }
    }
  }`

  const params = {
    categoryId: id,
  };

  const data = await client.fetch(query, params);

  return data;


};
