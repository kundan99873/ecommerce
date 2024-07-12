import cloudinary from "cloudinary";
import User from "../model/user.js";
import sendMail from "../utils/sendmail.js";
import mongoose from "mongoose";
import fs from "fs/promises";
import asyncHandler from "../middleware/asyncHandler.js";
import AppError from "../utils/ApiError.js";
import md5 from "md5";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = async (id) => {
  const user = await User.findById(id);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

const option = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const secret = process.env.SECRET;

export const register = asyncHandler(async (req, res) => {
  const newUser = new User(req.body);

  const validationError = newUser.validateSync();
  if (validationError) {
    throw new AppError(401, "Validation Error", validationError.errors);
  }

  const existedUser = await User.findOne({ email: req.body.email });
  if (existedUser) {
    throw new AppError(401, "User already existed");
  }

  const verifyToken = md5(Date.now());

  const user = await User.create(req.body);

  user.verifyToken = verifyToken;
  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "ecommerce",
      height: 300,
      width: 300,
      crop: "auto",
    });
    if (result) {
      user.image.url = result.secure_url;
      user.image.public_id = result.public_id;
      fs.rm(`uploads/${req.file.filename}`);
    }
  }

  await user.save();

  const link = `${process.env.FRONT_URL}/user/${user._id}/verify/${verifyToken}`;
  console.log(link);
  sendMail(
    req.body.email,
    "Verify your email address",
    `Please verify your email address on click on below link <br /><a href=${link} target="_blank">Verify</a>`
  );
  return res.status(201).json({
    success: true,
    message:
      "User registered successfully!! A verification email has been sent to your email address",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(401, "Please login with correct credentials");
  }

  if (!user.verify) {
    const verifyToken = md5(Date.now());
    const verifyTokenExpiry = Date.now() + 600000;

    user.verifyToken = verifyToken;
    user.verifyTokenExpiry = verifyTokenExpiry;
    await user.save();
    const link = `${process.env.FRONT_URL}/user/${user._id}/verify/${verifyToken}`;
    sendMail(
      email,
      "Verify your email address",
      "Please verify your email address on click on below link " + link
    );
    console.log(link);
    throw new AppError(401, "Please verify your email before login");
  }

  let checkedPassword = await user.isPasswordCorrect(password);

  if (!checkedPassword) {
    throw new AppError(401, "Please login with correct credentials");
  }

  const { accessToken, refreshToken } = await generateToken(user._id);

  user.isLogin = true;
  user.refreshToken = refreshToken;
  await user.save();

  // const userDetail = User.findById(user._id).select("-password -")
  const userData = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, option)
    .status(200)
    .json({
      success: true,
      message: "Login Successfull !!!",
      user: userData,
    });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const oldRefreshToken = req.cookies?.refreshToken;
  if (!oldRefreshToken) {
    throw new AppError(400, "Token Not Found");
  }
  const data = jwt.verify(oldRefreshToken, secret);
  const user = await User.findById(data?.id);
  if (!user) {
    throw new AppError(400, "Token Not Found");
  }
  if (user.refreshToken !== oldRefreshToken) {
    throw new AppError(400, "Token Not Found or Expired");
  }

  const { accessToken, refreshToken } = await generateToken(user._id);

  return res
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .status(200)
    .json({
      success: true,
      message: "Token updated Successfully !!!",
    });
});

export const logout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.User.id);
  if (!user) {
    throw new AppError(401, "User not found");
  }

  user.isLogin = false;
  user.refreshToken = undefined;
  await user.save();

  return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json({
      success: true,
      message: "You are logout successfully",
    });
});

export const verify = asyncHandler(async (req, res) => {
  const { id, token } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(401, "Invalid Link");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new AppError(401, "Invalid Link");
  }
  if (user.verifyToken !== token) {
    throw new AppError(401, "Invalid Link");
  }
  if (user.verifyTokenExpiry < Date.now()) {
    throw new AppError(401, "Invalid Expired");
  }

  user.verify = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;
  await user.save();

  sendMail(
    user.email,
    "Verify Successfull",
    "You are successfully verify!! You can login now!!"
  );

  return res.status(200).json({
    success: true,
    message: "You are successfully verify!! You can login now!!",
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  if (!req.body.email) {
    throw new AppError(
      401,
      "Validation Error",
      "Please enter a valid email address"
    );
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new AppError(400, "User not Found");
  }

  const token = md5(Date.now());
  user.forgotPasswordToken = token;
  user.forgotPasswordTokenExpiry = Date.now() + 600000;

  await user.save();
  const link = `${process.env.FRONT_URL}/user/${user._id}/forgot/${token}`;
  console.log(link);
  sendMail(
    req.body.email,
    "Verify your email address",
    "Change your passwoed on clicking on below link " + link
  );

  return res.status(200).json({
    success: true,
    message: "A password change email has been send to your email address",
  });
});

export const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { id, token } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(401, "Invalid Link");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new AppError(401, "Invalid Link");
  }

  if (!user.forgotPasswordToken == token) {
    throw new AppError(401, "Invalid Link");
  }

  if (user.forgotPasswordTokenExpiry < Date.now()) {
    throw new AppError(401, "Link Expired");
  }

  return res.status(200).json({
    success: true,
    message: "You can change your password now!!",
  });
});

export const forgotUserPassword = asyncHandler(async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { id, token } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(401, "Invalid Link");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new AppError(401, "Invalid Link");
  }

  if (!user.forgotPasswordToken == token) {
    throw new AppError(401, "Invalid Link");
  }

  if (user.forgotPasswordTokenExpiry < Date.now()) {
    throw new AppError(401, "Link Expired");
  }

  if (newPassword !== confirmPassword) {
    throw new AppError(401, "Both Password do not match");
  }

  if (newPassword.length < 6) {
    throw new AppError(401, "Password must be atleast 6 character");
  }

  user.password = newPassword;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpiry = undefined;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Your password has been updated successfully!!",
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { password, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.User.id);
  let checkedPassword = await user.isPasswordCorrect(password);

  if (!checkedPassword) {
    throw new AppError(401, "Please enter your correct password");
  }

  if (newPassword !== confirmPassword) {
    throw new AppError(401, "New Password do not match");
  }

  console.log(newPassword.length);
  if (newPassword.length < 6) {
    throw new AppError(401, "Password must be atleast 6 character");
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Your password has been changed successfully!!",
  });
});

export const userDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "User Not Found");
  }

  const user = await User.findById(id).select("-password -refreshToken");
  if (!user) {
    throw new AppError(400, "User Not Found");
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.User.id);
  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "ecommerce",
      height: 300,
      width: 300,
      gravity: "auto",
      crop: "auto",
    });
    if (result) {
      user.image.url = result.secure_url;
      user.image.public_id = result.public_id;
      fs.rm(`uploads/${req.file.filename}`);
    }
  }
  if (req.body.name) {
    user.name = req.body.name;
  }
  await user.save();
  return res.status(200).json({
    success: true,
    message: "User updated successfully",
  });
});

export const getUserDetail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.User.id).select("-password");
  if (!user) {
    throw new AppError(400, "User Not Found");
  }
  return res.status(200).json({
    success: true,
    user,
  });
});

export const allUserDetail = asyncHandler(async (req, res) => {
  const user = await User.find().select("-password");
  if (!user) {
    throw new AppError(400, "User Not Found");
  }
  return res.status(200).json({
    success: true,
    user,
  });
});
