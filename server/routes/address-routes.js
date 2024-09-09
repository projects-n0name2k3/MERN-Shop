import express from "express";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "../controllers/shop/address-controller.js";

const router = express.Router();

router.post("/", addAddress);
router.get("/:userId", fetchAllAddress);
router.delete("/:userId/:addressId", deleteAddress);
router.put("/:userId/:addressId", editAddress);

export default router;
