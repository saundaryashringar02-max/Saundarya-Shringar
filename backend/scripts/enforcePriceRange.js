const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const Product = require('../models/Product');

const enforcePriceRange = async () => {
    try {
        await connectDB();

        console.log('Enforcing price range: ₹100 - ₹2000...');

        // Query for products outside the range
        const query = {
            $or: [
                { price: { $lt: 100 } },
                { price: { $gt: 2000 } }
            ]
        };

        const countToRemove = await Product.countDocuments(query);
        console.log(`Found ${countToRemove} products outside the specified price range.`);

        if (countToRemove === 0) {
            console.log('No products found to remove.');
            process.exit(0);
        }

        const result = await Product.deleteMany(query);
        console.log(`Successfully removed ${result.deletedCount} products outside the price range.`);

        const finalCount = await Product.countDocuments();
        console.log(`Net catalog size: ${finalCount} premium products.`);

        process.exit(0);
    } catch (error) {
        console.error('Price enforcement failed:', error);
        process.exit(1);
    }
};

enforcePriceRange();
