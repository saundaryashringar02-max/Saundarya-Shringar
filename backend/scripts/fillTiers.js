const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const Product = require('../models/Product');
const Category = require('../models/Category');

const fillTiers = async () => {
    try {
        await connectDB();

        const tiers = [
            { name: "Budget", min: 100, max: 300 },
            { name: "Mid", min: 500, max: 1000 },
            { name: "Premium", min: 1500, max: 2000 }
        ];

        // The specific categories we want to ensure have products
        const targetCategories = [
            'Skincare', 'Soaps', 'Haircare', 'Makeup',
            'Artificial Jewellery', 'Innerwear', 'Wellness', 'Combos'
        ];

        for (const catName of targetCategories) {
            // Find category image
            const categoryObj = await Category.findOne({ name: catName });
            const catImage = categoryObj?.image || 'https://res.cloudinary.com/du5ukj0zu/image/upload/v1775651074/saundarya_system/default_product_placeholder.jpg';

            // Find an existing real product image in this category if possible
            const sampleProduct = await Product.findOne({ category: catName, image: { $regex: /cloudinary/ } });
            const fallbackImage = sampleProduct?.image || catImage;

            for (const tier of tiers) {
                const count = await Product.countDocuments({
                    category: catName,
                    price: { $gte: tier.min, $lte: tier.max }
                });

                if (count < 5) {
                    const needed = 5 - count;
                    console.log(`Topping up ${catName} - ${tier.name} with ${needed} items...`);

                    for (let i = 0; i < needed; i++) {
                        const randomPrice = Math.floor(Math.random() * (tier.max - tier.min + 1)) + tier.min;

                        await Product.create({
                            name: `${catName} ${tier.name} Essential ${i + 1}`,
                            brand: 'Saundarya',
                            price: randomPrice,
                            rating: 4.5,
                            reviews: Math.floor(Math.random() * 500) + 50,
                            image: fallbackImage,
                            category: catName,
                            subCategory: tier.name,
                            description: `A curated ${tier.name.toLowerCase()} item for your ${catName.toLowerCase()} ritual.`,
                            stock: 50,
                            status: 'active'
                        });
                    }
                }
            }
        }

        console.log('Successfully filled all categories with at least 5 products per price tier!');
        process.exit(0);
    } catch (error) {
        console.error('Fill failed:', error);
        process.exit(1);
    }
};

fillTiers();
