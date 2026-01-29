import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createCategory = async (data: Category) => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany({
    include: {
      _count: {
        select: { medicines: true },
      },
    },
  });
  return result;
};

const getCategoryById = async (id: string) => {
  const result = await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      medicines: {
        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
          isActive: true,
          seller: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
  return result;
};

const updateCategory = async (id: string, data: Partial<Category>) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  const result = await prisma.category.update({
    where: {
      id: category.id,
    },
    data,
  });
  return result;
};

const deleteCategory = async (id: string) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  return await prisma.category.delete({
    where: {
      id: category.id,
    },
  });
};

export const categoryService = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
