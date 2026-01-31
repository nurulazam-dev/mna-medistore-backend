import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { medicineService } from "./medicine.service";
import paginationHelper from "../../helpers/paginationHelper";
import ApiErrorHandler from "../../helpers/ApiErrorHandler";
import catchAsync from "../../helpers/catchAsync";

const createMedicine = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }
    if (user.role !== UserRole.SELLER) {
      throw new ApiErrorHandler(403, "You don't have access!");
    }
    if (user.status !== "ACTIVE") {
      throw new ApiErrorHandler(403, "Your account isn't active!");
    }

    if (!user.emailVerified) {
      throw new ApiErrorHandler(403, "You aren't verified Seller!");
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
});

const getAllMedicine = catchAsync(async (req: Request, res: Response) => {
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
    const price = Number(req.query.price) as number | undefined;
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
});

const getMyMedicines = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }
    if (user.role !== UserRole.SELLER) {
      throw new ApiErrorHandler(403, "You don't have access!");
    }

    const { search } = req.query;

    const searchContent = typeof search === "string" ? search : undefined;

    const categoryId = req.query.categoryId as string | undefined;

    const isActive = req.query.isActive
      ? req.query.isActive === "true"
      : undefined;

    const price = Number(req.query.price) as number | undefined;

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
});

const getMedicineById = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ApiErrorHandler(404, "Medicine Id is required!");
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
});

const updateMedicine = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }
    if (user.role !== UserRole.SELLER) {
      throw new ApiErrorHandler(403, "You don't have access!");
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
});

const deleteMedicine = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }
    if (user.role !== UserRole.SELLER) {
      throw new ApiErrorHandler(403, "You don't have access!");
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
});

export const MedicineController = {
  createMedicine,
  getAllMedicine,
  getMyMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
