import express from "express";
import {
  addToCart,
  deleteCartItems,
  getCartItems,
  updateCartItems,
} from "../controllers/shop/cart-controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", getCartItems);
router.put("/update-cart", updateCartItems);
router.delete("/:userId/:productId", deleteCartItems);

export default router;
