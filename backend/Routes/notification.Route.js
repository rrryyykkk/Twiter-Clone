import express from "express";
import { protectRoute } from "../middleware/protectedRoute.js";
import {
  deleteNotifications,
  getNotifications,
} from "../controllers/notification.Controller.js";

const route = express.Router();

route.get("/", protectRoute, getNotifications);
route.delete("/", protectRoute, deleteNotifications);

export default route;
