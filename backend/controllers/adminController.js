const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

exports.getDashboardStats = async (req, res, next) => {
    try {
        const [totalUsers, totalOrders, pendingOrders, totalProducts] = await Promise.all([
            User.countDocuments({ role: 'customer' }),
            Order.countDocuments(),
            Order.countDocuments({ status: 'Processing' }),
            Product.countDocuments()
        ]);

        const orders = await Order.find({ paymentStatus: 'Completed' }).select('totalAmount');
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        res.status(200).json({
            status: 'success',
            data: {
                totalUsers,
                totalOrders,
                pendingOrders,
                totalProducts,
                totalRevenue: `₹${totalRevenue}`
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.getFinanceStats = async (req, res, next) => {
    try {
        // Daily revenue for the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const dailyRevenue = await Order.aggregate([
            {
                $match: {
                    paymentStatus: 'Completed',
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    revenue: { $sum: '$totalAmount' }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const stats = await Order.aggregate([
            {
                $group: {
                    _id: '$paymentStatus',
                    total: { $sum: '$totalAmount' },
                    count: { $sum: 1 }
                }
            }
        ]);

        const recentTransactions = await Order.find()
            .populate('user', 'name')
            .sort('-createdAt')
            .limit(10)
            .select('orderId user totalAmount paymentStatus createdAt');

        res.status(200).json({
            status: 'success',
            data: {
                stats,
                dailyRevenue,
                recentTransactions
            }
        });
    } catch (err) {
        next(err);
    }
};
