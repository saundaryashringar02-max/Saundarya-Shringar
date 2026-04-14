const Product = require('../models/Product');

/**
 * Recalculates and updates pricing for all products.
 * The heavy lifting (normalization + shipping) is now done in Product.js pre-save middleware.
 * We just need to trigger a save for every product.
 */
const syncAllProductPrices = async () => {
    const products = await Product.find();
    console.log(`Triggering pricing re-sync for ${products.length} products...`);

    // We mark field as modified and call save() 
    // to ensure the 'pre-save' middleware runs even if data didn't change.
    const updates = products.map(async (product) => {
        product.markModified('price');
        return product.save();
    });

    await Promise.all(updates);
    console.log('Product pricing sync complete.');
};

module.exports = { syncAllProductPrices };
