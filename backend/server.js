import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.Routes.js";
import usersRoute from "./routes/users.Routes.js";
import postRoute from "./routes/post.Routes.js";
import connectMongoDB from "./db/connectDb.js";

const app = express();

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  api_key: process.env.CLOUDINARY_API_KEY,
});

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json()); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencode)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoute);
app.use("/api/post", postRoute);

app.listen(PORT, () => {
  console.log(`server is running in localhost:${PORT}`);
  connectMongoDB();
});
