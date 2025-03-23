import express from "express";
import {
  getGrades,
  addGrade,
  updateGrade,
  deleteGrade,
} from "../controllers/grade.js";

const router = express.Router();

router.get("/", getGrades);
router.post("/", addGrade);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrade);

export default router;
