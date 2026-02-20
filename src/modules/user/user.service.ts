import { User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

/* const getAllUser=async()=>{
  const users = await prisma.user.findMany()
  return users
} */

const getAllUser = async (query: {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  searchTerm?: string;
}) => {
  const { page, limit, sortBy, sortOrder, searchTerm } = query;

  const skip = (page - 1) * limit;

  const whereCondition: any = searchTerm
    ? {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { email: { contains: searchTerm, mode: "insensitive" } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,
      take: limit,
      skip,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prisma.user.count({
      where: whereCondition,
    }),
  ]);

  return {
    data: users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      phone: true,
      address: true,
      image: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUserStatus = async (id: string, data: Partial<User>) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      emailVerified: true,
      status: true,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: user.emailVerified,
      status: user.status,
    },
  });
  return result;
};

const adminUpdateUser = async (id: string, data: Partial<User>) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data,
  });
  return result;
};

const updateProfile = async (id: string, data: Partial<User>) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data,
  });
  return result;
};

export const userService = {
  getAllUser,
  getSingleUser,
  updateUserStatus,
  updateProfile,
  adminUpdateUser,
};
