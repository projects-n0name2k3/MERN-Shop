import express from "express";
import {
  addFavouriteToCart,
  addToFavourite,
  deleteFavouriteItems,
  getFavouriteItems,
  updateFavouriteItems,
} from "../controllers/shop/favourite-controller.js";

const router = express.Router();

router.post("/add", addToFavourite);
router.post("/add-to-bag", addFavouriteToCart);
router.get("/get/:userId", getFavouriteItems);
router.put("/update-cart", updateFavouriteItems);
router.delete("/:userId/:productId", deleteFavouriteItems);

export default router;
