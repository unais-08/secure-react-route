import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import {
  asyncWrapper,
  generateTokenAndSetCookie,
  sendResponse,
  CustomError,
  validateUserInput,
} from "../utils/index.js";
//I generated the comments from CHATGPT and wrap in asyncWrapper

export const signup = asyncWrapper(async (req, res) => {
  const { email, password, name } = req.body;

  // Validate input fields
  validateUserInput(email, password, name);

  // Check if user already exists
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new CustomError("User already exists", 409);
  }

  // Hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  const user = new User({
    email,
    password: hashPassword,
    name,
  });
  await user.save();

  // Generate JWT and set it in cookies
  generateTokenAndSetCookie(res, user._id);

  // Send success response
  sendResponse(
    res,
    "User created successfully",
    {
      ...user._doc,
      password: undefined, // Exclude password from response
    },
    201
  );
});

export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password || !email.trim() || !password.trim()) {
    throw new CustomError("All fields are required", 400);
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("Invalid email or password", 401); // Avoid exposing exact reason
  }

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError("Invalid email or password", 401); // Same generic message for security
  }

  // Generate JWT and set it in cookies
  generateTokenAndSetCookie(res, user._id);

  // Update last login time
  user.lastLogin = new Date();
  await user.save();

  // Send success response
  sendResponse(res, "Login successful", {
    ...user._doc,
    password: undefined, // Exclude password from response
  });
});

export const logout = asyncWrapper(async (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");

  // Send success response
  sendResponse(res, "Logout successful", null, 200);
});

export const checkAuth = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");

  // Check if user exists
  if (!user) {
    throw new CustomError("User not found", 404); // User not found error with 404 status code
  }

  // Send success response with user data
  sendResponse(res, "User is authenticated", user);
});

export const getAllUsers = asyncWrapper(async (req, res) => {
  const result = await User.find({}).sort({ createdAt: -1 });

  // Example: Throw error if no users are found
  if (!result || result.length === 0) {
    throw new CustomError("No users found", 404); // This will be passed to the error handler
  }
  sendResponse(res, "All users", result);
});

export const deleteAllUsers = asyncWrapper(async (req, res) => {
  const result = await User.deleteMany({});

  // Handle potential error if deletion fails
  if (!result || result.deletedCount === 0) {
    throw new CustomError("No users found to delete", 404); // Return 404 if no users found
  }

  // Success response
  sendResponse(res, "All users deleted successfully", result);
});

export const deleteUserById = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  // Delete user by ID
  const user = await User.findByIdAndDelete(id);

  // Handle case where user is not found
  if (!user) {
    throw new CustomError("User not found", 404); // Return 404 if user is not found
  }

  // Success response
  sendResponse(res, "User deleted successfully", null);
});
