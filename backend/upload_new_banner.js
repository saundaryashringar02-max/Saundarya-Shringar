const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (filePath, publicId) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'saundarya_banners',
            public_id: publicId,
            resource_type: 'auto'
        });
        console.log(`✓ Uploaded ${publicId}: ${result.secure_url}`);
    } catch (error) {
        console.error(`✗ Failed ${publicId}: ${error.message}`);
    }
};

const run = async () => {
    const assetsPath = '../frontend/src/assets/images/';
    const files = [
        'hero_new_1.png',
        'hero_new_2.png',
        'hero_new_3.png',
        'banner_new_1.png',
        'banner_new_2.png'
    ];

    console.log('--- Uploading New Banners to Cloudinary ---');
    for (const file of files) {
        await uploadImage(assetsPath + file, file.split('.')[0]);
    }
    console.log('--- Upload Complete ---');
};

run();
