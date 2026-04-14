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
    estDeliveryDays: {
        type: String,
        default: '3-5 Business Days'
    },
    isCodEnabled: {
        type: Boolean,
        default: true
    },
    codCharge: {
        type: Number,
        default: 0
    },
    shippingPartner: {
        type: String,
        default: 'Standard Courier'
    },
    trackingUrl: {
        type: String,
        default: 'https://shiprocket.co/tracking/'
    },
    supportContact: {
        type: String,
        default: '+91 74071 75567'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
