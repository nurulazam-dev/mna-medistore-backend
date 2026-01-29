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

const getMyMedicines = async (sellerId: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: sellerId,
    },
    select: {
      medicines: {
        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
          isActive: true,
          manufacturer: true,
          category: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return result.medicines;
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

const updateMedicine = async (
  id: string,
  data: Partial<Medicine>,
  sellerId: string,
) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      sellerId: true,
    },
  });

  if (medicineData.sellerId !== sellerId) {
    throw new Error("You aren't seller of this medicine!");
  }

  const result = await prisma.medicine.update({
    where: {
      id: medicineData.id,
    },
    data,
  });
  return result;
};

const deleteMedicine = async (id: string, sellerId: string) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      sellerId: true,
    },
  });

  if (medicineData.sellerId !== sellerId) {
    throw new Error("You aren't seller of this medicine!");
  }

  return await prisma.medicine.delete({
    where: {
      id: medicineData.id,
    },
  });
};

export const medicineService = {
  createMedicine,
  getAllMedicine,
  getMyMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
