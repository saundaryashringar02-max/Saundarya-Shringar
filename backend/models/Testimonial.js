const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    text: {
        type: String,
        required: [true, 'Testimonial text is required']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    rating: {
        type: Number,
        default: 5
    },
    rotate: {
        type: String,
        default: 'rotate-2'
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Approved'
    }
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
