import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), UserController.getAllUser);

router.get(
  "/:id",
  auth(UserRole.CUSTOMER, UserRole.SELLER, UserRole.ADMIN),
  UserController.getSingleUser,
);

router.patch(
  "/update-profile",
  auth(UserRole.CUSTOMER, UserRole.SELLER, UserRole.ADMIN),
  UserController.updateProfile,
);

router.patch("/:id", auth(UserRole.ADMIN), UserController.updateUserStatus);

router.patch(
  "/update/:id",
  auth(UserRole.ADMIN),
  UserController.adminUpdateUser,
);

export const userRouter: Router = router;
