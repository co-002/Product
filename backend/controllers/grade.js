import mongoose from "mongoose";
import { Grade } from "../models/grade.js";

export const getGrades = async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json({
      success: true,
      message: "Retreive all grades",
      grades,
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

export const addGrade = async (req, res) => {
  try {
    const { name } = req.body;
    const existingGrade = await Grade.findOne({ name });
    if (existingGrade) {
      return res.send({ success: false, message: "Grade already exists" });
    }
    const newGrade = new Grade({ name });
    await newGrade.save();
    return res.send({
      success: true,
      message: "Grade added successfully",
      grade: newGrade,
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

export const updateGrade = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send({
        success: false,
        message: "Invalid grade ID format",
      });
    }
    const updatedGrade = await Grade.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if(!updatedGrade){
        return res.send({
            success: false,
            message: "Grade not found"
        })
    }
    return res.send({
      success: true,
      message: "Grade updated successfully",
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

export const deleteGrade = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send({ success: false, message: "Invalid grade ID format" });
    }
    const grade = await Grade.findByIdAndDelete(id);
    if(!grade){
        return res.send({
            success: false,
            message: "Grade not found"
        })
    }
    res.json({ success: true, message: "Grade deleted successfully" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};