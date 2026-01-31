import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { reviewService } from "./review.service";

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
        message: "You don't have access to create review!",
      });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Your account isn't active!",
      });
    }

    const result = await reviewService.createReview(user.id, req.body);

    res.status(201).json({
      success: true,
      message: "Review added successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({
      success: false,
      message: err.message || "Review added fail!",
    });
  }
};

export const ReviewController = {
  createReview,
};
