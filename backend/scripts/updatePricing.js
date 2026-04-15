const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const categoryRanges = {
    fragrances: { min: 200, max: 2000 },
    soaps: { min: 100, max: 1000 },
    massage: { min: 200, max: 2000 },
    hygiene: { min: 100, max: 800 },
    essentials: { min: 150, max: 1200 }
};

const smartPrices = [199, 299, 399, 499, 599, 799, 999, 1499, 1999];

/**
 * Core Function: Takes an array of products in JSON format and assigns pricing logic.
 * Final price is picked from smart prices. MRP (old price) is calculated backwards from a random discount.
 */
function processProductsPricing(productsJsonArray) {
    return productsJsonArray.map(product => {
        const catName = product.category ? product.category.toLowerCase() : '';
            
        // Map product category to our defined category ranges
        let selectedCat = 'essentials'; // default fallback
        if (catName.includes('fragrance')) selectedCat = 'fragrances';
        else if (catName.includes('soap')) selectedCat = 'soaps';
        else if (catName.includes('massage')) selectedCat = 'massage';
        else if (catName.includes('hygiene')) selectedCat = 'hygiene';
        else if (catName.includes('essential')) selectedCat = 'essentials';
        else {
            for (const key of Object.keys(categoryRanges)) {
                if (catName.includes(key) || key.includes(catName)) {
                    selectedCat = key;
                    break;
                }
            }
        }

        const range = categoryRanges[selectedCat];
        const validSmartPrices = smartPrices.filter(p => p >= range.min && p <= range.max);
        
        // 1. Assign smart final price
        let finalPrice;
        if (validSmartPrices.length > 0) {
            finalPrice = validSmartPrices[Math.floor(Math.random() * validSmartPrices.length)];
        } else {
            // Pick closest if strict range had no smart prices
            finalPrice = range.max < smartPrices[0] ? smartPrices[0] : smartPrices[smartPrices.length - 1];
        }

        // 2. Random Discount 10% to 40%
        const discountPercentage = Math.floor(Math.random() * (40 - 10 + 1)) + 10;

        // 3. MRP (oldPrice): Back-calculate since we know finalPrice and discount
        const oldPrice = Math.round(finalPrice / (1 - (discountPercentage / 100)));

        // 4. Bonus features
        const ratingOptions = [3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
        const rating = ratingOptions[Math.floor(Math.random() * ratingOptions.length)];
        const reviewsCount = Math.floor(Math.random() * (800 - 15 + 1)) + 15;
        const fastDelivery = Math.random() < 0.4; // 40% chance of being true

        return {
            ...product,
            price: finalPrice,
            oldPrice: oldPrice,
            discount: `${discountPercentage}%`,
            rating: rating,
            reviews: reviewsCount,
            fastDelivery: fastDelivery
        };
    });
}

// -------------------------------------------------------------
// Script logic to update MongoDB directly
// -------------------------------------------------------------
async function updatePricingsInDB() {
    try {
        console.log("Connecting to Database...");
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in .env");
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB! Updating prices...");

        // Fetch all current products
        const products = await Product.find({});
        console.log(`Found ${products.length} products. Calculating new prices...`);

        let updatedCount = 0;

        for (let p of products) {
            // Apply the standalone pricing function to our document
            const pJSON = p.toObject();
            const [updatedFields] = processProductsPricing([pJSON]);

            // Assign new values back to the document
            p.price = updatedFields.price;
            p.oldPrice = updatedFields.oldPrice;
            p.discount = updatedFields.discount;
            p.rating = updatedFields.rating;
            p.reviews = updatedFields.reviews;
            p.fastDelivery = updatedFields.fastDelivery;

            await p.save();
            updatedCount++;
        }

        console.log(`\n🎉 Task Complete! Successfully updated pricing structure for ${updatedCount} products.`);
        console.log("Schema properties 'price', 'oldPrice', 'discount', 'rating', 'reviews' and 'fastDelivery' are now randomized smartly!");

    } catch (err) {
        console.error("Error updating prices:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from DB.");
        process.exit(0);
    }
}

// Let's create a dummy test to show how the function converts products.
const exampleDataset = [
    { name: 'Sandalwood Soap Premium', category: 'Soaps' },
    { name: 'Oud Wood Eau de Parfum', category: 'Fragrances' },
    { name: 'Aromatherapy Body Oil', category: 'Massage' }
];

console.log("--- Example Transformation Using 'processProductsPricing' ---");
const preview = processProductsPricing(exampleDataset);
console.log(JSON.stringify(preview, null, 2));
console.log("----------------------------------------------------------\n");

// Run DB update
updatePricingsInDB();
