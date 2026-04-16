const Notification = require('../models/Notification');

// Customer: Get my notifications
exports.getMyNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ user: req.user._id })
            .sort('-createdAt')
            .limit(50);

        res.status(200).json({
            status: 'success',
            data: { notifications }
        });
    } catch (err) {
        next(err);
    }
};

// Customer: Mark notification as read
exports.markAsRead = async (req, res, next) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { read: true });
        res.status(200).json({ status: 'success' });
    } catch (err) {
        next(err);
    }
};

// Customer: Mark all as read
exports.markAllAsRead = async (req, res, next) => {
    try {
        await Notification.updateMany({ user: req.user._id, read: false }, { read: true });
        res.status(200).json({ status: 'success' });
    } catch (err) {
        next(err);
    }
};
