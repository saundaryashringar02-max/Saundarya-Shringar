const Order = require('../models/Order');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const notificationService = require('../utils/notificationService');
const Notification = require('../models/Notification');


let razorpay;
const getRazorpayInstance = () => {
    if (!razorpay) {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            throw new Error('Razorpay Keys are missing in Environment Variables (.env)');
        }
        razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    return razorpay;
};

// Customer: Capture Razorpay Order (Step 1)
exports.captureRazorpayOrder = async (req, res, next) => {
    try {
        const instance = getRazorpayInstance();
        const { amount } = req.body;
        if (!amount) return res.status(400).json({ status: 'error', message: 'Amount is required' });

        const options = {
            amount: Math.round(amount * 100), // convert to paise
            currency: 'INR',
            receipt: `rcpt_${Math.floor(Math.random() * 1000000)}`,
        };

        const order = await instance.orders.create(options);
        res.status(200).json({ status: 'success', data: { order } });
    } catch (err) {
        next(err);
    }
};

// Customer: Verify Razorpay Payment & Save Order (Step 2)
exports.verifyRazorpayPayment = async (req, res, next) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderDetails
        } = req.body;

        // Signature Verification
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ status: 'error', message: 'Payment verification failed (Invalid Signature)' });
        }

        // Create Order in DB
        const newOrder = await Order.create({
            user: req.user._id,
            items: orderDetails.items,
            subTotal: orderDetails.subTotal,
            taxAmount: orderDetails.taxAmount,
            taxRate: orderDetails.taxRate,
            shippingAmount: orderDetails.shippingAmount,
            actualShippingAmount: orderDetails.actualShippingAmount || orderDetails.shippingAmount,
            totalAmount: orderDetails.totalAmount,
            shippingAddress: orderDetails.shippingAddress,
            paymentStatus: 'Completed',
            paymentMethod: 'PayNow',
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            couponApplied: orderDetails.couponCode || null
        });

        // Decrement Stock
        for (const item of orderDetails.items) {
            if (item.product) {
                await Product.findByIdAndUpdate(item.product, { $inc: { stock: -Math.abs(item.quantity || 1) } });
            }
        }

        if (orderDetails.couponCode) {
            await Coupon.findOneAndUpdate({ code: orderDetails.couponCode.toUpperCase() }, { $inc: { usedCount: 1 } });
        }

        // NOTIFICATION: Admin - New Prepaid Order
        notificationService.sendToAdmin({
            title: 'New Prepaid Order! 💰',
            body: `${req.user.name} placed a new order for ₹${newOrder.totalAmount} (Razorpay).`,
            data: { type: 'new_order', id: newOrder._id.toString() }
        });

        res.status(201).json({ status: 'success', data: { order: newOrder } });
    } catch (err) {
        next(err);
    }
};

// Customer: Initiate PayU Payment (Hash Generation & Create Pending Order)
exports.initiatePayuPayment = async (req, res, next) => {
    try {
        const { orderDetails } = req.body;
        
        if (!orderDetails || !orderDetails.totalAmount) {
            return res.status(400).json({ status: 'error', message: 'Missing order details' });
        }

        const key = process.env.PAYU_MERCHANT_KEY;
        const salt = process.env.PAYU_MERCHANT_SALT;
        const txnid = 'txn_' + crypto.randomBytes(8).toString('hex');

        const amount = orderDetails.totalAmount;
        const firstname = (orderDetails.shippingAddress?.name || req.user.name || 'User').split(' ')[0];
        const email = orderDetails.shippingAddress?.email || req.user.email;
        const phone = orderDetails.shippingAddress?.phone || req.user.phone || '9999999999';
        const productinfo = 'Saundarya Shringar Order';

        // Create Pending Order in DB
        const newOrder = await Order.create({
            user: req.user._id,
            items: orderDetails.items,
            subTotal: orderDetails.subTotal,
            taxAmount: orderDetails.taxAmount,
            taxRate: orderDetails.taxRate,
            shippingAmount: orderDetails.shippingAmount,
            actualShippingAmount: orderDetails.actualShippingAmount || orderDetails.shippingAmount,
            totalAmount: amount,
            shippingAddress: orderDetails.shippingAddress,
            paymentStatus: 'Pending',
            paymentMethod: 'PayNow',
            payuTransactionId: txnid, 
            couponApplied: orderDetails.couponCode || null
        });

        // Hash Formula: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|salt
        const udf1 = newOrder._id.toString();
        const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}||||||||||${salt}`;
        const hash = crypto.createHash('sha512').update(hashString).digest('hex');

        res.status(200).json({ 
            status: 'success', 
            data: { key, txnid, amount, productinfo, firstname, email, phone, udf1, hash, orderId: newOrder._id } 
        });
    } catch (err) {
        next(err);
    }
};

// Customer: Verify PayU Payment (Callback)
exports.payuCallback = async (req, res, next) => {
    try {
        const {
            mihpayid, status, txnid, amount, productinfo, firstname, email,
            udf1, hash
        } = req.body;

        const key = process.env.PAYU_MERCHANT_KEY;
        const salt = process.env.PAYU_MERCHANT_SALT;

        // Reverse hash: salt|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
        const reverseHashString = `${salt}|${status}||||||||||${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
        const generatedHash = crypto.createHash('sha512').update(reverseHashString).digest('hex');

        if (hash !== generatedHash) {
            return res.redirect(`${process.env.FRONTEND_URL}/checkout?error=PaymentVerificationFailed`);
        }

        const order = await Order.findById(udf1).populate('user');
        if (!order) {
            return res.redirect(`${process.env.FRONTEND_URL}/checkout?error=OrderNotFound`);
        }

        if (status === 'success' && order.paymentStatus !== 'Completed') {
            order.paymentStatus = 'Completed';
            order.payuTransactionId = mihpayid || txnid;
            await order.save();

            // Decrement Stock
            for (const item of order.items) {
                if (item.product) {
                    await Product.findByIdAndUpdate(item.product, { $inc: { stock: -Math.abs(item.quantity || 1) } });
                }
            }

            if (order.couponApplied) {
                await Coupon.findOneAndUpdate({ code: order.couponApplied.toUpperCase() }, { $inc: { usedCount: 1 } });
            }

            // NOTIFICATION
            notificationService.sendToAdmin({
                title: 'New Prepaid Order! 💰',
                body: `${order.user?.name || 'A user'} placed a new order for ₹${order.totalAmount} (PayU).`,
                data: { type: 'new_order', id: order._id.toString() }
            });

            return res.redirect(`${process.env.FRONTEND_URL}/profile?payment=success`);
        } else if (status !== 'success') {
            order.paymentStatus = 'Failed';
            await order.save();
            return res.redirect(`${process.env.FRONTEND_URL}/checkout?error=PaymentFailed`);
        } else {
            // Already processed
            return res.redirect(`${process.env.FRONTEND_URL}/profile?payment=success`);
        }
    } catch (err) {
        console.error('PayU Callback Error:', err);
        return res.redirect(`${process.env.FRONTEND_URL}/checkout?error=ServerError`);
    }
};

// Customer: Create Order (COD/Legacy flow)
exports.createOrder = async (req, res, next) => {
    try {
        const { items, totalAmount, shippingAddress } = req.body;
        if (!items || items.length === 0) return res.status(400).json({ status: 'error', message: 'Order items are required.' });

        const newOrder = await Order.create({
            user: req.user._id,
            items,
            subTotal: req.body.subTotal,
            taxAmount: req.body.taxAmount,
            taxRate: req.body.taxRate,
            shippingAmount: req.body.shippingAmount,
            actualShippingAmount: req.body.actualShippingAmount || req.body.shippingAmount,
            totalAmount,
            shippingAddress,
            paymentMethod: 'COD',
            couponApplied: req.body.couponCode || null
        });

        // Decrement Stock & Increment Coupon
        for (const item of items) {
            if (item.product || item._id) {
                await Product.findByIdAndUpdate(item.product || item._id, { $inc: { stock: -Math.abs(item.quantity || 1) } });
            }
        }

        if (req.body.couponCode) {
            await Coupon.findOneAndUpdate({ code: req.body.couponCode.toUpperCase() }, { $inc: { usedCount: 1 } });
        }

        // NOTIFICATION: Admin - New COD Order
        notificationService.sendToAdmin({
            title: 'New Order Received! 🛍️',
            body: `${req.user.name} has placed a new COD order for ₹${newOrder.totalAmount}.`,
            data: { type: 'new_order', id: newOrder._id.toString() }
        });

        res.status(201).json({ status: 'success', data: { order: newOrder } });
    } catch (err) {
        next(err);
    }
};

// Customer: Get my orders
exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort('-date').lean();
        res.status(200).json({ status: 'success', data: { orders } });
    } catch (err) {
        next(err);
    }
};

// Public/Customer: Track Order
exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId }).populate('user', 'name email phone').lean();
        if (!order) return res.status(404).json({ status: 'error', message: 'Order not found.' });
        res.status(200).json({ status: 'success', data: { order } });
    } catch (err) {
        next(err);
    }
};

// Admin: Get all orders
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('user', 'name email phone').sort('-date').lean();
        res.status(200).json({ status: 'success', data: { orders } });
    } catch (err) {
        next(err);
    }
};

// Admin: Update Status
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { status, trackingId, paymentStatus } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ status: 'error', message: 'Order not found.' });

        const oldStatus = order.status;

        // Prevent moving backwards in status
        if (status && status !== oldStatus) {
            const statusFlow = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
            const currentIndex = statusFlow.indexOf(oldStatus);
            const nextIndex = statusFlow.indexOf(status);

            if (nextIndex < currentIndex && status !== 'Cancelled') {
                return res.status(400).json({
                    status: 'error',
                    message: `Cannot change status from ${oldStatus} to ${status}.`
                });
            }

            order.status = status;
            order.statusHistory.push({ status, timestamp: new Date() });

            // NOTIFICATION: User - Order Status Updated
            const title = 'Order Status Update! ✨';
            const body = `Your order ${order.orderId} is now ${status}.`

            notificationService.sendToUser(order.user, {
                title,
                body,
                data: { type: 'order_status', id: order._id.toString() }
            });

            await Notification.create({
                user: order.user,
                title,
                body,
                type: 'order_status',
                data: { orderId: order.orderId, id: order._id.toString() }
            });

        }

        if (trackingId !== undefined) order.trackingId = trackingId;
        if (paymentStatus !== undefined) order.paymentStatus = paymentStatus;

        await order.save();

        // DYNAMIC RESTOCKING: Add back to stock if order is Cancelled
        if (status === 'Cancelled' && oldStatus !== 'Cancelled') {
            try {
                for (const item of order.items) {
                    if (item.product) {
                        await Product.findByIdAndUpdate(
                            item.product,
                            { $inc: { stock: Math.abs(item.quantity || 1) } }
                        );
                    }
                }
            } catch (stockErr) {
                console.error("Restocking failure on cancellation:", stockErr);
            }
        }

        res.status(200).json({ status: 'success', data: { order } });
    } catch (err) {
        next(err);
    }
};

// Customer: Request Return/Replacement
exports.requestReturn = async (req, res, next) => {
    try {
        const { returnReason, returnAction, returnImages, refundAccountDetails } = req.body;
        if (!['Refund', 'Replace'].includes(returnAction)) return res.status(400).json({ status: 'error', message: 'Invalid Action' });

        const statusMap = returnAction === 'Replace' ? 'Replacement Requested' : 'Return Requested';
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id, status: 'Delivered' },
            { returnReason, returnAction, returnStatus: statusMap, returnImages: returnImages || [], refundAccountDetails },
            { new: true, runValidators: true }
        );

        if (!order) return res.status(404).json({ status: 'error', message: 'Eligible Delivered Order not found or Unauthorised.' });

        // NOTIFICATION: Admin - New RMA Request
        notificationService.sendToAdmin({
            title: 'New Return Request! ⚠️',
            body: `${req.user.name} requested a ${returnAction} for Order ${order.orderId}.`,
            data: { type: 'rma_request', id: order._id.toString() }
        });

        res.status(200).json({ status: 'success', data: { order } });
    } catch (err) { next(err); }
};

// Admin: Process Return/Replacement Status
exports.processReturnUpdate = async (req, res, next) => {
    try {
        const { returnStatus } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { returnStatus }, { new: true, runValidators: true });
        if (!order) return res.status(404).json({ status: 'error', message: 'Order not found.' });

        let title = 'Return Status Update! ✨';
        let body = `Your return for order ${order.orderId} is now: ${returnStatus}.`;

        if (returnStatus === 'Return Approved') {
            title = 'Action Required: Refund Details 🏦';
            body = "Please fill your account details for return/refund process.";
        } else if (returnStatus === 'Returned') {
            title = 'Refund Processed! 💰';
            body = `The refund for your order ${order.orderId} has been successfully processed. Check your bank account soon!`;
        }

        // Send Push Notification
        notificationService.sendToUser(order.user, {
            title,
            body,
            data: { type: 'rma_status', id: order._id.toString() }
        });

        // Save In-App Notification
        await Notification.create({
            user: order.user,
            title,
            body,
            type: 'rma_status',
            data: { orderId: order.orderId, id: order._id.toString(), status: returnStatus }
        });

        res.status(200).json({ status: 'success', data: { order } });
    } catch (err) { next(err); }
};

// Customer: Update Refund Details (After Approval)
exports.updateRefundDetails = async (req, res, next) => {
    try {
        const { refundAccountDetails } = req.body;
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id, returnStatus: 'Return Approved' },
            { refundAccountDetails },
            { new: true, runValidators: true }
        );

        if (!order) return res.status(404).json({ status: 'error', message: 'Order not found or not in Approved state.' });

        res.status(200).json({ status: 'success', data: { order } });
    } catch (err) { next(err); }
};

