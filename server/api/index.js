import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import errorHandler from "../middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

connectToDatabase();

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

// Error Handler Middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
