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

export const orderService = {
  createOrder,
  // getMyAllOrder,
  // getOrderById,
  // cancelMyOrder,
  // getMyMedicinesOrder,
  // updateMyMedicinesOrder,
  // getAllOrders,
};
