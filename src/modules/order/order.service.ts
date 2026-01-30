import { OrderStatus, PaymentMethod } from "../../../generated/prisma/client";
import { OrderWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createOrder = async (userId: string, payload: any) => {
  const { items, shipping_address, total_amount } = payload;

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customerId: userId,
        status: OrderStatus.PLACED,
        payment_method: PaymentMethod.CASH_ON_DELIVERY,
        total_amount,
        shipping_address,
      },
    });

    const orderItemsData = items.map((item: any) => ({
      orderId: order.id,
      medicineId: item.medicineId,
      sellerId: item.sellerId,
      quantity: item.quantity,
      unit_price: item.price,
      sub_total: item.price * item.quantity,
    }));

    await tx.orderItem.createMany({ data: orderItemsData });

    for (const item of items) {
      await tx.medicine.update({
        where: {
          id: item.medicineId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }
    return order;
  });
};

const getMyAllOrder = async (userId: string) => {
  return await prisma.order.findMany({
    where: {
      customerId: userId,
    },
    include: {
      items: {
        include: {
          medicine: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getOrderById = async (orderId: string, userId: string) => {
  return await prisma.order.findUniqueOrThrow({
    where: {
      id: orderId,
      customerId: userId,
    },
    include: {
      items: {
        include: {
          medicine: true,
        },
      },
    },
  });
};

const cancelMyOrder = async (orderId: string, userId: string) => {
  const orderData = await prisma.order.findUniqueOrThrow({
    where: {
      id: orderId,
    },
    select: {
      id: true,
      customerId: true,
      status: true,
    },
  });

  if (orderData.customerId !== userId) {
    throw new Error("You aren't customer of this order!");
  }

  if (orderData.status !== OrderStatus.PLACED) {
    throw new Error("You can't cancel this order!");
  }

  return await prisma.order.update({
    where: {
      id: orderId,
      customerId: userId,
    },
    data: {
      status: OrderStatus.CANCELLED,
    },
  });
};

const getMyMedicinesOrder = async (sellerId: string) => {
  return await prisma.orderItem.findMany({
    where: {
      sellerId,
    },
    include: {
      order: true,
      medicine: true,
    },
  });
};

const updateMyMedicinesOrder = async (
  orderItemId: string,
  status: OrderStatus,
  userId: string,
) => {
  const item = await prisma.orderItem.findUniqueOrThrow({
    where: {
      id: orderItemId,
    },
    select: {
      id: true,
      orderId: true,
      sellerId: true,
    },
  });

  if (item.sellerId !== userId) {
    throw new Error("You aren't seller of this medicine order!");
  }

  return await prisma.order.update({
    where: {
      id: item.orderId,
    },
    data: {
      status,
    },
  });
};

const getAllOrders = async ({
  status,
  categoryId,
  customerId,
  sellerId,
  medicineId,
  manufacturer,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  status: OrderStatus | undefined;
  categoryId: string | undefined;
  customerId: string | undefined;
  sellerId: string | undefined;
  medicineId: string | undefined;
  manufacturer: string | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const conditions: OrderWhereInput[] = [];

  if (status) {
    conditions.push({
      status,
    });
  }

  if (customerId) {
    conditions.push({
      customerId,
    });
  }

  if (medicineId) {
    conditions.push({
      medicineId,
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

  if (manufacturer) {
    conditions.push({
      manufacturer,
    });
  }

  const allOrder = await prisma.order.findMany({
    take: limit,
    skip,
    where: {
      AND: conditions,
    },
    include: {
      customer: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.order.count({
    where: {
      AND: conditions,
    },
  });
  return {
    data: allOrder,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const orderService = {
  createOrder,
  getMyAllOrder,
  getOrderById,
  cancelMyOrder,
  getMyMedicinesOrder,
  updateMyMedicinesOrder,
  getAllOrders,
};
