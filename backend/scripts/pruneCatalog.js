const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const Product = require('../models/Product');

const PLACEHOLDER = 'https://res.cloudinary.com/df9v0166z/image/upload/v1744111244/placeholder-image_q6f9y1.jpg';

const prune = async () => {
    try {
        await connectDB();

        // 1. Count products with real images (not placeholder)
        const realImageQuery = { image: { $ne: PLACEHOLDER } };
        const realCount = await Product.countDocuments(realImageQuery);
        console.log(`Current products with real images: ${realCount}`);

        // 2. Count products with placeholders
        const placeholderQuery = { image: PLACEHOLDER };
        const placeholderCount = await Product.countDocuments(placeholderQuery);
        console.log(`Current products with placeholder images: ${placeholderCount}`);

        // The user wants to KEEP the real images and remove 2400 from the placeholders
        const limitToRemove = 2400;
        const productsToRemove = await Product.find(placeholderQuery).limit(limitToRemove).select('_id');

        if (productsToRemove.length === 0) {
            console.log('No products with placeholder images found to remove.');
            process.exit(0);
        }

        const ids = productsToRemove.map(p => p._id);
        const result = await Product.deleteMany({ _id: { $in: ids } });

        console.log(`Successfully removed ${result.deletedCount} products that had placeholder images.`);

        process.exit(0);
    } catch (error) {
        console.error('Pruning failed:', error);
        process.exit(1);
    }
};

prune();
