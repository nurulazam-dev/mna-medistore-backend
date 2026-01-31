import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), UserController.getAllUser);
router.patch(
  "/update-profile",
  auth(UserRole.CUSTOMER, UserRole.SELLER, UserRole.ADMIN),
  UserController.updateProfile,
);
router.patch("/:id", auth(UserRole.ADMIN), UserController.updateUserStatus);

export const userRouter: Router = router;
