import { Product } from "../models/product.js";
import mongoose from "mongoose";

const addProduct = async (req, res) => {
  try {
    const { name } = req.body;
    let product = await Product.findOne({ name });
    if (product) {
      return res.send({
        success: false,
        message: "Product already exist",
      });
    }
    product = new Product({ name });
    await product.save();
    res.send({
      success: true,
      message: "Product addess successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    let products = await Product.find();
    res.send({
      success: true,
      message: "Retrieve all products",
      products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send({
        success: false,
        message: "Invalid ID type",
      });
    }
    let product = await Product.findById(id);
    if (!product) {
      return res.send({
        success: false,
        message: "Product not found",
      });
    }
    await Product.findByIdAndDelete(id);
    res.send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send({
        success: false,
        message: "Invalid Product ID format",
      });
    }
    let product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.send({ success: false, message: "Product not found" });
    }
    res.send({ success: true, message: "Product updated successfully" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

export { addProduct, getProduct, deleteProduct, updateProduct };
