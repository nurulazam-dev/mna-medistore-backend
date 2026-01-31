import { Request, Response } from "express";
import { categoryService } from "./category.service";
import { UserRole } from "../../middleware/auth";
import ApiErrorHandler from "../../helpers/ApiErrorHandler";
import catchAsync from "../../helpers/catchAsync";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }

    if (user.role !== UserRole.ADMIN) {
      throw new ApiErrorHandler(403, "You don't have access!");
    }

    const result = await categoryService.createCategory(req.body);

    return res.status(201).json({
      success: true,
      message: "Category created successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({
      success: false,
      message: err.message || "Category created fail!",
    });
  }
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await categoryService.getAllCategory();

    return res.status(200).json({
      success: true,
      message: "Category fetch successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Category fetch fail!",
    });
  }
});

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ApiErrorHandler(404, "CategoryId is required!");
    }
    const result = await categoryService.getCategoryById(id as string);

    return res.status(200).json({
      success: true,
      message: "Get Category successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Get Category fail!",
    });
  }
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }

    if (user.role !== UserRole.ADMIN) {
      throw new ApiErrorHandler(403, "You don't have access!");
    }

    const { id } = req.params;

    const result = await categoryService.updateCategory(id as string, req.body);

    return res.status(200).json({
      success: true,
      message: "Category updated successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Category updated fail!",
    });
  }
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }

    if (user.role !== UserRole.ADMIN) {
      throw new ApiErrorHandler(403, "You don't have access!");
    }

    const { id } = req.params;

    const result = await categoryService.deleteCategory(id as string);

    return res.status(204).json({
      success: true,
      message: "Category deleted successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Category deleted fail!",
    });
  }
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
