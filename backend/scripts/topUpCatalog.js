const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const Product = require('../models/Product');
const Category = require('../models/Category');

const topUp = async () => {
    try {
        await connectDB();

        console.log('Topping up catalog with 300 more products...');
        const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../final_products.json'), 'utf-8'));

        let addedCount = 0;
        const TARGET_NEW = 300;

        for (const p of productsData) {
            if (addedCount >= TARGET_NEW) break;

            const name = p.product_name?.trim();
            const brand = p.brand?.trim() || 'Generic';
            const price = parseFloat(p.price) || 0;

            // 1. Validation Filters (Price 50-2000)
            if (price < 50 || price > 2000) continue;

            // 2. Uniqueness Check
            const existing = await Product.findOne({ name, brand });
            if (existing) continue;

            const categoryName = (p.category || 'Uncategorized').toLowerCase().trim();
            const subCategoryName = (p.subcategory || '').toLowerCase().trim();
            const image = p.image || 'https://placehold.jp/24/5c2e3e/ffffff/500x500.png?text=Saundarya%0A%0AImage%20Coming%20Soon';

            // 3. Category handling
            await Category.findOneAndUpdate(
                { name: categoryName },
                { $setOnInsert: { image: image }, $inc: { count: 1 } },
                { upsert: true }
            );

            // 4. Transform Rating/Reviews
            let rating = 4.5;
            let reviews = 20;
            const rawRating = p.rating ? p.rating.toString().replace(/,/g, '') : null;
            if (rawRating) {
                const numRating = parseFloat(rawRating);
                if (numRating <= 5) rating = numRating;
                else reviews = Math.floor(numRating);
            }

            // 5. Create
            await Product.create({
                name,
                brand,
                price,
                rating,
                reviews,
                image,
                category: categoryName,
                subCategory: subCategoryName,
                description: `Heritage beauty essential: ${name} by ${brand}.`,
                stock: 100,
                status: 'active'
            });

            addedCount++;
            if (addedCount % 50 === 0) console.log(`Added ${addedCount} / ${TARGET_NEW}...`);
        }

        console.log(`Successfully added ${addedCount} new products to the catalog.`);
        process.exit(0);
    } catch (error) {
        console.error('Top-up failed:', error);
        process.exit(1);
    }
};

topUp();
