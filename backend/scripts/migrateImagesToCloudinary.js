const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const Product = require('../models/Product');

// Configure Cloudinary with NEW credentials
const CLOUD_NAME = (process.env.CLOUDINARY_CLOUD_NAME || '').trim();
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: (process.env.CLOUDINARY_API_KEY || '').trim(),
    api_secret: (process.env.CLOUDINARY_API_SECRET || '').trim()
});

const EXTERNAL_PLACEHOLDER = 'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OW7l79jzRPzEgp8ZpSIxSo8EImbVdV5E.jpg';

const migrateImages = async () => {
    try {
        await connectDB();

        console.log(`Starting migration to new Cloudinary account: ${CLOUD_NAME}`);

        // 1. Upload the Default Placeholder once to the new account
        let cloudinaryPlaceholder = '';
        try {
            console.log('Uploading default placeholder to new account...');
            const pResult = await cloudinary.uploader.upload(EXTERNAL_PLACEHOLDER, {
                folder: 'saundarya_system',
                public_id: 'default_product_placeholder'
            });
            cloudinaryPlaceholder = pResult.secure_url;
            console.log(`Default placeholder is now at: ${cloudinaryPlaceholder}`);
        } catch (e) {
            console.error('Failed to upload placeholder. Using external link as fallback.');
            cloudinaryPlaceholder = EXTERNAL_PLACEHOLDER;
        }

        // 2. Query for products that don't belong to the NEW cloud_name
        // We'll process all products to ensure everything is on the new account
        const products = await Product.find({
            $or: [
                { image: { $not: new RegExp(CLOUD_NAME) } },
                { image: { $regex: /unsplash|placehold\.jp|t3\.ftcdn/ } }
            ]
        });

        console.log(`Found ${products.length} products to re-sync to the new account.`);

        let successCount = 0;
        let placeholderSyncCount = 0;
        let errorCount = 0;

        for (let i = 0; i < products.length; i++) {
            const p = products[i];
            try {
                process.stdout.write(`Syncing ${i + 1}/${products.length}: ${p.name.slice(0, 20)}... `);

                // Check if this is a placeholder or broken image
                const isPlaceholder = !p.image || p.image === '' || p.image === 'null' ||
                    p.image.includes('unsplash') || p.image.includes('placehold.jp') ||
                    p.image.includes('t3.ftcdn') || p.image.includes('placeholder-image');

                if (isPlaceholder) {
                    p.image = cloudinaryPlaceholder;
                    placeholderSyncCount++;
                    console.log('PLACEHOLDER SYNCED');
                } else {
                    // It's a real image (external or old cloudinary)
                    // Re-upload to the NEW account
                    const result = await cloudinary.uploader.upload(p.image, {
                        folder: 'saundarya_products',
                        resource_type: 'auto'
                    });
                    p.image = result.secure_url;
                    console.log('UPLOADED TO NEW CLOUD');
                }

                // Handle Gallery likewise
                if (p.gallery && p.gallery.length > 0) {
                    const newGallery = [];
                    for (const gImage of p.gallery) {
                        if (gImage && !gImage.includes(CLOUD_NAME)) {
                            try {
                                const gResult = await cloudinary.uploader.upload(gImage, {
                                    folder: 'saundarya_products',
                                    resource_type: 'auto'
                                });
                                newGallery.push(gResult.secure_url);
                            } catch (e) {
                                newGallery.push(gImage);
                            }
                        } else {
                            newGallery.push(gImage);
                        }
                    }
                    p.gallery = newGallery;
                }

                await p.save();
                successCount++;
            } catch (error) {
                console.log(`FAILED: ${error.message}`);
                errorCount++;
            }
        }

        console.log('\n--- Account Migration Completed ---');
        console.log(`Successfully synced: ${successCount}`);
        console.log(`- New uploads: ${successCount - placeholderSyncCount}`);
        console.log(`- Placeholders linked: ${placeholderSyncCount}`);
        console.log(`Failed: ${errorCount}`);

        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrateImages();
