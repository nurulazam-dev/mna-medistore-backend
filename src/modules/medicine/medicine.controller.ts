import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { medicineService } from "./medicine.service";
import paginationHelper from "../../helpers/paginationHelper";
import ApiErrorHandler from "../../helpers/ApiErrorHandler";
import catchAsync from "../../helpers/catchAsync";
import sendResponse from "../../helpers/sendResponse";

const createMedicine = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }

  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler(403, "Your account isn't active!");
  }

  if (!user.emailVerified) {
    throw new ApiErrorHandler(403, "You aren't verified Seller!");
  }

  const result = await medicineService.createMedicine(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Medicine created successfully!",
    data: result,
  });
});

const getAllMedicine = catchAsync(async (req: Request, res: Response) => {
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

  const { page, limit, skip, sortBy, sortOrder } = paginationHelper(req.query);

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

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Medicine fetch successfully!",
    data: result,
  });
});

const getMyMedicines = catchAsync(async (req: Request, res: Response) => {
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

  const { page, limit, skip, sortBy, sortOrder } = paginationHelper(req.query);

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

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My medicines fetched successfully!",
    data: result,
  });
});

const getMedicineById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiErrorHandler(404, "Medicine Id is required!");
  }

  const result = await medicineService.getMedicineById(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Medicine successfully!",
    data: result,
  });
});

const updateMedicine = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }

  const { id } = req.params;

  const result = await medicineService.updateMedicine(
    id as string,
    req.body,
    user.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Medicine updated successfully!",
    data: result,
  });
});

const deleteMedicine = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiErrorHandler(401, "You are unauthorize!");
  }

  const { id } = req.params;

  const result = await medicineService.deleteMedicine(id as string, user.id);

  sendResponse(res, {
    statusCode: 204,
    success: true,
    message: "Medicine deleted successfully!",
    data: result,
  });
});

export const MedicineController = {
  createMedicine,
  getAllMedicine,
  getMyMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
