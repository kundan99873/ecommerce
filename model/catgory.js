import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      lowercase: true,
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

const Category =
  mongoose.model.categories || mongoose.model("categories", categorySchema);

export default Category;
