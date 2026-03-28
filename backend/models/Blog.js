const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        uppercase: true
    },
    excerpt: {
        type: String,
        required: [true, 'Excerpt is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    author: {
        type: String,
        default: 'Saundarya Shringar'
    },
    date: {
        type: String,
        default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()
    },
    readTime: {
        type: String,
        default: '5M'
    },
    status: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Published'
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
