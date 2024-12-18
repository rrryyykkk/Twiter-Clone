import express from "express";
import { protectRoute } from "../middleware/protectedRoute.js";

const router = express.Router()

router.post("/create", protectRoute,createPost)
router.post("/like/:id", protectRoute,likeUnlikePost)
router.post("/command", protectRoute,commandPost)
router.delete("/", protectRoute,deletePost)


export default router