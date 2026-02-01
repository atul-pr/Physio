/**
 * PhysioCare Backend - Express server
 * Minimal REST API for login and appointments
 * Ready for deployment on Render
 */

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import appointmentRoutes from "./routes/appointments.js";
import contentRoutes from "./models/content.routes.js";
import sliderRoutes from "./routes/slider.routes.js";
import socialLinksRoutes from "./routes/socialLinks.routes.js";
import videosRoutes from "./routes/videos.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true })); // Allow all origins (Vercel frontend)
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api", authRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", contentRoutes);
app.use("/api/sliders", sliderRoutes);
app.use("/api/social-links", socialLinksRoutes);
app.use("/api/videos", videosRoutes);

// Health check for Render
app.get("/", (req, res) => {
  res.json({ message: "PhysioCare API is running" });
});

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/physiocare";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
