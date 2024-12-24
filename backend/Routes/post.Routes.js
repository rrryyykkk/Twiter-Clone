import express from "express";
import { protectRoute } from "../middleware/protectedRoute.js";
import {
  commentsPost,
  createPost,
  deletePost,
  getAllPost,
  getFollowing,
  getLikesPost,
  getUserPost,
  likeUnlikePost,
} from "../controllers/post.Controller.js";

const router = express.Router();

router.get("/all",protectRoute, getAllPost)
router.get("/following",protectRoute, getFollowing)
router.get("/likes/:id",protectRoute, getLikesPost)
router.get("/user/:username",protectRoute, getUserPost)
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comments/:id", protectRoute, commentsPost);
router.delete("/:id", protectRoute, deletePost);

export default router;
