const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const Product = require('../models/Product');

const removeCheap = async () => {
    try {
        await connectDB();

        console.log('Calculating products to remove (price < 50)...');
        const count = await Product.countDocuments({ price: { $lt: 50 } });
        console.log(`Found ${count} products with price less than 50.`);

        if (count === 0) {
            console.log('No products found to remove.');
            process.exit(0);
        }

        const result = await Product.deleteMany({ price: { $lt: 50 } });
        console.log(`Successfully removed ${result.deletedCount} products.`);

        process.exit(0);
    } catch (error) {
        console.error('Removal failed:', error);
        process.exit(1);
    }
};

removeCheap();
