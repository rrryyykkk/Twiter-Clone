import Post from "../models/post.Models.js";
import User from "../models/user.Models.js";
import { v2 as cloudinary } from "cloudinary";
import { updateUserProfile } from "./user.Controller.js";
import Notification from "../models/notification.Models.js";

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.body._id.toString();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    if (!text && !img) {
      return res.status(400).json({ error: "Post must have text and image" });
    }

    if (img) {
      const uploadResponse = await cloudinary.uploader.upload(img);
      img = uploadResponse.secure_url;
    }

    const newPost = new Post({
      user: userId,
      text,
      img,
    });

    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.log("Error in createPost controller: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this post" });
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post delete Successfully" });
  } catch (error) {
    console.log("Error in deletPost controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const commentsPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    console.log("postId:", postId);
    console.log("userId:", userId);

    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = { user: userId, text };

    post.comments.push(comment);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.log("Error in commentOnPost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      // UnlikePost
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPost: postId } });
      return res.status(200).json({ message: "Post unlike successfully" });
    } else {
      // like Post
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPost: postId } });
      await post.save();

      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });

      await notification.save();
      res.status(200).json({ message: "Post liked Successfully" });
    }
  } catch (error) {
    console.log("Error in likeUnlikePost controller:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const post = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    if (post.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(post);
  } catch (error) {
    console.log("Error in GetAllPost controllers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLikesPost = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const likedPost = await Post.find({ _id: { $in: user.likedPost } })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(likedPost);
  } catch (error) {
    console.log("Error in getLikesPost controllers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    console.log("user:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const following = user.following;
    console.log("folowing:", following);

    if (following.length === 0) return res.status(404).json([]);

    const feedPosts = await Post.find({ user: { $in: following } })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    console.log("feddPosts:", feedPosts);

    res.status(200).json(feedPosts);
  } catch (error) {
    console.log("Error in getFollowing controller:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName });
    if (!user) return res.status(404).json({ error: "User Not Found" });

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" })
      .populate({ path: "comments.user", select: "-password" });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getUserPost controller:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
