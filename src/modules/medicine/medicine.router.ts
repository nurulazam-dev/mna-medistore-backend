import express, { Router } from "express";
import { MedicineController } from "./medicine.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.get("/", MedicineController.getAllMedicine);
router.get(
  "/my-medicines",
  auth(UserRole.SELLER),
  MedicineController.getMyMedicines,
);
router.get("/:id", MedicineController.getMedicineById);
router.patch("/:id", auth(UserRole.SELLER), MedicineController.updateMedicine);
router.delete("/:id", auth(UserRole.SELLER), MedicineController.deleteMedicine);
router.post("/", auth(UserRole.SELLER), MedicineController.createMedicine);

export const medicineRouter: Router = router;
