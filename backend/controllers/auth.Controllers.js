import generateTokenAndCookies from "../lib/utils/generateToken.js";
import User from "../models/user.Models.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ error: "userName is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must at least 8 characters long" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndCookies(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        userName: newUser.userName,
        followers: newUser.followers,
        following: newUser.following,
        coverImg: newUser.coverImg,
        profileImg: newUser.profileImg,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in Signup controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid userName or password" });
    }

    generateTokenAndCookies(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      userName: user.userName,
      followers: user.followers,
      following: user.following,
      coverImg: user.coverImg,
      profileImg: user.profileImg,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).json({ message: "Logged Out Succesfully" });
  } catch (error) {
    console.log(error.message, "Error in LogOut controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    console.log("User ID from req.user:", req.user._id); // Debug ID pengguna
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user); // Kirim data pengguna tanpa password
  } catch (error) {
    console.error("Error in getMe controller:", error.stack); // Log detail error
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
