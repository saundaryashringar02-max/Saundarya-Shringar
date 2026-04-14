const mongoose = require('mongoose');
require('dotenv').config();
const Banner = require('../models/Banner');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function updateBanner() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // 1. Upload to Cloudinary
        console.log('Uploading image to Cloudinary...');
        const result = await cloudinary.uploader.upload('C:/Users/Samsung/.gemini/antigravity/brain/916bca30-49db-4172-8e17-e70ead7b9fa0/media__1776197717642.jpg', {
            folder: 'saundarya_shrinagar'
        });
        console.log('Upload successful:', result.secure_url);

        // 2. Find and update the second banner
        const banners = await Banner.find({ type: 'Main Slider' }).sort({ createdAt: 1 });
        if (banners.length >= 2) {
            const banner = banners[1];
            banner.image = result.secure_url;
            banner.title = 'Seamless Bra Collection';
            banner.subtitle = 'COMFORT MEETS STYLE';
            await banner.save();
            console.log(`Updated banner [${banner.title}] with new image.`);
        } else {
            console.log('Could not find second banner.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

updateBanner();
