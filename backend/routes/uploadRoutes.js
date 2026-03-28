const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { protect } = require('../middleware/authMiddleware');

// Configure Cloudinary with trimmed credentials to avoid environment variable mangling
const cloudinaryConfig = {
    cloud_name: (process.env.CLOUDINARY_CLOUD_NAME || '').trim(),
    api_key: (process.env.CLOUDINARY_API_KEY || '').trim(),
    api_secret: (process.env.CLOUDINARY_API_SECRET || '').trim()
};

cloudinary.config(cloudinaryConfig);

// Diagnostic log for production troubleshooting
if (process.env.NODE_ENV !== 'production' || !cloudinaryConfig.cloud_name) {
    console.log(`★ Uploader Ready | Cloud: ${cloudinaryConfig.cloud_name || 'MISSING'}`);
}

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
        console.error('● CORE UPLOADER FAILURE:', {
            status: error.http_code,
            message: error.message,
            cloud: (process.env.CLOUDINARY_CLOUD_NAME || '').slice(0, 3) + '...',
            key: (process.env.CLOUDINARY_API_KEY || '').slice(-4),
            secretSet: !!process.env.CLOUDINARY_API_SECRET
        });

        const message = error.message || 'Asset synchronization with cloud failed.';
        res.status(500).json({
            status: 'error',
            message: `Cloudinary 403: Check Credentials on server. (Using Cloud: ${process.env.CLOUDINARY_CLOUD_NAME})`,
            details: error
        });
    }
});

module.exports = router;
