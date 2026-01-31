import { OrderStatus } from "../../../generated/prisma/enums";
import ApiErrorHandler from "../../helpers/ApiErrorHandler";
import { prisma } from "../../lib/prisma";

const createReview = async (userId: string, payload: any) => {
  const { medicineId, rating, comment } = payload;

  const hasOrdered = await prisma.order.findFirst({
    where: {
      customerId: userId,
      status: OrderStatus.DELIVERED,
      items: {
        some: {
          medicineId,
        },
      },
    },
  });

  if (!hasOrdered) {
    throw new ApiErrorHandler(
      403,
      "You can only review medicine that you have successfully purchased!",
    );
  }

  const result = await prisma.review.create({
    data: {
      medicineId,
      customerId: userId,
      rating: Number(rating),
      comment,
    },
  });

  return result;
};

export const reviewService = {
  createReview,
};
