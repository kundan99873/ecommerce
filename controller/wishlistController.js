import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import AppError from "../utils/ApiError.js";
import Product from "../model/product.js";
import Wishlist from "../model/wishlist.js";

export const addWishlist = asyncHandler(async (req, res) => {
  const id = req.body.product;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Product Not Found");
  }
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(400, "Product Not Found");
  }

  const wishlist = await Wishlist.findOne({
    $and: [{ user: req.User.id, product: id }],
  });
  if (wishlist) {
    throw new AppError(400, "Product already added in your wishlist");
  }
  await Wishlist.create({
    user: req.User.id,
    product: id,
  });
  res.status(200).json({
    success: true,
    message: "Product added to wishlist",
  });
});

export const removeWishlist = asyncHandler(async (req, res) => {
  const id = req.body.product;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Product Not Found");
  }
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(400, "Product Not Found");
  }
  const wishlist = await Wishlist.findOne({
    $and: [{ user: req.User.id }, { product: product.id }],
  });
  if (!wishlist) {
    throw new AppError(400, "Product Not Found");
  }

  await Wishlist.findByIdAndDelete(wishlist.id);

  res.status(200).json({
    success: true,
    message: "Product removed from wishlist",
  });
});

export const getWishlist = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Product Not Found");
  }
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(400, "Product Not Found");
  }
  const wishlist = await Wishlist.findOne({
    $and: [{ user: req.User.id }, { product: product.id }],
  });

  if (!wishlist) {
    return res.status(200).json({
      success: false,
      message: "Please add the product to your wishlist",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product have already in your wishlist",
  });
});

export const getAllUserWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.find({ user: req.User.id });

  if (!wishlist) {
    throw new AppError(400, "Your Wishlist is empty");
  }

  const wishlistProduct = wishlist.map(async (item) => {
    const product = await Product.findById(item.product);
    return { ...product.toObject() };
  });

  let data = await Promise.all(wishlistProduct);

  res.status(200).json({
    success: true,
    wishlist,
    product: data,
  });
});
