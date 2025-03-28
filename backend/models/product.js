import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
});

export const Product = mongoose.model("Product", productSchema);