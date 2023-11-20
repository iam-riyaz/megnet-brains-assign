import mongoose from "mongoose";

const filesSchema = new mongoose.Schema(
  {
    fileName: String,
    src: String,
    mineType: String,
    size: String,
  },
  { timestamps: true }
);

export const Files = mongoose.model("File", filesSchema);
