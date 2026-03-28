const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product must have a name'],
        trim: true,
        text: true // For full-text search
    },
    price: {
        type: Number,
        required: [true, 'Product must have a price']
    },
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
    about: [String]
}, { timestamps: true });

// Create text index for optimized searching
productSchema.index({ name: 'text', description: 'text', category: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
