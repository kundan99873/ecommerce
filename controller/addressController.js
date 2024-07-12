import Address from "../model/address.js";
import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import AppError from "../utils/ApiError.js";

export const addAddress = asyncHandler(async (req, res) => {
  const newAddress = new Address({ ...req.body, user: req.User.id });

  const validationError = newAddress.validateSync();
  if (validationError) {
    throw new AppError(401, "Validation Error", validationError.errors);
  }
  await Address.create(newAddress);
  return res.status(201).json({
    success: true,
    message: "Address added successfully!!",
  });
});

export const getAddress = asyncHandler(async (req, res) => {
  const address = await Address.find({ user: req.User.id }).select("-user");

  if (address.length == 0) {
    return res.status(201).json({
      success: true,
      message: "No address Added",
    });
  }
  return res.status(201).json({
    success: true,
    address,
  });
});

export const getAddressById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(401, "Address Not Found");
  }
  const address = await Address.findById(req.params.id).select("-user");

  if (!address) {
    throw new AppError(401, "Address Not Found");
  }
  return res.status(200).json({
    success: true,
    address,
  });
});

export const deleteAddress = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(401, "Address Not Found");
  }
  const address = await Address.findById(req.params.id);

  if (!address) {
    throw new AppError(401, "Address Not Found");
  }
  await Address.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Address deleted successfully!!!",
  });
});

export const updateAddress = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(401, "Address Not Found");
  }
  const address = await Address.findById(req.params.id);

  if (!address) {
    throw new AppError(401, "Address Not Found");
  }

  await Address.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    message: "Address updated successfully",
  });
});
