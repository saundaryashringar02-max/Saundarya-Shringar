const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { protect } = require('../middleware/authMiddleware');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post('/', protect, async (req, res, next) => {
    try {
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.error('● Cloudinary error: Missing environment variables');
            return res.status(500).json({ status: 'error', message: 'Uploader configuration is missing on server.' });
        }
        const { image } = req.body; // Expecting base64 or URL
        if (!image) return res.status(400).json({ status: 'fail', message: 'No digital asset provided' });

        const result = await cloudinary.uploader.upload(image, {
            folder: 'saundarya_rma',
            resource_type: 'auto'
        });

        res.status(200).json({
            status: 'success',
            url: result.secure_url
        });
    } catch (error) {
        console.error('● CORE UPLOADER FAILURE:', error);

        // Handle specific Cloudinary errors or network failures
        const message = error.message || 'Asset synchronization with cloud failed.';
        res.status(500).json({
            status: 'error',
            message: message,
            // Include details only if not in production to prevent leakage
            details: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
});

module.exports = router;
