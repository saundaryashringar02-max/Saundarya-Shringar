const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Banner title is required'],
        trim: true
    },
    type: {
        type: String,
        enum: ['Main Slider', 'Mid-Section', 'Category Banner', 'Trending', 'Offers'],
        default: 'Main Slider'
    },
    image: {
        type: String,
        required: [true, 'Asset URL is required']
    },
    isVideo: {
        type: Boolean,
        default: false
    },
    res: {
        type: String,
        default: '1920x800'
    },
    status: {
        type: String,
        enum: ['Live', 'Draft', 'Archived'],
        default: 'Live'
    },
    subtitle: String,
    description: String,
    btnText: {
        type: String,
        default: 'SHOP NOW'
    },
    price: String,
    link: String
}, { timestamps: true });

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
