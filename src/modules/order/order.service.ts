import { OrderStatus, PaymentMethod } from "../../../generated/prisma/client";
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
) => {
  const item = await prisma.orderItem.findUniqueOrThrow({
    where: {
      id: orderItemId,
    },
  });
  return await prisma.order.update({
    where: {
      id: item.orderId,
    },
    data: {
      status,
    },
  });
};

const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      customer: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });
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
