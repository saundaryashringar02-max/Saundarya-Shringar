const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.post('/validate', couponController.validateCoupon); // Public check

router.use(protect, restrictTo('admin', 'super-admin'));
router.route('/')
    .get(couponController.getAllCoupons)
    .post(couponController.createCoupon);

router.route('/:id')
    .patch(couponController.updateCoupon)
    .delete(couponController.deleteCoupon);

module.exports = router;
