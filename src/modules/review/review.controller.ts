import { Request, Response } from "express";
import { reviewService } from "./review.service";
import ApiErrorHandler from "../../helpers/ApiErrorHandler";
import catchAsync from "../../helpers/catchAsync";
import sendResponse from "../../helpers/sendResponse";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }

  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler(403, "Your account isn't active!");
  }

  const result = await reviewService.createReview(user.id, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review added successfully!",
    data: result,
  });
});

export const ReviewController = {
  createReview,
};
