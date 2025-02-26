const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const createUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
 
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "internal error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare entered password with the hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Ensure JWT secret is available
    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "Server error: Missing JWT secret" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role,
        username: existingUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY_TIME }
    );

    res.status(200).json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const forgotPassword =async (req,res) =>{
  try {
    const { email } = req.body;
    console.log("Received forgot password request for:", email);
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const resetToken = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME });

    // Create password reset link
    const resetURL = `http://localhost:3000/api/user/reset-password/${resetToken}`;

    // Send email with reset link
    await sendResetEmail(existingUser.email, resetURL);

    res.json({ message: "Password reset link sent to your email." });
  }
   catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("username email role createdAt");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get users by filtering
const getUsersByFilter = async (req, res) => {
  try {
    let { page = 1, limit = 10, startDate, endDate, id } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {};

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (id) {
      filter._id = id;
    }

    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("username email role");

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
//get user by id
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select(
      "username email role createdAt"
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("username email role");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id, { isDeleted: true });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user soft deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  loginUser,
  updateUser,
  deleteUser,
  getUsersByFilter,
  forgotPassword
};
