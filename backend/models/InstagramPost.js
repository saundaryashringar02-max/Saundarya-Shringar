const mongoose = require('mongoose');

const instagramPostSchema = new mongoose.Schema({
    caption: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Asset URL is required']
    },
    link: {
        type: String,
        default: 'https://www.instagram.com'
    },
    status: {
        type: String,
        enum: ['Show', 'Hide'],
        default: 'Show'
    }
}, { timestamps: true });

const InstagramPost = mongoose.model('InstagramPost', instagramPostSchema);

module.exports = InstagramPost;
