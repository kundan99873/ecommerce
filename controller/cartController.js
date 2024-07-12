import Cart from "../model/cart.js";
import Product from "../model/product.js";
import asyncHandler from "../middleware/asyncHandler.js";
import AppError from "../utils/ApiError.js";
import mongoose from "mongoose";

export const addProductToCart = asyncHandler(async (req, res) => {
  if (!req.body.product) {
    throw new AppError(400, "Product Not Found");
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.product)) {
    throw new AppError(400, "Product Not Found");
  }

  const product = await Product.findById(req.body.product);
  if (!product) {
    throw new AppError(400, "Product Not Found");
  }

  let cart = await Cart.findOne({ user: req.User.id });
  if (!cart) {
    cart = new Cart({ user: req.User.id, products: [] });
  }

  if (product.quantity == 0) {
    throw new AppError(400, "Product Not Found");
  }

  const productIndex = cart.products.findIndex(
    (p) => p.product.toString() === req.body.product
  );

  if (productIndex > -1) {
    cart.products[productIndex].quantity += req.body.quantity;
  } else {
    cart.products.push({ product: req.body.product, quantity: 1 });
  }

  if (req.body.quantity < 0) {
    cart.amount -= product.price;
  } else {
    cart.amount += product.price;
  }

  await cart.save();

  const cartData = cart.products.map(async (item) => {
    const product = await Product.findById(item.product);
    return { ...product.toObject(), quantity: item.quantity };
  });

  let data = await Promise.all(cartData);

  res
    .status(200)
    .json({ success: true, message: "Added to Cart Successfully", cart, data });
});

export const removeProductFromCart = asyncHandler(async (req, res) => {
  if (!req.body.product) {
    throw new AppError(400, "Product Not Found");
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.product)) {
    throw new AppError(400, "Product Not Found");
  }
  const cart = await Cart.findOne({ user: req.User.id });
  if (!cart) {
    throw new AppError(400, "Product not found in Cart");
  }

  const product = await Product.findById(req.body.product);
  if (!product) {
    throw new AppError(400, "Product not found");
  }

  const productIndex = cart.products.findIndex(
    (p) => p.product.toString() === req.body.product
  );

  if (productIndex > -1) {
    cart.amount -= cart.products[productIndex].quantity * product.price;
    console.log(cart.products[productIndex].quantity * product.price);
    cart.products.splice(productIndex, 1);

    await cart.save();

    const cartData = cart.products.map(async (item) => {
      const product = await Product.findById(item.product);
      return { ...product.toObject(), quantity: item.quantity };
    });

    let data = await Promise.all(cartData);
    return res
      .status(200)
      .json({ success: "Product removed from cart successfully", cart, data });
  } else {
    throw new AppError(400, "Product not found in Cart");
  }
});

export const removeUserCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.User.id });
  if (!cart) {
    throw new AppError(400, "Cart Not Found");
  }

  await Cart.findByIdAndDelete(cart._id);
  return res.status(200).json({ success: "Cart updated successfully" });
});

export const getCartDetails = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.User.id }).populate(
    "products.product"
  );

  if (!cart) {
    return res
      .status(200)
      .json({ success: true, message: "Your cart is empty", cart: [] });
  }

  const cartData = cart.products.map(async (item) => {
    const product = await Product.findById(item.product);
    return { ...product.toObject(), quantity: item.quantity };
  });

  let data = await Promise.all(cartData);

  return res.status(200).json({ success: true, cart, data });
});
