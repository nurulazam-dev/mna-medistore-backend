import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { orderService } from "./order.service";

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
  const user = req.user;

  if (!user) {
    return res.status(403).json({
      success: false,
      message: "You are unauthorize!",
    });
  }

  const result = await orderService.getOrderById(req.params.id, user.id);
  res.status(200).json({
    success: true,
    data: result,
  });
};

const cancelMyOrder = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(403).json({
      success: false,
      message: "You are unauthorize!",
    });
  }
  const result = await orderService.cancelMyOrder(req.params.id, user.id);
  res.status(200).json({
    success: true,
    message: "Order cancelled",
    data: result,
  });
};

const getMyMedicinesOrder = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(403).json({
      success: false,
      message: "You are unauthorize!",
    });
  }
  const result = await orderService.getMyMedicinesOrder(user.id);
  res.status(200).json({
    success: true,
    data: result,
  });
};

const updateMyMedicinesOrder = async (req: Request, res: Response) => {
  const result = await orderService.updateMyMedicinesOrder(
    req.params.id,
    req.body.status,
  );
  res.status(200).json({
    success: true,
    message: "Status updated",
    data: result,
  });
};

export const orderController = {
  createOrder,
  getMyAllOrder,
  getOrderById,
  cancelMyOrder,
  getMyMedicinesOrder,
  updateMyMedicinesOrder,
  // getAllOrders,
};
