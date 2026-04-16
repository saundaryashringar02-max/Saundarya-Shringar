const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Customer Routes
router.post('/razorpay/create', orderController.captureRazorpayOrder);
router.post('/razorpay/verify', protect, orderController.verifyRazorpayPayment);
router.post('/', protect, orderController.createOrder);
router.get('/my-orders', protect, orderController.getMyOrders);
router.get('/track/:orderId', orderController.getOrder); // Public track via ID
router.patch('/:id/request-return', protect, orderController.requestReturn); // User RMA Request
router.patch('/:id/update-refund-details', protect, orderController.updateRefundDetails); // User Update Bank Details post-approval


// Admin Routes
router.use(protect, restrictTo('admin', 'super-admin'));
router.get('/', orderController.getAllOrders);
router.patch('/:id', orderController.updateOrderStatus);
router.patch('/:id/process-return', orderController.processReturnUpdate); // Admin RMA Resolution

module.exports = router;
