import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

export const authToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Please authenticate with a valid token",
      });
    }
    5;
    const data = jwt.verify(token, secret);
    req.User = data;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Please authenticate with a valid token",
    });
  }
};

export const adminToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Please authenticate with a valid token",
      });
    }
    const data = jwt.verify(token, secret);
    if (!data.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized for doing such activities",
      });
    }
    req.User = data;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Please authenticate with a valid token",
    });
  }
};
