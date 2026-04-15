const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: path.join(__dirname, '../.env') });
const connectDB = require('../config/db');
const Product = require('../models/Product');

const fixTiers = async () => {
    try {
        await connectDB();

        // 1. Delete the bad placeholder products
        const deleteResult = await Product.deleteMany({ name: /Essential \d+/ });
        console.log(`Deleted ${deleteResult.deletedCount} identical placeholder products.`);

        // 2. Load the main product database
        const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../final_products.json'), 'utf-8'));
        console.log(`Loaded ${productsData.length} source products for realistic top-up.`);

        const tiers = [
            { name: "Budget", min: 100, max: 300 },
            { name: "Mid", min: 500, max: 1000 },
            { name: "Premium", min: 1500, max: 2000 }
        ];

        const targetCategories = [
            'Skincare', 'Soaps', 'Haircare', 'Makeup',
            'Artificial Jewellery', 'Innerwear', 'Wellness', 'Combos'
        ];

        // Map broad categories to match source data
        const categoryMap = {
            'Skincare': ['skin', 'face', 'care', 'cleanser', 'serum', 'cream', 'moisturizer'],
            'Soaps': ['soap', 'bath', 'body wash', 'bar'],
            'Haircare': ['hair', 'shampoo', 'conditioner', 'oil'],
            'Makeup': ['makeup', 'lip', 'eye', 'foundation', 'powder', 'color'],
            'Artificial Jewellery': ['jewellery', 'ring', 'necklace', 'earring', 'bangle'],
            'Innerwear': ['innerwear', 'bra', 'panty', 'lingerie'],
            'Wellness': ['wellness', 'health', 'supplement', 'herb'],
            'Combos': ['combo', 'kit', 'set', 'pack']
        };

        for (const catName of targetCategories) {
            const keywords = categoryMap[catName] || [catName.toLowerCase()];

            // Find candidate products for this category from the JSON
            let candidates = productsData.filter(p => {
                const combined = ((p.product_name || '') + ' ' + (p.category || '') + ' ' + (p.subcategory || '')).toLowerCase();
                return keywords.some(kw => combined.includes(kw));
            });

            // Fallback if no specific candidates found
            if (candidates.length < 20) {
                candidates = productsData; // Use all if not enough targeting
            }

            for (const tier of tiers) {
                const count = await Product.countDocuments({
                    category: catName,
                    price: { $gte: tier.min, $lte: tier.max }
                });

                if (count < 5) {
                    const needed = 5 - count;
                    console.log(`Topping up ${catName} - ${tier.name} with ${needed} real-looking items...`);

                    // Shuffle candidates to get different ones each time
                    const shuffled = candidates.sort(() => 0.5 - Math.random());

                    for (let i = 0; i < needed; i++) {
                        const srcIdx = (i * 3 + Math.floor(Math.random() * 5)) % shuffled.length;
                        const src = shuffled[srcIdx];

                        const randomPrice = Math.floor(Math.random() * (tier.max - tier.min + 1)) + tier.min;

                        // Extract a good name
                        let pName = src.product_name || `${catName} Premium ${i}`;
                        // Ensure it's not super long
                        if (pName.length > 50) pName = pName.substring(0, 47) + '...';

                        // Check image (ensure it's not the generic placeholder if possible)
                        let image = src.image;
                        if (!image || image.includes('placehold')) {
                            // Try to find an existing image in DB
                            const existing = await Product.findOne({ category: catName, image: { $regex: /cloudinary/ } });
                            image = existing ? existing.image : 'https://res.cloudinary.com/du5ukj0zu/image/upload/v1775651074/saundarya_system/default_product_placeholder.jpg';
                        }

                        // Just making sure the image URL is somewhat unique if possible (though we'd prefer actual images)
                        // But since we are pulling from final_products, it will have unique images if available!

                        let parsedRating = parseFloat(src.rating);
                        if (isNaN(parsedRating) || parsedRating > 5 || parsedRating < 1) {
                            parsedRating = parseFloat((4 + Math.random()).toFixed(1));
                        }

                        await Product.create({
                            name: pName,
                            brand: src.brand || 'Saundarya',
                            price: randomPrice,
                            rating: parsedRating,
                            reviews: Math.floor(Math.random() * 300) + 20,
                            image: image,
                            category: catName,
                            subCategory: src.subcategory || tier.name,
                            description: src.description || `Curated high-quality ${catName.toLowerCase()} product.`,
                            stock: 50,
                            status: 'active'
                        });
                    }
                }
            }
        }

        console.log('Successfully replaced placeholders with diverse realistic products!');
        process.exit(0);
    } catch (error) {
        console.error('Fix failed:', error);
        process.exit(1);
    }
}

fixTiers();
