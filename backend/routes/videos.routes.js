import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Define Video Schema
const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        youtubeUrl: {
            type: String,
            required: true,
            trim: true,
        },
        youtubeId: {
            type: String,
            required: true,
            trim: true,
        },
        displayOrder: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Video = mongoose.model("Video", videoSchema);

// Helper function to extract YouTube ID from URL
function extractYouTubeId(url) {
    // Handle different YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
        /^([a-zA-Z0-9_-]{11})$/, // Direct ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    throw new Error("Invalid YouTube URL or ID");
}

// Public route - Get all active videos
router.get("/", async (req, res) => {
    try {
        const videos = await Video.find({ isActive: true }).sort({ displayOrder: 1 });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching videos", error: error.message });
    }
});

// Admin route - Get all videos (including inactive)
router.get("/all", authMiddleware, async (req, res) => {
    try {
        const videos = await Video.find().sort({ displayOrder: 1 });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching videos", error: error.message });
    }
});

// Admin route - Create new video
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description, youtubeUrl, displayOrder, isActive } = req.body;

        if (!title || !description || !youtubeUrl) {
            return res.status(400).json({ message: "Title, description, and YouTube URL are required" });
        }

        // Extract YouTube ID
        let youtubeId;
        try {
            youtubeId = extractYouTubeId(youtubeUrl);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        const video = new Video({
            title,
            description,
            youtubeUrl,
            youtubeId,
            displayOrder: displayOrder || 0,
            isActive: isActive !== undefined ? isActive : true,
        });

        await video.save();
        res.status(201).json({ message: "Video created successfully", video });
    } catch (error) {
        res.status(500).json({ message: "Error creating video", error: error.message });
    }
});

// Admin route - Update video
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { title, description, youtubeUrl, displayOrder, isActive } = req.body;

        // Extract YouTube ID if URL is provided
        let youtubeId;
        if (youtubeUrl) {
            try {
                youtubeId = extractYouTubeId(youtubeUrl);
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }
        }

        const updateData = { title, description, displayOrder, isActive };
        if (youtubeUrl) {
            updateData.youtubeUrl = youtubeUrl;
            updateData.youtubeId = youtubeId;
        }

        const video = await Video.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.json({ message: "Video updated successfully", video });
    } catch (error) {
        res.status(500).json({ message: "Error updating video", error: error.message });
    }
});

// Admin route - Delete video
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.json({ message: "Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting video", error: error.message });
    }
});

export default router;
