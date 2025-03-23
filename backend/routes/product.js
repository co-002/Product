import express from "express";
import {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct
} from "../controllers/product.js";
const router = express.Router();

router.post("/", addProduct);
router.get("/", getProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;