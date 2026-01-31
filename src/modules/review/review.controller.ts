import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { reviewService } from "./review.service";
import ApiErrorHandler from "../../helpers/ApiErrorHandler";
import catchAsync from "../../helpers/catchAsync";

const createReview = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }
    if (user.role !== UserRole.CUSTOMER) {
      throw new ApiErrorHandler(403, "You don't have access to create review!");
    }
    if (user.status !== "ACTIVE") {
      throw new ApiErrorHandler(403, "Your account isn't active!");
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
});

export const ReviewController = {
  createReview,
};
