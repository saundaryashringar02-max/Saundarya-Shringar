const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const Product = require('../models/Product');
const Category = require('../models/Category');

const importData = async () => {
    try {
        await connectDB();

        console.log('Reading final_products.json...');
        const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../final_products.json'), 'utf-8'));
        console.log(`Found ${productsData.length} products to process.`);

        let successCount = 0;
        let skipCount = 0;
        let categoryCount = 0;

        // BATCH PROCESSING
        const limit = process.env.IMPORT_LIMIT ? parseInt(process.env.IMPORT_LIMIT) : productsData.length;
        const batchSize = 100;

        for (let i = 0; i < limit; i += batchSize) {
            const batch = productsData.slice(i, Math.min(i + batchSize, limit));

            const promises = batch.map(async (p) => {
                // 1. Clean data
                const name = p.product_name?.trim();
                const brand = p.brand?.trim() || 'Generic';
                const categoryName = (p.category || 'Uncategorized').toLowerCase().trim();
                const subCategoryName = (p.subcategory || '').toLowerCase().trim();
                const price = parseFloat(p.price) || 0;
                const image = p.image || '/placeholder.png';

                // 2. Handle Rating/Reviews Logic
                let rating = 4.5;
                let reviews = 0;
                const rawRating = p.rating ? p.rating.toString().replace(/,/g, '') : null;

                if (rawRating) {
                    const numRating = parseFloat(rawRating);
                    if (!isNaN(numRating)) {
                        if (numRating <= 5) {
                            rating = numRating;
                            reviews = Math.floor(Math.random() * 50) + 10; // Seed some reviews
                        } else {
                            rating = 4.5; // Default if only count is provided
                            reviews = Math.floor(numRating);
                        }
                    }
                }

                // 3. Check for duplicates (Simple by Name + Brand)
                const existing = await Product.findOne({ name, brand });
                if (existing) {
                    skipCount++;
                    return;
                }

                // 4. Handle Category creation (Atomic update)
                await Category.findOneAndUpdate(
                    { name: categoryName },
                    {
                        $setOnInsert: { image: image },
                        $inc: { count: 1 }
                    },
                    { upsert: true }
                );

                // 5. Create Product
                await Product.create({
                    name,
                    brand,
                    price,
                    rating,
                    reviews,
                    image,
                    category: categoryName,
                    subCategory: subCategoryName,
                    description: `Experience luxury with ${name} by ${brand}. High-quality skincare and beauty essentials curated for you.`,
                    stock: 100,
                    status: 'active'
                });
                successCount++;
            });

            await Promise.all(promises);
            console.log(`Processed ${Math.min(i + batchSize, limit)} / ${limit} products...`);
        }

        console.log('\n--- Import Completed ---');
        console.log(`Successfully imported: ${successCount}`);
        console.log(`Skipped (duplicates): ${skipCount}`);
        console.log(`New Categories created: ${categoryCount}`);

        process.exit(0);
    } catch (error) {
        console.error('Import Failed:', error);
        process.exit(1);
    }
};

importData();
