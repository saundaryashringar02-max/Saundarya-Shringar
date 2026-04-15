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
    subTotal: Number,
    taxAmount: Number,
    shippingAmount: Number,
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
        email: String,
        phone: String,
        address: String,
        city: String,
        district: String,
        state: String,
        pincode: String
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['PayNow', 'COD'],
        default: 'PayNow'
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
    refundAccountDetails: {
        accountName: String,
        bankName: String,
        accountNumber: String,
        ifscCode: String
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    couponApplied: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    },
    statusHistory: {
        type: [
            {
                status: String,
                timestamp: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        default: () => [{ status: 'Processing', timestamp: new Date() }]
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
