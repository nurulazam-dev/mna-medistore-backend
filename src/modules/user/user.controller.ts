import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { userService } from "./user.service";
import ApiErrorHandler from "../../helpers/ApiErrorHandler";
import catchAsync from "../../helpers/catchAsync";
import sendResponse from "../../helpers/sendResponse";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }
  if (user.role !== UserRole.ADMIN) {
    throw new ApiErrorHandler(403, "You don't have access!");
  }
  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler(403, "Your account isn't active!");
  }

  const result = await userService.getAllUser();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get users successfully!",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }
  if (user.role !== UserRole.ADMIN) {
    throw new ApiErrorHandler(403, "You don't have access!");
  }
  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler(403, "Your account isn't active!");
  }

  const { id } = req.params;

  const result = await userService.updateUserStatus(id as string, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully!",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }

  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler(403, "Your account isn't active!");
  }

  const result = await userService.updateProfile(user?.id as string, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully!",
    data: result,
  });
});

export const UserController = {
  getAllUser,
  updateUserStatus,
  updateProfile,
};
