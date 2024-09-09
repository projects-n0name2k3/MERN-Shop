import express from "express";
import {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "../controllers/admin/order-controller.js";

const router = express.Router();

router.get("/", getAllOrdersOfAllUsers);
router.get("/:id", getOrderDetailsForAdmin);
router.put("/:id", updateOrderStatus);

export default router;
