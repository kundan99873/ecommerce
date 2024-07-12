import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import AppError from "../utils/ApiError.js";
import cloudinary from "cloudinary";
import Category from "../model/catgory.js";
import fs from "fs/promises";

export const addCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;

  if (!name) {
    throw new AppError(401, "Validation error", { name: "Name is required" });
  }
  const category = await Category.findOne({ name });
  if (category) {
    throw new AppError(400, "Category already existed");
  }
  const newCategory = await Category.create({ name });
  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      gravity: "auto",
      height: 300,
      width: 300,
      crop: "auto",
    });
    if (result) {
      newCategory.image.url = result.secure_url;
      newCategory.image.public_id = result.public_id;
      fs.rm(`uploads/${req.file.filename}`);
    }
  }

  await newCategory.save();

  return res.status(200).json({
    success: true,
    message: "Category added succesfully",
  });
});

export const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.find();
  if (!category) {
    throw new AppError(400, "Category Not Found");
  }

  return res.status(200).json({
    success: true,
    category,
  });
});

export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Category Not Found");
  }
  const category = await Category.findById(id);
  if (!category) {
    throw new AppError(400, "Category Not Found");
  }

  return res.status(200).json({
    success: true,
    category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Category Not Found");
  }
  const category = await Category.findById(id);
  if (!category) {
    throw new AppError(400, "Category Not Found");
  }
  const existedCategory = await Category.find({ name: req.body.name });
  if (existedCategory) {
    throw new AppError(400, "Category already existed");
  }

  category.name = req.body.name;
  await category.save();
  return res.status(200).json({
    success: true,
    message: "Category updated successfully",
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Category Not Found");
  }
  const category = await Category.findById(id);
  if (!category) {
    throw new AppError(400, "Category Not Found");
  }
  await Category.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
