import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.Routes.js";
import usersRoute from "./routes/users.Routes.js";

import connectMongoDB from "./db/connectDb.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json()); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencode)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoute);

app.listen(PORT, () => {
  console.log(`server is running in localhost:${PORT}`);
  connectMongoDB();
});
