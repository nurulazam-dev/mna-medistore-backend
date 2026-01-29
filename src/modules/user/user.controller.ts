import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { userService } from "./user.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only admin can access users!",
      });
    }
    const result = await userService.getAllUser();

    return res.status(201).json({
      success: true,
      message: "All users fetch successfully!",
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

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only admin can access updated user!",
      });
    }

    const { id } = req.params;

    const result = await userService.updateUserStatus(id as string, req.body);

    return res.status(201).json({
      success: true,
      message: "User updated successfully!",
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

export const UserController = {
  getAllUser,
  updateUserStatus,
};
