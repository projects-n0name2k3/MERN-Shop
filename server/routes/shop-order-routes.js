import express from "express";
import {
  capturePayment,
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
} from "../controllers/shop/order-controller.js";

const router = express.Router();

router.post("/", createOrder);
router.post("/capture", capturePayment);
router.get("/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

export default router;
