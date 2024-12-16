import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.Routes.js";
import connectMongoDB from "./be/connectDb.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running in localhost:${PORT}`);
  connectMongoDB();
});
