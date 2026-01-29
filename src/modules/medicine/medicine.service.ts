import { Medicine } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMedicine = async (data: Medicine) => {
  const result = await prisma.medicine.create({
    data,
  });
  return result;
};

/* const getAllMedicine = async () => {
  const result = await prisma.category.findMany({
    include: {
      _count: {
        select: { medicines: true },
      },
    },
  });
  return result;
}; */

/* const getMedicineById = async (id: string) => {
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
}; */

/* const updateMedicine = async (
  id: string,
  data: Partial<Category>,
  isAdmin: boolean,
) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!isAdmin) {
    throw new Error("You have no access!");
  }

  const result = await prisma.category.update({
    where: {
      id: category.id,
    },
    data,
  });
  return result;
}; */

/* const deleteMedicine = async (id: string, isAdmin: boolean) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!isAdmin) {
    throw new Error("You have no access!");
  }

  return await prisma.category.delete({
    where: {
      id: category.id,
    },
  });
}; */

export const medicineService = {
  createMedicine,
  //   getAllMedicine,
  //   getMedicineById,
  //   updateMedicine,
  //   deleteMedicine,
};
