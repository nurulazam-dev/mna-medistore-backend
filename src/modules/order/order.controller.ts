import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { orderService } from "./order.service";
import { OrderStatus } from "../../../generated/prisma/enums";
import paginationHelper from "../../helpers/paginationHelper";
import ApiErrorHandler from "../../helpers/ApiErrorHandler";
import catchAsync from "../../helpers/catchAsync";
import sendResponse from "../../helpers/sendResponse";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }
  if (user.role !== UserRole.CUSTOMER) {
    throw new ApiErrorHandler(403, "You don't have access!");
  }
  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler(403, "Your account isn't active!");
  }

  const result = await orderService.createOrder(user.id, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Order placed successfully!",
    data: result,
  });
});

const getMyAllOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }
  if (user.role !== UserRole.CUSTOMER) {
    throw new ApiErrorHandler(403, "You don't have access!");
  }

  const result = await orderService.getMyAllOrder(user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My all orders fetched successfully!",
    data: result,
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }

  const { id } = req.params;
  if (!id) {
    throw new ApiErrorHandler(404, "Order Id is required!");
  }

  const result = await orderService.getOrderById(id as string, user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get order successfully!",
    data: result,
  });
});

const cancelMyOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }
  if (user.role !== UserRole.CUSTOMER) {
    throw new ApiErrorHandler(403, "You don't have access!");
  }

  const { id } = req.params;
  const result = await orderService.cancelMyOrder(id as string, user.id);

  sendResponse(res, {
    statusCode: 204,
    success: true,
    message: "Order cancelled",
    data: result,
  });
});

const getMyMedicinesOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }
  if (user.role !== UserRole.SELLER) {
    throw new ApiErrorHandler(403, "You don't have access!");
  }

  const result = await orderService.getMyMedicinesOrder(user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Medicines order get successfully!",
    data: result,
  });
});

const updateMyMedicinesOrder = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }
    if (user.role !== UserRole.SELLER) {
      throw new ApiErrorHandler(403, "You don't have access!");
    }

    const result = await orderService.updateMyMedicinesOrder(
      id as string,
      req.body.status,
      user.id,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order status updated",
      data: result,
    });
  },
);

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const status = req.query.status as OrderStatus | undefined;
  const sellerId = req.query.sellerId as string | undefined;
  const customerId = req.query.customerId as string | undefined;
  const medicineId = req.query.medicineId as string | undefined;
  const categoryId = req.query.categoryId as string | undefined;
  const manufacturer = req.query.manufacturer as string | undefined;

  const { page, limit, skip, sortBy, sortOrder } = paginationHelper(req.query);

  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }
  if (user.role !== UserRole.ADMIN) {
    throw new ApiErrorHandler(403, "You don't have access!");
  }

  const result = await orderService.getAllOrders({
    status,
    sellerId,
    medicineId,
    customerId,
    categoryId,
    manufacturer,
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders fetch successfully!",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getMyAllOrder,
  getOrderById,
  cancelMyOrder,
  getMyMedicinesOrder,
  updateMyMedicinesOrder,
  getAllOrders,
};
