import { Request, Response } from "express";
import { categoryService } from "./category.service";
import { UserRole } from "../../middleware/auth";
import ApiErrorHandler from "../../helpers/ApiErrorHandler";
import catchAsync from "../../helpers/catchAsync";
import sendResponse from "../../helpers/sendResponse";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }

  if (user.role !== UserRole.ADMIN) {
    throw new ApiErrorHandler(403, "You don't have access!");
  }

  const result = await categoryService.createCategory(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category created successfully!",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategory();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category fetch successfully!",
    data: result,
  });
});

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiErrorHandler(404, "CategoryId is required!");
  }
  const result = await categoryService.getCategoryById(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Category successfully!",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }

  if (user.role !== UserRole.ADMIN) {
    throw new ApiErrorHandler(403, "You don't have access!");
  }

  const { id } = req.params;

  const result = await categoryService.updateCategory(id as string, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category updated successfully!",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }

  if (user.role !== UserRole.ADMIN) {
    throw new ApiErrorHandler(403, "You don't have access!");
  }

  const { id } = req.params;

  const result = await categoryService.deleteCategory(id as string);

  sendResponse(res, {
    statusCode: 204,
    success: true,
    message: "Category deleted successfully!",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
