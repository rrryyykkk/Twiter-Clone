import Post from "../models/post.Models.js";
import User from "../models/user.Models.js";
import { v2 as cloudinary } from "cloudinary";
import { updateUserProfile } from "./user.Controller";

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
      return res.status(400).json({ error: "Post must have text and imgage" });
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
