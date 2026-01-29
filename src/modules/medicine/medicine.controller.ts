import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { medicineService } from "./medicine.service";
import paginationHelper from "../../helpers/paginationHelper";

const createMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are Unauthorized!",
      });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Your account isn't active!",
      });
    }

    if (user.role !== UserRole.SELLER) {
      return res.status(403).json({
        success: false,
        message: "You don't have access to create Medicine!",
      });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: "You aren't verified Seller!",
      });
    }

    const result = await medicineService.createMedicine(req.body);

    return res.status(201).json({
      success: true,
      message: "Medicine created successfully!",
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

const getAllMedicine = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const searchContent = typeof search === "string" ? search : undefined;

    const isActive = req.query.isActive
      ? req.query.isActive === "true"
        ? true
        : req.query.isActive === "false"
          ? false
          : undefined
      : undefined;

    const sellerId = req.query.sellerId as string | undefined;

    const categoryId = req.query.categoryId as string | undefined;

    const price = req.query.price as number | undefined;

    const stock = Number(req.query.stock) as number | undefined;

    const manufacturer = req.query.manufacturer as string | undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationHelper(
      req.query,
    );

    const result = await medicineService.getAllMedicine({
      search: searchContent,
      isActive,
      sellerId,
      categoryId,
      price,
      stock,
      manufacturer,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });

    return res.status(201).json({
      success: true,
      message: "Medicine fetch successfully!",
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

const getMyMedicines = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("You are unauthorize!");
    }

    const result = await medicineService.getMedicineById(user?.id as string);

    return res.status(201).json({
      success: true,
      message: "Fetching my medicines successfully!",
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

const getMedicineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Medicine Id is required!");
    }
    const result = await medicineService.getMedicineById(id as string);

    return res.status(201).json({
      success: true,
      message: "Get Medicine successfully!",
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

const updateMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("You are unauthorize!");
    }

    const { id } = req.params;
    const isSeller = user.role === UserRole.SELLER;

    if (!isSeller) {
      throw new Error("You have no access to updated!");
    }

    const result = await medicineService.updateMedicine(
      id as string,
      req.body,
      user.id,
    );

    return res.status(201).json({
      success: true,
      message: "Medicine updated successfully!",
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

const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("You are unauthorize!");
    }

    const { id } = req.params;
    const isSeller = user.role === UserRole.SELLER;

    if (!isSeller) {
      throw new Error("You have no access to deleted!");
    }

    const result = await medicineService.deleteMedicine(id as string, user.id);

    return res.status(201).json({
      success: true,
      message: "Medicine deleted successfully!",
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

export const MedicineController = {
  createMedicine,
  getAllMedicine,
  getMyMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
