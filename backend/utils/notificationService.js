const admin = require('firebase-admin');
const User = require('../models/User');
const path = require('path');

// Initialize Firebase Admin
try {
    const serviceAccount = require('../config/saundarya-shringar.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('FCM Admin initialized');
} catch (error) {
    console.error('FCM init error:', error);
}

/**
 * Send notification to a specific user
 * @param {string} userId - ID of the user
 * @param {object} payload - { title, body, data }
 */
exports.sendToUser = async (userId, payload) => {
    try {
        const user = await User.findById(userId).select('fcmTokenWeb fcmTokenApp');
        if (!user) return;

        const tokens = [user.fcmTokenWeb, user.fcmTokenApp].filter(t => t && t !== '');
        if (tokens.length === 0) return;

        const message = {
            notification: {
                title: payload.title,
                body: payload.body,
            },
            data: payload.data || {},
            tokens: tokens,
        };

        const response = await admin.messaging().sendEachForMulticast(message);
        console.log(`Sent to user ${userId}: ${response.successCount} success, ${response.failureCount} fail`);
        if (response.failureCount > 0) {
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    console.error('FCM Error for token:', tokens[idx], resp.error);
                }
            });
        }
    } catch (error) {
        console.error('Error sending notification to user:', error);
    }
};

/**
 * Send notification to all admins
 * @param {object} payload - { title, body, data }
 */
exports.sendToAdmin = async (payload) => {
    try {
        const admins = await User.find({ role: { $in: ['admin', 'super-admin'] } }).select('fcmTokenWeb fcmTokenApp');

        let tokens = [];
        admins.forEach(adminUser => {
            if (adminUser.fcmTokenWeb) tokens.push(adminUser.fcmTokenWeb);
            if (adminUser.fcmTokenApp) tokens.push(adminUser.fcmTokenApp);
        });

        tokens = [...new Set(tokens)].filter(t => t && t !== '');
        if (tokens.length === 0) return;

        const message = {
            notification: {
                title: payload.title,
                body: payload.body,
            },
            data: payload.data || {},
            tokens: tokens,
        };

        const response = await admin.messaging().sendEachForMulticast(message);
        console.log(`Sent to admins: ${response.successCount} success, ${response.failureCount} fail`);
    } catch (error) {
        console.error('Error sending notification to admins:', error);
    }
};

/**
 * Broadcast notification to all users
 * @param {object} payload - { title, body, data }
 */
exports.broadcast = async (payload) => {
    try {
        // FCM Top-level topic
        const message = {
            topic: 'all',
            notification: {
                title: payload.title,
                body: payload.body,
            },
            data: payload.data || {},
        };

        await admin.messaging().send(message);
        console.log('Broadcast message sent');
    } catch (error) {
        console.error('Error broadcasting notification:', error);
    }
};
