import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.get("/", CategoryController.getAllCategory);
router.get("/:id", CategoryController.getCategoryById);
router.patch("/:id", auth(UserRole.ADMIN), CategoryController.updateCategory);
router.post("/", auth(UserRole.ADMIN), CategoryController.createCategory);

export const categoryRouter: Router = router;
