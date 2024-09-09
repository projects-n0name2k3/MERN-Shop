import express from "express";

import { upload } from "../helpers/cloudinary.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  handleImageUpload,
} from "../controllers/admin/product-controller.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/", getAllProducts);
export default router;
