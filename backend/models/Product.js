const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product must have a name'],
        trim: true,
        text: true // For full-text search
    },
    brand: {
        type: String,
        trim: true,
        index: true
    },
    price: {
        type: Number,
        required: [true, 'Product must have a price'],
        min: [0, 'Price cannot be negative']
    },
    basePrice: Number,
    normalizedPrice: Number,
    shippingCharge: {
        type: Number,
        default: 50
    },
    finalPrice: Number,
    oldPrice: Number,
    discount: String, // e.g. "10%"
    rating: {
        type: Number,
        default: 4.5,
        min: 1,
        max: 5
    },
    reviews: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: [true, 'Product must have an image path']
    },
    gallery: [String], // Additional images for FRONT, SIDE, DETAIL views
    category: {
        type: String,
        required: [true, 'Product must belong to a category'],
        index: true
    },
    subCategory: {
        type: String,
        index: true
    },
    description: {
        type: String,
        trim: true
    },
    stock: {
        type: Number,
        default: 100
    },
    fastDelivery: {
        type: Boolean,
        default: false
    },
    cashback: {
        type: Boolean,
        default: false
    },
    flashSale: {
        type: Boolean,
        default: false
    },
    hasTimer: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'draft', 'archived'],
        default: 'active'
    },
    about: [String],
    skinType: {
        type: String,
        enum: ['Dry', 'Oily', 'Combination', 'Sensitive', 'All'],
        default: 'All'
    },
    skinConcern: {
        type: String,
        enum: ['Acne', 'Pigmentation', 'Anti-Aging', 'Glow', 'All'],
        default: 'All'
    },
    hasSizes: {
        type: Boolean,
        default: false
    },
    sizes: {
        type: [String],
        default: []
    }
}, { timestamps: true });

// Create text index for optimized searching
productSchema.index({ name: 'text', brand: 'text', description: 'text', category: 'text' });

// MIDDLEWARE: Logic to normalize pricing and add shipping charge
productSchema.pre('save', async function (next) {
    try {
        if (this.isModified('price') || this.isModified('basePrice') || this.isNew) {
            const Settings = mongoose.model('Settings');
            let settings = await Settings.findOne({ type: 'global' });
            const deliveryCharge = settings ? settings.deliveryCharge : 50;

            // 1. Determine base price (if user updated 'price', consider it the new base)
            const base = this.isModified('price') && !this.isModified('basePrice') ? this.price : (this.basePrice || this.price);

            // 2. Normalize logic
            let normalized = Math.floor((base + 50) / 100) * 100;
            normalized = Math.min(2000, Math.max(100, normalized));

            // 3. Set derived fields
            this.basePrice = base;
            this.normalizedPrice = normalized;
            this.shippingCharge = deliveryCharge;
            this.finalPrice = normalized + deliveryCharge;

            // 4. Update the main 'price' field to match finalPrice for frontend compatibility
            this.price = this.finalPrice;

            // 5. Update discount/oldPrice for UI
            if (base > this.finalPrice) {
                const discPerc = Math.round(((base - this.finalPrice) / base) * 100);
                this.discount = `${discPerc}% OFF`;
                this.oldPrice = base;
            } else {
                this.discount = '';
                this.oldPrice = undefined;
            }
        }
        next();
    } catch (err) {
        console.error('Error in pre-save middleware:', err);
        next(err);
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
