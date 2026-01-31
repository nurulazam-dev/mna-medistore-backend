import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { OrderController } from "./order.controller";

const router = express.Router();

// createOrder,            //*cus: post a order----- "/"
// getMyAllOrder,          //*cus: get my all orders----- "/my-orders"
// getOrderById,           //*cus: get my order by id(details)------ "/my-orders/:id"
// cancelMyOrder,          //*cus: patch my order(update status => cancel order)---"/my-orders/cancel/:id"
// getMyMedicinesOrder,    //*sel: get my all Medicines orders--- "/seller/my-medicine-orders"
// updateMyMedicinesOrder, //*sel: patch my Medic ord(upd status)---"/seller/update-my-medicine-orders/:id"
// getAllOrders,           //*admin: get all orders------------- "/admin/orders"

router.post("/", auth(UserRole.CUSTOMER), OrderController.createOrder);
router.get(
  "/my-orders",
  auth(UserRole.CUSTOMER),
  OrderController.getMyAllOrder,
);
router.get(
  "/my-orders/:id",
  auth(UserRole.CUSTOMER),
  OrderController.getOrderById,
);
router.patch(
  "/my-orders/cancel/:id",
  auth(UserRole.CUSTOMER),
  OrderController.cancelMyOrder,
);

router.get(
  "/seller/my-medicine-orders",
  auth(UserRole.SELLER),
  OrderController.getMyMedicinesOrder,
);
router.patch(
  "/seller/update-my-medicine-orders/:id",
  auth(UserRole.SELLER),
  OrderController.updateMyMedicinesOrder,
);

router.get("/admin/orders", auth(UserRole.ADMIN), OrderController.getAllOrders);

export const orderRouter: Router = router;
