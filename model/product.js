import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minlength: [3, "title must have minimum 3 character"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      lowercase: true,
    },
    color: {
      type: String,
      trim: true,
      lowercase: true,
    },
    size: {
      type: String,
      trim: true,
      uppercase: true,
    },
    ram: {
      type: String,
      trim: true,
      uppercase: true,
    },
    storage: {
      type: String,
      trim: true,
      uppercase: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "No more item available, Out of Stock"],
    },
    rating: [
      {
        type: Number,
      },
    ],
    noOfRatings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        review: {
          type: String,
        },
        rating: {
          type: Number,
        },
      },
    ],
    noOfReviews: {
      type: Number,
      default: 0,
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

const product =
  mongoose.model.product || mongoose.model("product", productSchema);
export default product;
