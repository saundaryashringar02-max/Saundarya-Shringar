const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, uppercase: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
    discountValue: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    usageLimit: { type: Number, default: null }, // Null means unlimited
    usedCount: { type: Number, default: 0 },
    expiryDate: { type: Date, required: true }
}, { timestamps: true });

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
