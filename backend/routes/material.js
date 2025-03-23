import express from "express";
import {
  getMaterials,
  addMaterial,
  deleteMaterial,
  updateMaterial,
} from "../controllers/material.js";
const router = express.Router();

router.get("/", getMaterials);
router.post("/", addMaterial);
router.delete("/:id", deleteMaterial);
router.put("/:id", updateMaterial);

export default router;
