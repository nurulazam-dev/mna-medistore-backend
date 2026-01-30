import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { orderService } from "./order.service";
import { OrderStatus } from "../../../generated/prisma/enums";
import paginationHelper from "../../helpers/paginationHelper";

const createOrder = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "You are unauthorize!",
      });
    }

    if (user.role !== UserRole.CUSTOMER) {
      return res.status(403).json({
        success: false,
        message: "You don't have access to order!",
      });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Your account isn't active!",
      });
    }

    const result = await orderService.createOrder(user.id, req.body);

    res.status(201).json({
      success: true,
      message: "Order placed!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Order placed fail!",
    });
  }
};

const getMyAllOrder = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "You are unauthorize!",
      });
    }

    if (user.role !== UserRole.CUSTOMER) {
      return res.status(403).json({
        success: false,
        message: "You don't have access to get orders!",
      });
    }
    /* ====================================
            bug: only user get his order
         -----------to fixed here----------
   ======================================== */
    const result = await orderService.getMyAllOrder(user.id);

    return res.status(200).json({
      success: true,
      message: "My all orders fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "My all orders fetched fail!",
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "You are unauthorize!",
      });
    }

    const { id } = req.params;
    if (!id) {
      throw new Error("Order Id is required!");
    }

    const result = await orderService.getOrderById(id as string, user.id);

    return res.status(200).json({
      success: true,
      message: "Get order successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Fail to get order",
    });
  }
};

const cancelMyOrder = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "You are unauthorize!",
      });
    }

    if (user.role !== UserRole.CUSTOMER) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only customer cancel his own order!",
      });
    }

    const { id } = req.params;
    const result = await orderService.cancelMyOrder(id as string, user.id);

    return res.status(200).json({
      success: true,
      message: "Order cancelled",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Fail to Order cancelled",
    });
  }
};

const getMyMedicinesOrder = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "You are unauthorize!",
      });
    }

    if (user.role !== UserRole.SELLER) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only seller can get his own medicine order!",
      });
    }

    const result = await orderService.getMyMedicinesOrder(user.id);
    return res.status(200).json({
      success: true,
      message: "Medicines order get successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

const updateMyMedicinesOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "You are unauthorize!",
      });
    }

    if (user.role !== UserRole.SELLER) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only seller can updated own medicine order!",
      });
    }

    const result = await orderService.updateMyMedicinesOrder(
      id as string,
      req.body.status,
      user.id,
    );
    res.status(201).json({
      success: true,
      message: "Order status updated",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Order status updated fail",
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
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
      return res.status(403).json({
        success: false,
        message: "You are unauthorize!",
      });
    }

    if (user.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only admin can access the orders!",
      });
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

    return res.status(201).json({
      success: true,
      message: "Orders fetch successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Order fetch fail",
    });
  }
};

export const orderController = {
  createOrder,
  getMyAllOrder,
  getOrderById,
  cancelMyOrder,
  getMyMedicinesOrder,
  updateMyMedicinesOrder,
  getAllOrders,
};
