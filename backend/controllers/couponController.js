const Coupon = require('../models/Coupon');

exports.getAllCoupons = async (req, res, next) => {
    try {
        const coupons = await Coupon.find().sort('-createdAt');
        res.status(200).json({ status: 'success', data: { coupons } });
    } catch (err) { next(err); }
};

exports.createCoupon = async (req, res, next) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.status(201).json({ status: 'success', data: { coupon: newCoupon } });
    } catch (err) { next(err); }
};

exports.updateCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ status: 'success', data: { coupon } });
    } catch (err) { next(err); }
};

exports.deleteCoupon = async (req, res, next) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (err) { next(err); }
};

exports.validateCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findOne({ code: req.body.code.toUpperCase(), isActive: true });
        if (!coupon || new Date(coupon.expiryDate) < new Date()) {
            return res.status(400).json({ status: 'error', message: 'Invalid or expired coupon' });
        }
        res.status(200).json({ status: 'success', data: { coupon } });
    } catch (err) { next(err); }
};
