const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const Product = require('../models/Product');

const DEFAULT_IMAGE = 'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OW7l79jzRPzEgp8ZpSIxSo8EImbVdV5E.jpg';

const fixImages = async () => {
    try {
        await connectDB();

        console.log('Identifying products with missing or dummy images...');

        // Find products where image is:
        // 1. Missing/Null
        // 2. Empty string
        // 3. Contains 'unsplash'
        // 4. Is exactly 'null' as a string (happens sometimes with bad imports)
        const query = {
            $or: [
                { image: { $exists: false } },
                { image: null },
                { image: '' },
                { image: 'null' },
                { image: { $regex: /unsplash|placehold\.jp|cloudinary.*placeholder-image/i } }
            ]
        };

        const count = await Product.countDocuments(query);
        console.log(`Found ${count} products requiring image updates.`);

        if (count === 0) {
            console.log('All products have valid image paths.');
            process.exit(0);
        }

        const result = await Product.updateMany(query, { $set: { image: DEFAULT_IMAGE } });
        console.log(`Successfully updated ${result.modifiedCount} products with the default placeholder image.`);

        process.exit(0);
    } catch (error) {
        console.error('Image fix failed:', error);
        process.exit(1);
    }
};

fixImages();
