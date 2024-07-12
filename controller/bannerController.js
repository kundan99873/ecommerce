import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import Banner from "../model/banner.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import AppError from "../utils/ApiError.js";

export const addBanner = asyncHandler(async (req, res) => {
  const banner = new Banner(req.body);

  const validationError = banner.validateSync();
  if (validationError) {
    throw new AppError(400, "Validation error", validationError.errors);
  }

  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "ecommerce",
      gravity: "auto",
      crop: "auto",
    });

    if (result) {
      banner.image.url = result.secure_url;
      banner.image.public_id = result.public_id;
      fs.rm(`uploads/${req.file.filename}`);
    }
  }

  await Banner.create(banner).then(() => {
    return res
      .status(201)
      .json({ success: true, message: "Banner added successfully" });
  });
});

export const getAllBanner = asyncHandler(async (req, res, next) => {
  const banner = await Banner.find();
  if (!banner) {
    throw new AppError(400, "Banner Not Found");
  }

  return res.status(200).json({
    success: true,
    banner,
  });
});

export const getBanner = asyncHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(400, "Banner Not Found");
  }

  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    throw new AppError(400, "Banner Not Found");
  }

  return res.status(200).json({
    success: true,
    banner,
  });
});

export const updateBanner = asyncHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(400, "Banner Not Found");
  }

  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    throw new AppError(400, "Banner Not Found");
  }

  const validationError = banner.validateSync();
  if (validationError) {
    throw new AppError(401, "Validation Error", validationError.errors);
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(banner.image.public_id);
    const result = await cloudinary.v2.uploader.upload(req.image.path, {
      folder: ecommerce,
      gravity: "auto",
      crop: "center",
      height: 720,
      width: 1080,
    });

    if (result) {
      banner.image.url = result.secure_url;
      banner.image.public_id = result.public_id;
      fs.rm(`uploads/${req.file.filename}`);
    }
  }

  await banner.save();
  return res
    .status(200)
    .json({ success: true, message: "Banner has been updates successfully" });
});

export const deleteBanner = asyncHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(400, "Banner Not Found");
  }

  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    throw new AppError(400, "Banner Not Found");
  }

  await Banner.findByIdAndDelete(req.params.id).then(async () => {
    await cloudinary.v2.uploader.destroy(banner.image.public_id);
    return res.status(200).json("Banner deleted successfully");
  });
});
