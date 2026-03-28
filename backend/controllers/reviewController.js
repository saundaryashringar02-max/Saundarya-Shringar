const Review = require('../models/Review');
const Order = require('../models/Order');

exports.createReview = async (req, res, next) => {
    try {
        const { product, review, rating } = req.body;
        const userId = req.user._id;

        // Verify if user has a delivered order for this product
        const hasOrdered = await Order.findOne({
            user: userId,
            status: 'Delivered',
            'items.product': product
        });

        if (!hasOrdered) {
            return res.status(403).json({
                status: 'error',
                message: 'Feedback is only permited for delivered purchases.'
            });
        }

        // Check if user already reviewed
        const existingReview = await Review.findOne({ product, user: userId });
        if (existingReview) {
            return res.status(400).json({
                status: 'error',
                message: 'Your voice has already been recorded for this asset.'
            });
        }

        const newReview = await Review.create({
            product,
            user: userId,
            review,
            rating
        });

        // NOTIFICATION: Admin - New Review Submission
        const notificationService = require('../utils/notificationService');
        notificationService.sendToAdmin({
            title: 'New Review Alert! ✍️',
            body: `${req.user.name} has left a review on your collection. Approval pending.`,
            data: { type: 'new_review', id: newReview._id.toString() }
        });

        res.status(201).json({
            status: 'success',
            data: { review: newReview }
        });
    } catch (err) {
        next(err);
    }
};

exports.getProductReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ product: req.params.productId, isApproved: true })
            .populate('user', 'name')
            .sort('-createdAt');

        res.status(200).json({
            status: 'success',
            count: reviews.length,
            data: { reviews }
        });
    } catch (err) {
        next(err);
    }
};

exports.getAllReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find()
            .populate('product', 'name image')
            .populate('user', 'name phone')
            .sort('-createdAt');

        res.status(200).json({
            status: 'success',
            count: reviews.length,
            data: { reviews }
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ status: 'error', message: 'Review not found.' });

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
};

exports.toggleApproval = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ status: 'error', message: 'Review not found.' });

        review.isApproved = !review.isApproved;
        await review.save();

        // NOTIFICATION: User - Review Approved
        if (review.isApproved) {
            const notificationService = require('../utils/notificationService');
            notificationService.sendToUser(review.user, {
                title: 'Review Published! ✨',
                body: `Thank you! Your feedback for the Sacred product is now live.`,
                data: { type: 'review_approved', id: review._id.toString() }
            });
        }

        res.status(200).json({
            status: 'success',
            data: { review }
        });
    } catch (err) {
        next(err);
    }
};

exports.canReview = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        const hasOrdered = await Order.findOne({
            user: userId,
            status: 'Delivered',
            'items.product': productId
        });

        const existingReview = await Review.findOne({ product: productId, user: userId });

        res.status(200).json({
            status: 'success',
            data: {
                canReview: !!hasOrdered && !existingReview
            }
        });
    } catch (err) {
        next(err);
    }
};
