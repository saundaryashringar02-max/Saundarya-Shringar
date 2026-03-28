const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Category image is required']
    },
    count: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
