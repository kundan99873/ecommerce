import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be atleast 3 character"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    contact: {
      type: Number,
      required: [true, "Contact Number is required"],
      minlength: [10, "Contact must have 10 character"],
      maxlength: [10, "Contact must have 10 character"],
    },
    products: [
      {
        product_id: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

const model = mongoose.model.orders || mongoose.model("orders", orderSchema);
export default model;
