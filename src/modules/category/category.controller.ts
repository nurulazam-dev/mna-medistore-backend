import { Request, Response } from "express";
import { categoryService } from "./category.service";
import { UserRole } from "../../middleware/auth";

const createCategory = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only admin can  created category!",
      });
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
};

const getAllCategory = async (req: Request, res: Response) => {
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
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("CategoryId is required!");
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
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only admin can access updated category!",
      });
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
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only admin can access deleted category!",
      });
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
};

export const CategoryController = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
