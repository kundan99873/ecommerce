import mongoose from "mongoose";
import Product from "../model/product.js";
import User from "../model/user.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import asyncHandler from "../middleware/asyncHandler.js";
import AppError from "../utils/ApiError.js";

export const addProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product(req.body);

  const validationError = newProduct.validateSync();
  if (validationError) {
    throw new AppError(400, "Validation error", validationError.errors);
  }

  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      gravity: "auto",
      crop: "auto",
    });
    if (result) {
      newProduct.image.url = result.secure_url;
      newProduct.image.public_id = result.public_id;
      fs.rm(`uploads/${req.file.filename}`);
    }
  }

  await Product.create(newProduct)
    .then(() => {
      return res.status(201).json({
        success: true,
        message: "Product added successfully",
      });
    })
    .catch((err) => {
      return res.status(401).json({
        success: false,
        message: err.message,
      });
    });
});

export const getAllProduct = asyncHandler(async (req, res, next) => {
  const query = req.query;
  if (Object.keys(query).length !== 0) {
    if (query.maxprice) {
      query.price = { $lte: query.maxprice };
      delete query.maxprice;
    }
    if (query.minprice) {
      query.price = { $gte: query.minprice };
      delete query.minprice;
    }
    const product = await Product.find(query);
    if (product.length == 0) {
      throw new AppError(400, "Product Not Found");
    }
    return res.status(200).json({
      success: true,
      products: product,
    });
  }
  const products = await Product.find();

  if (!products) {
    throw new AppError(400, "Product Not Found");
  }
  return res.status(200).json({
    success: true,
    products,
  });
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const query = req.query;
  if (Object.keys(query).length !== 0) {
    if (query.maxprice) {
      query.price = { $lte: query.maxprice };
      delete query.maxprice;
    }
    if (query.minprice) {
      query.price = { $gte: query.minprice };
      delete query.minprice;
    }
    const products = await Product.find(query);
    if (products.length == 0) {
      throw new AppError(401, "Product Not Found");
    }
    let product = {};

    products.forEach((item) => {
      if (item.color && item.quantity > 0) {
        if (product[item.title]) {
          if (!product[item.title].color.includes(item.color))
            product[item.title].color.push(item.color);
          if (item.size) {
            if (!product[item.title].size.includes(item.size)) {
              product[item.title].size.push(item.size);
            }
          }
        } else {
          product[item.title] = JSON.parse(JSON.stringify(item));
          product[item.title].color = [item.color];
          if (item.size) {
            product[item.title].size = [item.size];
          }
        }
      } else {
        product[item.title] = JSON.parse(JSON.stringify(item));
      }
    });

    return res.status(200).json({
      success: true,
      product,
    });
  }
  const products = await Product.find();

  if (!products) {
    throw new AppError(400, "Product Not Found");
  }
  let product = {};

  products.forEach((item) => {
    if (item.color && item.quantity > 0) {
      if (product[item.title]) {
        if (!product[item.title].color.includes(item.color))
          product[item.title].color.push(item.color);
        if (item.size) {
          if (!product[item.title].size.includes(item.size)) {
            product[item.title].size.push(item.size);
          }
        }
      } else {
        product[item.title] = JSON.parse(JSON.stringify(item));
        product[item.title].color = [item.color];
        if (item.size) {
          product[item.title].size = [item.size];
        }
      }
    } else {
      product[item.title] = JSON.parse(JSON.stringify(item));
    }
  });

  let data = [];
  Object.values(product).map((item) => data.push(item));
  return res.status(200).json({
    success: true,
    products: data,
  });
});

export const getProduct = asyncHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(400, "Product Not Found");
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError(400, "Product Not Found");
  }

  return res.status(200).json({
    success: true,
    product,
  });
});

export const getProductVarients = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(401, "Product Not Found");
  }

  const products = await Product.find();
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError(401, "Product Not Found");
  }

  let varient = {};
  products.forEach((item) => {
    if (item.title === product.title && item.quantity > 0) {
      if (item.size) {
        if (varient[item.color]) {
          varient[item.color][item.size] = { id: item._id };
        } else {
          varient[item.color] = {};
          varient[item.color]["_id"] = item._id;
          varient[item.color][item.size] = { id: item._id };
        }
      }
      if (item.ram) {
        if (varient[item.color]) {
          if (varient[item.color][item.ram]) {
            if (
              !Object.keys(varient[item.color][item.ram]).includes(item.storage)
            ) {
              varient[item.color][item.ram][item.storage] = item._id;
            }
          } else {
            varient[item.color][item.ram] = { [item.storage]: item._id };
          }
        } else {
          varient[item.color] = { _id: item._id };
          varient[item.color][item.ram] = { [item.storage]: item._id };
        }
      }
    }
  });

  const uniqueIds = new Set();
  console.log(varient);

  Object.values(varient).forEach((item) => {
    Object.values(item).forEach((val) => {
      if (typeof val == "object") {
        Object.values(val).forEach((data) => {
          if (data._id) {
            console.log(data);
            uniqueIds.add(data);
          }
        });
        return;
      }
      if (!val._id) {
        uniqueIds.add(val.id);
      }
    });
  });

  const allIds = Array.from(uniqueIds);
  console.log(allIds);

  const fetchReviews = async (ids) => {
    const products = await Product.find({ _id: { $in: ids } }).lean();

    const reviews = await Promise.all(
      products.map(async (product) => {
        const reviewDetails = await Promise.all(
          product.reviews.map(async (review) => {
            if (!review.user) return null;
            const user = await User.findById(review.user)
              .select("name image")
              .lean();
            return {
              ...user,
              review: review.review,
              rating: review.rating,
            };
          })
        );
        return reviewDetails.filter((review) => review !== null);
      })
    );

    return reviews.flat();
  };

  const reviews = await fetchReviews(allIds);

  let rating = await Promise.all(
    allIds.map(async (item) => {
      const product = await Product.findById(item);
      return product.rating;
    })
  );

  let ratings = rating.flat();

  return res.status(200).json({
    success: true,
    product,
    varient,
    reviews,
    ratings,
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(401, "Product Not Found");
  }

  const products = await Product.find();
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError(401, "Product Not Found");
  }

  const varient = {};
  products.forEach((item) => {
    if (item.title === product.title && item.quantity > 0) {
      if (item.size) {
        if (varient[item.color]) {
          varient[item.color][item.size] = { id: item._id };
        } else {
          varient[item.color] = {};
          varient[item.color]["_id"] = item._id;
          varient[item.color][item.size] = { id: item._id };
        }
      }
      if (item.ram) {
        if (varient[item.color]) {
          if (varient[item.color][item.ram]) {
            if (
              !Object.keys(varient[item.color][item.ram]).includes(item.storage)
            ) {
              varient[item.color][item.ram][item.storage] = item._id;
            }
          } else {
            varient[item.color][item.ram] = { [item.storage]: item._id };
          }
        } else {
          varient[item.color] = { _id: item._id };
          varient[item.color][item.ram] = { [item.storage]: item._id };
        }
      }
    }
  });

  const pro = product.reviews.map(async (data) => {
    const user = await User.findById(data.user).select("name image");
    return { ...user.toObject(), review: data.review, rating: data.rating };
  });

  const data = await Promise.all(pro);
  return res.status(200).json({
    success: true,
    data: { ...product.toObject(), reviews: data, varient },
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(400, "Product Not Found");
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError(400, "Product Not Found");
  }

  await cloudinary.v2.uploader.destroy(product.image.public_id);
  // fs.rm(`uploads/${req.file.filename}`);

  await Product.findByIdAndDelete(req.params.id)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Product Deleted successfully",
      });
    })
    .catch((err) => {
      throw new AppError(400, "Problem occuring on deleteing product");
    });
});

export const updateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(400, "Product Not Found");
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError(400, "Product Not Found");
  }

  await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (req.file) {
    await cloudinary.v2.uploader.destroy(product.image.public_id);
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      gravity: "auto",
      height: 500,
      width: 500,
      crop: "auto",
    });

    fs.rm(`uploads/${req.file.filename}`);
    product.image.public_id = result.public_id;
    product.image.url = result.url;
  }

  await product
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Product Updated successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: "problem occured on deleting product",
      });
    });
});

export const reviewProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(400, "Product Not Found");
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError(400, "Product Not Found");
  }

  const { rating, review } = req.body;

  if (!review && !rating) {
    throw new AppError(400, "Please add some review add rating");
  }
  const user = await User.findById(req.User.id);

  product.reviews.push({
    user: user.id,
    review: req.body.review,
    rating: req.body.rating,
  });

  product.noOfReviews = product.noOfReviews + 1;

  product.rating.push(req.body.rating);
  product.noOfRatings = product.noOfRatings + 1;

  await product.save();
  res.status(200).json({
    success: true,
    message: "Thanks for added your review",
  });
});

export const rateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError(400, "Product Not Found");
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError(400, "Product Not Found");
  }

  if (!(req.body.rating > 0 && req.body.rating <= 5)) {
    throw new AppError(400, "Please rate this product");
  }
  const user = await User.findById(req.User.id);
  product.rating.push(req.body.rating);
  product.noOfRatings = product.noOfRatings + 1;

  await product.save().then(() => {
    return res.status(200).json({
      success: true,
      message: "Thanks for added your rating",
    });
  });
});

export const getPaginatedProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const products = await Product.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Product.countDocuments();

  return res.status(200).json({
    products,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});
