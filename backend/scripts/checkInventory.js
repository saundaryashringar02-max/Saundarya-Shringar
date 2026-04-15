const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: path.join(__dirname, '../.env') });
const Product = require('../models/Product');
const Category = require('../models/Category');

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const categories = await Category.find({});

        console.log("Inventory Check:");
        for (const cat of categories) {
            const b = await Product.countDocuments({ category: cat.name, price: { $lte: 300 } });
            const m = await Product.countDocuments({ category: cat.name, price: { $gte: 500, $lte: 1000 } });
            const p = await Product.countDocuments({ category: cat.name, price: { $gte: 1500, $lte: 2000 } });
            console.log(`${cat.name} -> Budget: ${b}, Mid: ${m}, Premium: ${p}`);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

check();
