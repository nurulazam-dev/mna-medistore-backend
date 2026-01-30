import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { medicineService } from "./medicine.service";
import paginationHelper from "../../helpers/paginationHelper";

const createMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.role !== UserRole.SELLER) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only seller can access created medicine!",
      });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Your account isn't active!",
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
    return res.status(400).json({
      success: false,
      message: err.message || "Medicine created fail!",
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

    return res.status(200).json({
      success: true,
      message: "Medicine fetch successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Medicine fetch fail!",
    });
  }
};

const getMyMedicines = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.role !== UserRole.SELLER) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only seller can access own medicines.",
      });
    }

    const { search } = req.query;

    const searchContent = typeof search === "string" ? search : undefined;

    const categoryId = req.query.categoryId as string | undefined;

    const isActive = req.query.isActive
      ? req.query.isActive === "true"
      : undefined;

    const price = req.query.price as number | undefined;

    const stock = Number(req.query.stock) as number | undefined;

    const manufacturer = req.query.manufacturer as string | undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationHelper(
      req.query,
    );

    const result = await medicineService.getMyMedicines({
      sellerId: user.id,
      search: searchContent,
      isActive,
      categoryId,
      stock,
      price,
      manufacturer,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });

    return res.status(200).json({
      success: true,
      message: "My medicines fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "My medicine fetch fail!",
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

    return res.status(200).json({
      success: true,
      message: "Get Medicine successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Get Medicine fail!",
    });
  }
};

const updateMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.role !== UserRole.SELLER) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only seller can updated own medicine!",
      });
    }

    const { id } = req.params;

    const result = await medicineService.updateMedicine(
      id as string,
      req.body,
      user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Medicine updated successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Medicine updated fail!",
    });
  }
};

const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.role !== UserRole.SELLER) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only seller can deleted own medicine!",
      });
    }

    const { id } = req.params;

    const result = await medicineService.deleteMedicine(id as string, user.id);

    return res.status(204).json({
      success: true,
      message: "Medicine deleted successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Medicine deleted fail!",
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
