import mongoose from "mongoose";

const productCombinationSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  material: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  grades: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Grade", required: true },
  ],
  price: { type: Number, default: 0 },
  currency: { type: String, default: "INR" },
  shape: { type: String },
  length: { type: Number },
  thickness: { type: Number },
});

export const ProductCombination = mongoose.model(
  "ProductCombination",
  productCombinationSchema
);
