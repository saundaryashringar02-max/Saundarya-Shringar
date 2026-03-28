const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a product.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user.']
    },
    review: {
        type: String,
        required: [true, 'Review can not be empty!']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Review must have a rating.']
    },
    isApproved: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Avoid duplicate reviews from same user for same product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Static method to calculate average rating
reviewSchema.statics.calcAverageRatings = async function (productId) {
    // Dynamically require Product to avoid circular dependency
    const Product = mongoose.model('Product');
    const stats = await this.aggregate([
        {
            $match: { product: productId, isApproved: true }
        },
        {
            $group: {
                _id: '$product',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);

    if (stats.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            rating: Math.round(stats[0].avgRating * 10) / 10,
            reviews: stats[0].nRating
        });
    } else {
        await Product.findByIdAndUpdate(productId, {
            rating: 4.5,
            reviews: 0
        });
    }
};

reviewSchema.post('save', function () {
    this.constructor.calcAverageRatings(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.clone().findOne();
    next();
});

reviewSchema.post(/^findOneAnd/, async function () {
    if (this.r) await this.r.constructor.calcAverageRatings(this.r.product);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
