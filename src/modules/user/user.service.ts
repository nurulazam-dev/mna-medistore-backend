import { User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllUser = async () => {
  const result = await prisma.user.findMany();
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
      status,
    },
  });
  return result;
};

/* const updateUser = async (id: string, data: Partial<User>) => {
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
}; */

export const userService = {
  getAllUser,
  updateUserStatus,
};
