import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Name is required"],
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
    Pending: {
      type: Boolean,
      default: false,
    },
    isCancelled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

const model =
  mongoose.model.payment || mongoose.model("payment", paymentSchema);
export default model;
