const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Public
router.get('/product/:productId', reviewController.getProductReviews);

// Protected (Customers only)
router.get('/can-review/:productId', protect, restrictTo('customer'), reviewController.canReview);
router.post('/', protect, restrictTo('customer'), reviewController.createReview);

// Admin / Super Admin (Management)
router.get('/', protect, restrictTo('admin', 'super-admin'), reviewController.getAllReviews);
router.patch('/:id/toggle-approval', protect, restrictTo('admin', 'super-admin'), reviewController.toggleApproval);
router.delete('/:id', protect, restrictTo('admin', 'super-admin'), reviewController.deleteReview);

module.exports = router;
