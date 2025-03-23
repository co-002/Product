import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Grade = mongoose.model("Grade", gradeSchema);
