import express from "express";
import {
  getFilteredProducts,
  getProductDetails,
} from "../controllers/shop/product-controller.js";

const router = express.Router();

router.get("/", getFilteredProducts);
router.get("/:id", getProductDetails);

export default router;
