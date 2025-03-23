import mongoose from "mongoose";
import { Material } from "../models/material.js";

export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.send({
      success: true,
      message: "All materials",
      materials,
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

export const addMaterial = async (req, res) => {
  try {
    const { name } = req.body;

    const existingMaterial = await Material.findOne({ name });
    if (existingMaterial) {
      return res.send({ success: false, message: "Material already exists" });
    }

    const newMaterial = new Material({ name });
    await newMaterial.save();

    return res.send({
      success: true,
      message: "Material added successfully",
      material: newMaterial,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};

export const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send({
        success: false,
        message: "Invalid material ID format",
      });
    }
    let material = await Material.findById(id);
    if (!material) {
      return res.send({ success: false, message: "Material not found" });
    }
    await Material.findByIdAndDelete(id);
    res.send({ success: true, message: "Material deleted successfully" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

export const updateMaterial = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.send({
          success: false,
          message: "Invalid material ID format",
        });
      }
      let material = await Material.findByIdAndUpdate(id, req.body, {
        new: true
      })
      if (!material) {
        return res.send({ success: false, message: "Material not found" });
      }
      res.send({ success: true, message: "Material updated successfully" });
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  };