import { Medicine } from "../../../generated/prisma/client";
import { MedicineWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createMedicine = async (data: Medicine) => {
  const result = await prisma.medicine.create({
    data,
  });
  return result;
};

const getAllMedicine = async ({
  search,
  isActive,
  sellerId,
  categoryId,
  price,
  stock,
  manufacturer,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  search: string | undefined;
  isActive: boolean | undefined;
  sellerId: string | undefined;
  categoryId: string | undefined;
  price: number | undefined;
  stock: number | undefined;
  manufacturer: string | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const conditions: MedicineWhereInput[] = [];

  if (search) {
    conditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          manufacturer: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (isActive) {
    conditions.push({
      isActive,
    });
  }

  if (sellerId) {
    conditions.push({
      sellerId,
    });
  }
  if (categoryId) {
    conditions.push({
      categoryId,
    });
  }
  if (price) {
    conditions.push({
      price,
    });
  }

  if (stock) {
    conditions.push({
      stock,
    });
  }

  if (manufacturer) {
    conditions.push({
      manufacturer,
    });
  }

  const allMedicine = await prisma.medicine.findMany({
    take: limit,
    skip,
    where: {
      AND: conditions,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.medicine.count({
    where: {
      AND: conditions,
    },
  });
  return {
    data: allMedicine,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getMedicineById = async (id: string) => {
  const result = await prisma.medicine.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      seller: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return result;
};

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
  getAllMedicine,
  getMedicineById,
  //   updateMedicine,
  //   deleteMedicine,
};
