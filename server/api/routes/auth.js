import express from "express";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

dotenv.config();

const router = express.Router();

const validateUser = [
  body("username")
    .isString()
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .escape(),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .trim()
    .escape(),
];

router.post("/register", validateUser, async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password, username } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is correct
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the deleted user
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;