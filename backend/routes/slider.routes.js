import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Slider from '../models/slider.model.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Helper function to delete old image file
const deleteImageFile = (imageUrl) => {
    if (!imageUrl || !imageUrl.startsWith('/uploads/sliders/')) {
        return; // Skip if not a local upload
    }

    try {
        const filename = path.basename(imageUrl);
        const filePath = path.join(__dirname, '..', 'uploads', 'sliders', filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted old image: ${filename}`);
        }
    } catch (error) {
        console.error(`Error deleting image file: ${error.message}`);
    }
};

// Public route - Get all active sliders
router.get('/', async (req, res) => {
    try {
        const sliders = await Slider.find({ isActive: true })
            .sort({ order: 1 })
            .select('-__v');
        res.json(sliders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sliders', error: error.message });
    }
});

// Admin route - Get all sliders (including inactive)
router.get('/all', authMiddleware, async (req, res) => {
    try {
        const sliders = await Slider.find()
            .sort({ order: 1 })
            .select('-__v');
        res.json(sliders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sliders', error: error.message });
    }
});

// Admin route - Create new slider with file upload
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { title, subtitle, order, isActive } = req.body;

        // Use uploaded file path or imageUrl from body
        const imageUrl = req.file
            ? `/uploads/sliders/${req.file.filename}`
            : req.body.imageUrl;

        if (!imageUrl) {
            return res.status(400).json({ message: 'Image is required (either upload file or provide URL)' });
        }

        const slider = new Slider({
            title,
            subtitle: subtitle || '',
            imageUrl,
            order: order || 0,
            isActive: isActive === 'true' || isActive === true
        });

        await slider.save();
        res.status(201).json({ message: 'Slider created successfully', slider });
    } catch (error) {
        res.status(500).json({ message: 'Error creating slider', error: error.message });
    }
});

// Admin route - Update slider with optional file upload
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { title, subtitle, order, isActive } = req.body;

        // Get existing slider to access old image URL
        const existingSlider = await Slider.findById(req.params.id);

        if (!existingSlider) {
            return res.status(404).json({ message: 'Slider not found' });
        }

        const updateData = {
            title,
            subtitle: subtitle || '',
            order,
            isActive: isActive === 'true' || isActive === true
        };

        let shouldDeleteOldImage = false;
        const oldImageUrl = existingSlider.imageUrl;

        // Only update imageUrl if new file uploaded or new URL provided
        if (req.file) {
            updateData.imageUrl = `/uploads/sliders/${req.file.filename}`;
            shouldDeleteOldImage = true;
        } else if (req.body.imageUrl && req.body.imageUrl !== oldImageUrl) {
            updateData.imageUrl = req.body.imageUrl;
            shouldDeleteOldImage = true;
        }

        const slider = await Slider.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        // Delete old image file if it was replaced
        if (shouldDeleteOldImage) {
            deleteImageFile(oldImageUrl);
        }

        res.json({ message: 'Slider updated successfully', slider });
    } catch (error) {
        res.status(500).json({ message: 'Error updating slider', error: error.message });
    }
});

// Admin route - Delete slider
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const slider = await Slider.findByIdAndDelete(req.params.id);

        if (!slider) {
            return res.status(404).json({ message: 'Slider not found' });
        }

        // Delete the associated image file
        deleteImageFile(slider.imageUrl);

        res.json({ message: 'Slider deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting slider', error: error.message });
    }
});

export default router;
