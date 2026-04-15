require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/db');

async function normalizeAllPrices() {
    try {
        await connectDB();

        const products = await Product.find();
        console.log(`Processing ${products.length} products...`);

        for (let product of products) {
            // Use current price as basePrice if basePrice is not set
            const basePrice = product.basePrice || product.price;

            // Normalize logic: Steps of 100
            // < 150 -> 100
            // 150 - 249 -> 200
            // 250 - 349 -> 300
            // Formula: Math.floor((price + 50) / 100) * 100
            let normalized = Math.floor((basePrice + 50) / 100) * 100;

            // Enforce ₹100 min and ₹2000 max
            normalized = Math.min(2000, Math.max(100, normalized));

            const shippingCharge = 50;
            const finalPrice = normalized + shippingCharge;

            product.basePrice = basePrice;
            product.normalizedPrice = normalized;
            product.shippingCharge = shippingCharge;
            product.finalPrice = finalPrice;

            // Also update the main 'price' field to match finalPrice for frontend compatibility
            product.price = finalPrice;

            // Calculate discount string for UI interest
            if (basePrice > finalPrice) {
                const discPerc = Math.round(((basePrice - finalPrice) / basePrice) * 100);
                product.discount = `${discPerc}% OFF`;
                product.oldPrice = basePrice;
            } else {
                product.discount = '';
                product.oldPrice = undefined;
            }

            await product.save();
            console.log(`Updated [${product.name}]: ₹${basePrice} -> ₹${finalPrice} (Normalized: ₹${normalized} + Shipping: ₹${shippingCharge})`);
        }

        console.log('Normalization complete.');
        process.exit(0);
    } catch (err) {
        console.error('Normalization failed:', err);
        process.exit(1);
    }
}

normalizeAllPrices();
