import mongoose from "mongoose";
import { ProductCombination } from "../models/productCombination.js";

export const getProductCombinations = async (req, res) => {
  try {
    const combinations = await ProductCombination.find().populate(
      "product material grades"
    );
    res.send({
      success: true,
      message: "All Product Combination",
      combinations,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Failed to fetch product combinations",
    });
  }
};

export const addProductCombination = async (req, res) => {
  try {
    const {
      product,
      material,
      grades,
      price,
      currency,
      shape,
      length,
      thickness,
    } = req.body;

    const existingCombination = await ProductCombination.findOne({
      product,
      material,
      grades,
    });
    if (existingCombination) {
      return res.send({
        success: false,
        message: "Product combination already exists",
      });
    }

    const newCombination = new ProductCombination({
      product,
      material,
      grades,
      price,
      currency,
      shape,
      length,
      thickness,
    });
    await newCombination.save();

    return res.send({
      success: true,
      message: "Product combination added successfully",
      combination: newCombination,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Failed to add product combination",
    });
  }
};

export const updateProductCombination = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send({
        success: false,
        message: "Invalid product combination ID format",
      });
    }
    const updatedCombination = await ProductCombination.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedCombination) {
      return res.send({
        success: false,
        message: "Product combination not found",
      });
    }

    return res.send({
      success: true,
      message: "Product combination updated successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Failed to update product combination",
    });
  }
};

export const deleteProductCombination = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send({
        success: false,
        message: "Invalid product combination ID format",
      });
    }

    const combination = await ProductCombination.findByIdAndDelete(id);

    if (!combination) {
      return res.send({
        success: false,
        message: "Product combination not found",
      });
    }

    return res.send({
      success: true,
      message: "Product combination deleted successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Failed to delete product combination",
    });
  }
};
