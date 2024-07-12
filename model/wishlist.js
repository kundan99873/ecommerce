import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User is required"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: [true, "Product is required"],
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

const model =
  mongoose.model.wishlist || mongoose.model("wishlist", wishlistSchema);
export default model;
