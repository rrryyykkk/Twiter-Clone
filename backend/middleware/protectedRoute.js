import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/user.Models.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("Token from cookies:", token);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: no Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = mongoose.Types.ObjectId.isValid(decoded.userId)
      ? new mongoose.Types.ObjectId(decoded.userId)
      : decoded.userId;

    const user = await User.findById(userId).select("-password");
    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.stack);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
