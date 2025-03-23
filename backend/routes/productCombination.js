import express from "express";
import {
  getProductCombinations,
  addProductCombination,
  updateProductCombination,
  deleteProductCombination,
} from "../controllers/productCombination.js";

const router = express.Router();

router.get("/", getProductCombinations);
router.post("/", addProductCombination);
router.put("/:id", updateProductCombination);
router.delete("/:id", deleteProductCombination);

export default router;