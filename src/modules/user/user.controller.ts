import { Request, Response } from "express";
import { userService } from "./user.service";
import ApiErrorHandler from "../../helpers/ApiErrorHandler";
import catchAsync from "../../helpers/catchAsync";
import sendResponse from "../../helpers/sendResponse";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }

  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler(403, "Your account isn't active!");
  }

  const query = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as string) || "desc",
    searchTerm: (req.query.searchTerm as string) || "",
  };

  const result = await userService.getAllUser(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get users successfully!",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorized!");
  }

  const userId = req.params.id || user.id;

  if (user.role !== "ADMIN" && user.id !== userId) {
    throw new ApiErrorHandler(403, "You can only view your own profile.");
  }

  const result = await userService.getSingleUser(userId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User fetched successfully!",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
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

const adminUpdateUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }

  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler(403, "Your account isn't active!");
  }

  const { id } = req.params;

  const result = await userService.adminUpdateUser(id as string, req.body);

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
  getSingleUser,
  updateUserStatus,
  updateProfile,
  adminUpdateUser,
};
