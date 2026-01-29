import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { medicineService } from "./medicine.service";

const createMedicine = async (req: Request, res: Response) => {
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
        message: "Only Admin can create Medicine.",
      });
    }

    const result = await medicineService.createMedicine(req.body);

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

/* const getAllMedicine = async (req: Request, res: Response) => {
  try {
    const result = await medicineService.getAllMedicine();

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
}; */

/* const getMedicineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("CategoryId is required!");
    }
    const result = await medicineService.getMedicineById(id as string);

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
}; */

/* const updateMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("You are unauthorize!");
    }

    const { id } = req.params;
    const isAdmin = user.role === UserRole.ADMIN;

    const result = await medicineService.updateMedicine(
      id as string,
      req.body,
      isAdmin,
    );

    return res.status(201).json({
      success: true,
      message: "Category updated successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}; */

/* const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("You are unauthorize!");
    }

    const { id } = req.params;
    const isAdmin = user.role === UserRole.ADMIN;

    const result = await medicineService.deleteMedicine(id as string, isAdmin);

    return res.status(201).json({
      success: true,
      message: "Category deleted successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}; */

export const MedicineController = {
  createMedicine,
  //   getAllMedicine,
  //   getMedicineById,
  //   updateMedicine,
  //   deleteMedicine,
};
