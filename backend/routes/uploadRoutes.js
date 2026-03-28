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
    } catch (err) {
        console.error('Core Uploader Error:', err);
        next(err);
    }
});

module.exports = router;
