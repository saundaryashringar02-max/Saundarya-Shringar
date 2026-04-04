const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'global',
        unique: true
    },
    taxRate: {
        type: Number,
        default: 18 // Default GST
    },
    deliveryCharge: {
        type: Number,
        default: 50
    },
    freeDeliveryThreshold: {
        type: Number,
        default: 1000
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
