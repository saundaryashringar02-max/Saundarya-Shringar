const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.post('/register', authController.register);
router.post('/admin-login', authController.adminLogin);
router.get('/me', protect, authController.getMe);
router.post('/save-fcm-token', protect, authController.saveFcmToken);

module.exports = router;
