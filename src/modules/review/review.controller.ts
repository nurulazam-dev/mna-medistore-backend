import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";

const createReview = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
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
};

export const reviewController = {
  createReview,
};
