import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastName: { type: String, required: [true, "Last Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    contact: { type: String, required: [true, "Contact Number is required"] },
    address1: { type: String, required: [true, "Address is required"] },
    address2: { type: String },
    city: { type: String, required: [true, "City is required"] },
    state: { type: String, required: [true, "State is required"] },
    pincode: {
      type: Number,
      required: [true, "Pincode is required"],
      minlength: [6, "PinCode must be 6 character"],
      maxlength: [6, "PinCode must be 6 character"],
    },
    country: { type: String, required: [true, "Country is required"] },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

const model =
  mongoose.model.address || mongoose.model("address", addressSchema);
export default model;
