import { prisma } from "../../lib/prisma";

const createReview = async (userId: string, payload: any) => {
  const { items, shipping_address, total_amount } = payload;

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customerId: userId,
        status: OrderStatus.PLACED,
        payment_method: PaymentMethod.CASH_ON_DELIVERY,
        total_amount: Number(total_amount),
        shipping_address,
      },
    });

    const orderItemsData = [];

    for (const item of items) {
      const medicine = await tx.medicine.findUnique({
        where: {
          id: item.medicineId,
        },
      });

      if (!medicine) {
        throw new Error("Medicine not found!");
      }

      const unitPrice = Number(medicine.price);
      const quantity = Number(item.quantity);
      const availableStock = Number(medicine.stock || 0);

      if (quantity > availableStock) {
        throw new Error(`You can't order more than available stock!`);
      }

      orderItemsData.push({
        orderId: order.id,
        medicineId: item.medicineId,
        sellerId: item.sellerId,
        quantity: quantity,
        unit_price: unitPrice,
        sub_total: unitPrice * quantity,
      });

      await tx.medicine.update({
        where: {
          id: item.medicineId,
        },
        data: {
          stock: {
            decrement: quantity,
          },
        },
      });
    }

    await tx.orderItem.createMany({
      data: orderItemsData,
    });

    return order;
  });
};

export const reviewService = {
  createReview,
};
