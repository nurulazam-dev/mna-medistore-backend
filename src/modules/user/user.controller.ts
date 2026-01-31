import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { userService } from "./user.service";
import ApiErrorHandler from "../../helpers/ApiErrorHandler";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }
    if (user.role !== UserRole.ADMIN) {
      throw new ApiErrorHandler(403, "You don't have access!");
    }
    if (user.status !== "ACTIVE") {
      throw new ApiErrorHandler(403, "Your account isn't active!");
    }

    const result = await userService.getAllUser();

    return res.status(200).json({
      success: true,
      message: "Get users successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Get users fail!",
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }
    if (user.role !== UserRole.ADMIN) {
      throw new ApiErrorHandler(403, "You don't have access!");
    }
    if (user.status !== "ACTIVE") {
      throw new ApiErrorHandler(403, "Your account isn't active!");
    }

    const { id } = req.params;

    const result = await userService.updateUserStatus(id as string, req.body);

    return res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "User updated fail!",
    });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiErrorHandler(401, "You are unauthorize!");
    }

    if (user.status !== "ACTIVE") {
      throw new ApiErrorHandler(403, "Your account isn't active!");
    }

    const result = await userService.updateProfile(
      user?.id as string,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: err.message || "Profile updated fail!",
    });
  }
};

export const UserController = {
  getAllUser,
  updateUserStatus,
  updateProfile,
};
