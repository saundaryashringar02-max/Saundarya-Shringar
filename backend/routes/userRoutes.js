const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', protect, restrictTo('admin', 'super-admin'), async (req, res, next) => {
    try {
        const users = await User.find({ role: 'customer' }).sort('-joinedDate').lean();
        res.status(200).json({ status: 'success', data: { users } });
    } catch (err) {
        next(err);
    }
});

router.get('/:id', protect, restrictTo('admin', 'super-admin'), async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).lean();
        if (!user) return res.status(404).json({ status: 'fail', message: 'User not found' });
        const orders = await Order.find({ user: user._id }).sort('-createdAt').lean();
        res.status(200).json({ status: 'success', data: { user, orders } });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', protect, restrictTo('admin', 'super-admin'), async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        next(err);
    }
});

router.patch('/update-me', protect, async (req, res, next) => {
    try {
        const { name, email, phone, address } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, { name, email, phone, address }, { new: true, runValidators: true });
        res.status(200).json({ status: 'success', data: { user } });
    } catch (err) {
        next(err);
    }
});

router.patch('/update-password', protect, async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id).select('+password');

        if (!user || !(await user.correctPassword(currentPassword, user.password))) {
            return res.status(401).json({ status: 'fail', message: 'Current password incorrect' });
        }

        user.password = newPassword;
        await user.save(); // pre-save hook will hash it

        res.status(200).json({ status: 'success', message: 'Password updated' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
