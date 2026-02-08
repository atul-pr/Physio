import express from "express";
import SocialLink from "../models/SocialLink.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Public route - Get active social links (optionally filtered by context)
router.get("/", async (req, res) => {
    try {
        let query = { isActive: true, showInFooter: { $ne: false } };
        const links = await SocialLink.find(query).sort({ displayOrder: 1 });
        res.json(links);
    } catch (error) {
        res.status(500).json({ message: "Error fetching social links", error: error.message });
    }
});

// Admin route - Get all social links (including inactive)
router.get("/all", authMiddleware, async (req, res) => {
    try {
        const links = await SocialLink.find().sort({ displayOrder: 1 });
        res.json(links);
    } catch (error) {
        res.status(500).json({ message: "Error fetching social links", error: error.message });
    }
});

// Admin route - Create new social link
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { platform, url, icon, displayOrder, isActive, showInFooter } = req.body;

        if (!platform || !url) {
            return res.status(400).json({ message: "Platform and URL are required" });
        }

        const socialLink = new SocialLink({
            platform,
            url,
            icon,
            displayOrder: displayOrder || 0,
            isActive: isActive !== undefined ? Boolean(isActive) : true,
            showInFooter: showInFooter !== undefined ? Boolean(showInFooter) : true,
        });

        await socialLink.save();
        res.status(201).json({ message: "Social link created successfully", socialLink });
    } catch (error) {
        res.status(500).json({ message: "Error creating social link", error: error.message });
    }
});

// Admin route - Update social link
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { platform, url, icon, displayOrder, isActive, showInFooter } = req.body;

        const socialLink = await SocialLink.findByIdAndUpdate(
            req.params.id,
            {
                platform,
                url,
                icon,
                displayOrder,
                isActive: Boolean(isActive),
                showInFooter: showInFooter !== undefined ? Boolean(showInFooter) : true
            },
            { new: true, runValidators: true }
        );

        if (!socialLink) {
            return res.status(404).json({ message: "Social link not found" });
        }

        res.json({ message: "Social link updated successfully", socialLink });
    } catch (error) {
        res.status(500).json({ message: "Error updating social link", error: error.message });
    }
});

// Admin route - Delete social link
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const socialLink = await SocialLink.findByIdAndDelete(req.params.id);

        if (!socialLink) {
            return res.status(404).json({ message: "Social link not found" });
        }

        res.json({ message: "Social link deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting social link", error: error.message });
    }
});

export default router;
