const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');
const crypto = require('crypto');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '90d'
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    user.password = undefined; // Remove password from output

    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user }
    });
};

// Customer Auth: Send OTP
exports.sendOtp = async (req, res, next) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ status: 'error', message: 'Phone number required.' });

        // Boolean condition for REAL OTP vs DEFAULT
        const USE_SMSHUB = String(process.env.USE_REAL_OTP).toLowerCase() === 'true';

        // Generate 6-digit OTP (Hardcoded for Master Testing Account)
        let otpCode;
        if (phone === '9999900000') {
            otpCode = '123456';
        } else {
            otpCode = USE_SMSHUB ? Math.floor(100000 + Math.random() * 900000).toString() : '123456';
        }

        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Find or create user to store OTP
        let user = await User.findOne({ phone });
        if (!user) {
            if (req.body.isLogin) {
                return res.status(404).json({ status: 'error', message: 'Phone number not registered. Please sign up first.' });
            }
            user = new User({ phone, role: 'customer', name: 'Valued Customer' });
        }

        user.otp = otpCode;
        user.otpExpires = otpExpires;
        await user.save({ validateBeforeSave: false });

        if (USE_SMSHUB) {
            const apiKey = process.env.SMSINDIAHUB_API_KEY;
            const senderId = process.env.SMSINDIAHUB_SENDER_ID;
            const message = `Welcome to Saundarya Shringar Powered by IIDMTB. Use OTP ${otpCode} to verify your login.`;

            if (!apiKey || !senderId) {
                return res.status(500).json({
                    status: 'error',
                    message: 'OTP service not configured. Please contact support.'
                });
            }

            // Standard SMSIndiaHub Push API
            const url = `http://cloud.smsindiahub.in/vendorsms/pushsms.aspx?APIKey=${apiKey}&msisdn=${phone}&sid=${senderId}&msg=${encodeURIComponent(message)}&fl=0&gwid=2`;

            try {
                await axios.get(url, { timeout: 10000 });
                console.log(`★ Real OTP Sent to ${phone}`);
            } catch (smsErr) {
                console.error('SMS Send Error:', smsErr.message);
                return res.status(502).json({
                    status: 'error',
                    message: 'OTP send failed. Please try again in a few moments.'
                });
            }
        } else {
            console.log(`\x1b[33m%s\x1b[0m`, `★ OTP Sent to ${phone}: ${otpCode} (MOCK)`);
        }

        res.status(200).json({ status: 'success', message: 'OTP sent to mobile number.' });
    } catch (err) {
        next(err);
    }
};

// Customer Auth: Verify OTP
exports.verifyOtp = async (req, res, next) => {
    try {
        const { phone, otp, name } = req.body;
        if (!phone || !otp) return res.status(400).json({ status: 'error', message: 'Phone and OTP required.' });

        let user;
        if (phone === '9999900000' && otp === '123456') {
            user = await User.findOne({ phone });
            if (!user) {
                user = await User.create({ phone, role: 'customer', name: 'Master Tester' });
            }
        } else {
            user = await User.findOne({
                phone,
                otp,
                otpExpires: { $gt: Date.now() }
            });
        }

        if (!user) return res.status(401).json({ status: 'error', message: 'Invalid or expired OTP.' });

        const isNewUser = (user.name === 'Valued Customer');
        if (isNewUser && name) user.name = name;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        if (isNewUser) {

            // NOTIFICATION: User - Welcome
            const notificationService = require('../utils/notificationService');
            notificationService.sendToUser(user._id, {
                title: 'Welcome to Saundarya Shringar! ✨',
                body: `Hello ${user.name}, thank you for joining our community of natural beauty.`,
                data: { type: 'welcome' }
            });

            // NOTIFICATION: Admin - New User
            notificationService.sendToAdmin({
                title: 'New Member Joined! 👤',
                body: `${user.name} (${user.phone}) has registered as a customer.`,
                data: { type: 'new_registration', id: user._id.toString() }
            });
        }

        createSendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// Admin/General Auth: Register
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, phone, role } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            phone,
            role: role || 'customer' // Defaults to customer unless specified
        });

        // NOTIFICATION: User - Welcome
        const notificationService = require('../utils/notificationService');
        notificationService.sendToUser(user._id, {
            title: 'Welcome to Saundarya Shringar! ✨',
            body: `Hello ${user.name}, thank you for joining our community of natural beauty.`,
            data: { type: 'welcome' }
        });

        // NOTIFICATION: Admin - New User
        notificationService.sendToAdmin({
            title: 'New Member Joined! 👤',
            body: `${user.name} (${user.email || user.phone}) has registered as a ${user.role}.`,
            data: { type: 'new_registration', id: user._id.toString() }
        });

        createSendToken(user, 201, res);
    } catch (err) {
        next(err);
    }
};

// Admin Auth: Login
exports.adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ status: 'error', message: 'Email and password required.' });

        console.log(`[DEBUG] Attempting admin login for: ${email}`);
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            console.log(`[DEBUG] No user found with email: ${email}`);
            return res.status(401).json({ status: 'error', message: 'Incorrect email or password.' });
        }

        const isMatch = await user.correctPassword(password, user.password);
        console.log(`[DEBUG] Password Match Result: ${isMatch}`);

        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Incorrect email or password.' });
        }

        console.log(`[DEBUG] User Role: ${user.role}`);
        if (user.role !== 'admin' && user.role !== 'super-admin') {
            console.log(`[DEBUG] Role check failed: ${user.role}`);
            return res.status(403).json({ status: 'error', message: 'Unauthorized access.' });
        }

        createSendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// Get User Profile
exports.getMe = async (req, res, next) => {
    res.status(200).json({ status: 'success', data: { user: req.user } });
};

// Save FCM Token (Web or App)
exports.saveFcmToken = async (req, res, next) => {
    try {
        const { token, platform } = req.body;
        if (!token) return res.status(400).json({ status: 'error', message: 'Token required.' });

        let updateData = {};
        if (platform === 'app') {
            updateData.fcmTokenApp = token;
        } else {
            updateData.fcmTokenWeb = token;
        }

        await User.findByIdAndUpdate(req.user._id, updateData);
        res.status(200).json({ status: 'success', message: 'FCM Token saved successfully.' });
    } catch (err) {
        next(err);
    }
};
