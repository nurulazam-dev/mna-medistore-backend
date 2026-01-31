import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { orderService } from "./order.service";
import { OrderStatus } from "../../../generated/prisma/enums";
import paginationHelper from "../../helpers/paginationHelper";
import ApiErrorHandler from "../../helpers/ApiErrorHandler";
import catchAsync from "../../helpers/catchAsync";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  try {
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

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({
      success: false,
      message: err.message || "Order placed fail!",
    });
  }
});

const getMyAllOrder = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }
    if (user.role !== UserRole.CUSTOMER) {
      throw new ApiErrorHandler(403, "You don't have access!");
    }

    const result = await orderService.getMyAllOrder(user.id);

    return res.status(200).json({
      success: true,
      message: "My all orders fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "My all orders fetched fail!",
    });
  }
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }

    const { id } = req.params;
    if (!id) {
      throw new ApiErrorHandler(404, "Order Id is required!");
    }

    const result = await orderService.getOrderById(id as string, user.id);

    return res.status(200).json({
      success: true,
      message: "Get order successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Fail to get order",
    });
  }
});

const cancelMyOrder = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }
    if (user.role !== UserRole.CUSTOMER) {
      throw new ApiErrorHandler(403, "You don't have access!");
    }

    const { id } = req.params;
    const result = await orderService.cancelMyOrder(id as string, user.id);

    return res.status(204).json({
      success: true,
      message: "Order cancelled",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Fail to Order cancelled",
    });
  }
});

const getMyMedicinesOrder = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }
    if (user.role !== UserRole.SELLER) {
      throw new ApiErrorHandler(403, "You don't have access!");
    }

    const result = await orderService.getMyMedicinesOrder(user.id);
    return res.status(200).json({
      success: true,
      message: "Medicines order get successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
});

const updateMyMedicinesOrder = catchAsync(
  async (req: Request, res: Response) => {
    try {
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
      res.status(200).json({
        success: true,
        message: "Order status updated",
        data: result,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(404).json({
        success: false,
        message: err.message || "Order status updated fail",
      });
    }
  },
);

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  try {
    const status = req.query.status as OrderStatus | undefined;
    const sellerId = req.query.sellerId as string | undefined;
    const customerId = req.query.customerId as string | undefined;
    const medicineId = req.query.medicineId as string | undefined;
    const categoryId = req.query.categoryId as string | undefined;
    const manufacturer = req.query.manufacturer as string | undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationHelper(
      req.query,
    );

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

    return res.status(200).json({
      success: true,
      message: "Orders fetch successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Order fetch fail",
    });
  }
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
