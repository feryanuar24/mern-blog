import express from "express";
import { body, validationResult } from "express-validator";
import Post from "../../models/Post.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

const validatePost = [
  authMiddleware,
  body("title")
    .trim()
    .escape()
    .isString()
    .notEmpty()
    .withMessage("Title is required"),
  body("content")
    .trim()
    .escape()
    .isString()
    .notEmpty()
    .withMessage("Content is required"),
  body("author")
    .trim()
    .escape()
    .isString()
    .notEmpty()
    .withMessage("Author is required"),
];

router.post("/", validatePost, async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Create a new post
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Return the post
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validatePost, async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Update a post
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // Check if post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Return the updated post
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Return the deleted post
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

export default router;
