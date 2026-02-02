import express from 'express';
import Slider from '../models/slider.model.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Helper function to delete image from Cloudinary
const deleteCloudinaryImage = async (imageUrl) => {
    if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
        return; // Skip if not a Cloudinary URL
    }

    try {
        // Extract public_id from Cloudinary URL
        // URL format: https://res.cloudinary.com/cloud_name/image/upload/v123456/folder/filename.jpg
        const urlParts = imageUrl.split('/');
        const uploadIndex = urlParts.indexOf('upload');
        if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
            // Get folder/filename part and remove extension
            const publicIdWithExt = urlParts.slice(uploadIndex + 2).join('/');
            const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));

            await cloudinary.uploader.destroy(publicId);
            console.log(`Deleted Cloudinary image: ${publicId}`);
        }
    } catch (error) {
        console.error(`Error deleting Cloudinary image: ${error.message}`);
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

        // Use Cloudinary URL from uploaded file or imageUrl from body
        const imageUrl = req.file
            ? req.file.path  // Cloudinary URL
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
            updateData.imageUrl = req.file.path;  // Cloudinary URL
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

        // Delete old image from Cloudinary if it was replaced
        if (shouldDeleteOldImage) {
            await deleteCloudinaryImage(oldImageUrl);
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

        // Delete the associated image from Cloudinary
        await deleteCloudinaryImage(slider.imageUrl);

        res.json({ message: 'Slider deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting slider', error: error.message });
    }
});

export default router;

