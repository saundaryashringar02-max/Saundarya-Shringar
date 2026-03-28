require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const ASSETS_DIRS = [
    path.join(__dirname, '../../frontend/src/assets/images'),
    path.join(__dirname, '../../frontend/public')
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const uploadFile = async (filePath, folder = 'saundarya_shrinagar') => {
    try {
        const fileName = path.basename(filePath);
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder,
            public_id: fileName.split('.')[0],
            resource_type: 'auto' // Crucial for videos and images
        });
        console.log(`\x1b[32m%s\x1b[0m`, `✓ Uploaded: ${fileName} -> ${result.secure_url}`);
        return { localPath: fileName, cloudinaryUrl: result.secure_url };
    } catch (error) {
        console.error(`\x1b[31m%s\x1b[0m`, `✗ Error uploading ${filePath}: ${error.message}`);
        return null;
    }
};

const startMigration = async () => {
    const mapping = {};
    console.log(`\x1b[36m%s\x1b[0m`, `★ Starting Asset Migration to Cloudinary...`);

    for (const dir of ASSETS_DIRS) {
        if (!fs.existsSync(dir)) continue;

        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            if (fs.lstatSync(filePath).isDirectory()) continue;

            // Only upload common image/video formats
            if (/\.(png|jpg|jpeg|gif|mp4|svg|webp)$/i.test(file)) {
                const result = await uploadFile(filePath);
                if (result) {
                    mapping[result.localPath] = result.cloudinaryUrl;
                }
                await sleep(200); // Be kind to API
            }
        }
    }

    fs.writeFileSync(path.join(__dirname, '../cloudinary_mapping.json'), JSON.stringify(mapping, null, 2));
    console.log(`\x1b[35m%s\x1b[0m`, `★ Migration Complete. Mapping saved to cloudinary_mapping.json`);
};

startMigration();
