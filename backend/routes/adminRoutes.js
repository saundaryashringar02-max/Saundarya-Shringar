const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.use(protect, restrictTo('admin', 'super-admin'));

router.get('/dashboard-stats', adminController.getDashboardStats);
router.get('/finance-stats', adminController.getFinanceStats);

module.exports = router;
