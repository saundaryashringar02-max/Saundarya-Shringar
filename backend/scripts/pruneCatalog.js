const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const Product = require('../models/Product');

const prune = async () => {
    try {
        await connectDB();

        // Identify placeholders using resilient pattern matching
        const placeholderRegex = /placeholder|unsplash|placehold\.jp|t3\.ftcdn|no-image|default_product_placeholder/i;
        const placeholderQuery = {
            $or: [
                { image: { $regex: placeholderRegex } },
                { image: { $exists: false } },
                { image: null },
                { image: '' },
                { image: 'null' }
            ]
        };

        const placeholderCount = await Product.countDocuments(placeholderQuery);
        console.log(`Found ${placeholderCount} products with placeholder/missing images.`);

        if (placeholderCount === 0) {
            console.log('No placeholder images found to remove.');
            process.exit(0);
        }

        const result = await Product.deleteMany(placeholderQuery);
        console.log(`Successfully removed ${result.deletedCount} products that had no real images.`);

        process.exit(0);
    } catch (error) {
        console.error('Pruning failed:', error);
        process.exit(1);
    }
};

prune();
