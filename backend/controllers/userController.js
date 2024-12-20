import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

/**
 * @description Auth user & get token
 * @route POST /api/users/login
 * @param {string} req.body.email - The email of the user
 * @param {string} req.body.password - The password of the user
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * @description Register a new user
 * @route POST /api/users
 * @param {string} req.body.name - The name of the user
 * @param {string} req.body.email - The email of the user
 * @param {string} req.body.password - The password of the user
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @description Logout user / clear cookie
 * @route POST /api/users/logout
 * @access Private
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout successful" });
});

/**
 * @description Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    const user = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    };

    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @description Update user profile
 * @route PUT /api/users/profile
 * @param {string} req.body.name - The name of the user
 * @param {string} req.body.email - The email of the user
 * @param {string} req.body.password - The password of the user
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;

    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @description Get all users
 * @route GET /api/users
 * @access Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get all users");
});

/**
 * @description Get user by ID
 * @route GET /api/users/:id
 * @param {string} req.params.id - The id of the user
 * @access Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get user by ID");
});

/**
 * @description Delete user
 * @route DELETE /api/users/:id
 * @param {string} req.params.id - The id of the user
 * @access Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete user");
});

/**
 * @description Update user
 * @route PUT /api/users/:id
 * @param {string} req.params.id - The id of the user
 * @param {string} req.body.name - The name of the user
 * @param {string} req.body.email - The email of the user
 * @param {string} req.body.isAdmin - The isAdmin of the user
 * @access Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
