const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        unique: true,
        trim: true,
        minlength: [6, 'Pincode must be exactly 6 characters'],
        maxlength: [6, 'Pincode must be exactly 6 characters'],
        match: [/^[0-9]{6}$/, 'Please provide a valid 6-digit Pincode']
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    district: {
        type: String,
        required: [true, 'District is required'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);
