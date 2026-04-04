const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// All settings modified by admin
router.get('/', settingsController.getSettings);
router.patch('/update', protect, restrictTo('admin', 'super-admin'), settingsController.updateSettings);

module.exports = router;
