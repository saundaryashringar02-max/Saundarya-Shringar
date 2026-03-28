const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
        default: () => `SS-${Math.floor(100000 + Math.random() * 900000)}`
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Order must belong to a user']
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: String,
            price: Number,
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            image: String
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing'
    },
    shippingAddress: {
        name: String,
        phone: String,
        address: String
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    trackingId: String,
    returnStatus: {
        type: String,
        enum: ['Not Requested', 'Return Requested', 'Return Approved', 'Return Rejected', 'Returned', 'Replacement Requested', 'Replacement Approved', 'Replacement Rejected', 'Replaced'],
        default: 'Not Requested'
    },
    returnReason: String,
    returnAction: {
        type: String,
        enum: ['Refund', 'Replace', null],
        default: null
    },
    returnImages: [String],
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
