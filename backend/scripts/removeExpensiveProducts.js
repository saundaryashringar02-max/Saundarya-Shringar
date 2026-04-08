const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const Product = require('../models/Product');

const removeExpensive = async () => {
    try {
        await connectDB();

        console.log('Calculating products to remove (price > 2000)...');
        const count = await Product.countDocuments({ price: { $gt: 2000 } });
        console.log(`Found ${count} products with price greater than 2000.`);

        if (count === 0) {
            console.log('No products found to remove.');
            process.exit(0);
        }

        const result = await Product.deleteMany({ price: { $gt: 2000 } });
        console.log(`Successfully removed ${result.deletedCount} products.`);

        process.exit(0);
    } catch (error) {
        console.error('Removal failed:', error);
        process.exit(1);
    }
};

removeExpensive();
