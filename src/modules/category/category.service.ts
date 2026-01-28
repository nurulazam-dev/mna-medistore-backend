import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createCategory = async (data: Category) => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const getCategoryById = async (id: string) => {
  const result = await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};

export const categoryService = {
  createCategory,
  getAllCategory,
  getCategoryById,
};
