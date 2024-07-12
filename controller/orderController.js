import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../model/order.js";
import Product from "../model/product.js";
import AppError from "../utils/ApiError.js";

export const newOrder = asyncHandler(async (req, res) => {
  const order = new Order({ ...req.body, user: req.User.id });

  const validationError = order.validateSync();
  if (validationError) {
    throw new AppError(401, "Validation Error", validationError.errors);
  }

  req.body.products.forEach(async (element) => {
    if (!mongoose.Types.ObjectId.isValid(element.product_id)) {
      throw new AppError(400, "Product Not Found");
    }
    const product = await Product.findById(element.product_id);
    if (!product) {
      throw new AppError(400, "Product Not Found");
    }
    product.quantity = product.quantity - element.quantity;
    await product.save();
  });

  await Order.create(order).then(() => {
    return res.json({
      success: true,
      message: "Your order has been placed successfully",
    });
  });
});

export const getOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.User.id }).sort({ createdAt: -1 });
  if (!order) {
    return res
      .status(200)
      .json({ success: true, message: "Order not placed yet!!" });
  }
  const detailedOrders = await Promise.all(
    order.map(async (order) => {
      const detailedProducts = await Promise.all(
        order.products.map(async (product) => {
          const productDetails = await Product.findById(product.product_id)
            .select("title image category price")
            .exec();
          return {
            ...product.toObject(),
            productDetails: productDetails.toObject(),
          };
        })
      );

      return {
        ...order.toObject(),
        products: detailedProducts,
      };
    })
  );

  let product = await Promise.all(detailedOrders);

  return res.status(200).json({ success: true, order: product });
});

export const getAllOrder = asyncHandler(async (req, res) => {
  const query = req.query;
  if (query) {
    const order = await Order.find(query);
    if (order.length == 0) {
      throw new AppError(400, "Order Not Found");
    }
    return res.status(200).json({ success: true, order });
  }
  const order = await Order.find({ user: req.body.user });
  if (!order) {
    throw new AppError(400, "Order Not Found");
  }
  return res.status(200).json({ success: true, order });
});

export const getOrder = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(400, "Order Not Found");
  }
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new AppError(400, "Order Not Found");
  }

  const detailedOrders = await Promise.all(
    order.products.map(async (product) => {
      const productDetails = await Product.findById(product.product_id)
        .select("title image category price rating reviews")
        .exec();
      return {
        ...productDetails.toObject(),
        quantity: product.quantity,
      };
    })
  );
  return res.status(200).json({
    success: true,
    messege: "shh",
    order: { ...order.toObject(), detailedProducts: detailedOrders },
  });
});

export const updateOrder = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(400, "Order Not Found");
  }
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new AppError(400, "Order Not Found");
  }
  await Order.findByIdAndUpdate(order._id, req.body, {
    new: true,
    runValidators: true,
  });
  return res
    .status(200)
    .json({ success: true, message: "Order has been updated successfully" });
});

export const deleteOrder = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(400, "Order Not Found");
  }
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new AppError(400, "Order Not Found");
  }
  await Order.findByIdAndDelete(order._id);

  return res
    .status(200)
    .json({ success: true, message: "Order has been deleted successfully" });
});

export const cancelOrder = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(400, "Order Not Found");
  }
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new AppError(400, "Order Not Found");
  }
  order.status = "cancelled";
  await order.save();
  return res.status(200).json({
    success: true,
    message: "Order has been cancelled successfully",
  });
});
