import { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are Unauthorized!",
      });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Only Admin can create categories.",
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
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.getAllCategory();

    return res.status(201).json({
      success: true,
      message: "Category fetch successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
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

    return res.status(201).json({
      success: true,
      message: "Get Category successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

export const CategoryController = {
  createCategory,
  getAllCategory,
  getCategoryById,
};
