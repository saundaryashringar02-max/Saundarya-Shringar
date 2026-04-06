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
            let updatePayload = {};
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    const errorToken = tokens[idx];
                    console.error('FCM Error for token:', errorToken, resp.error.code);
                    
                    // Cleanup: Remove invalid/unregistered tokens from DB
                    if (resp.error.code === 'messaging/registration-token-not-registered') {
                        if (errorToken === user.fcmTokenWeb) updatePayload.fcmTokenWeb = '';
                        if (errorToken === user.fcmTokenApp) updatePayload.fcmTokenApp = '';
                    }
                }
            });

            if (Object.keys(updatePayload).length > 0) {
                await User.findByIdAndUpdate(userId, { $set: updatePayload });
                console.log(`Cleaned up ${Object.keys(updatePayload).length} invalid tokens for user ${userId}`);
            }
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
        
        if (response.failureCount > 0) {
            for (let i = 0; i < response.responses.length; i++) {
                const resp = response.responses[i];
                if (!resp.success && resp.error.code === 'messaging/registration-token-not-registered') {
                    const errorToken = tokens[i];
                    await User.updateMany({ fcmTokenWeb: errorToken }, { $set: { fcmTokenWeb: '' } });
                    await User.updateMany({ fcmTokenApp: errorToken }, { $set: { fcmTokenApp: '' } });
                    console.log(`Global Clean Up: Removed dead token from admin archives.`);
                }
            }
        }
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
        // Fetch all users who have at least one token
        const users = await User.find({
            $or: [
                { fcmTokenWeb: { $exists: true, $ne: '' } },
                { fcmTokenApp: { $exists: true, $ne: '' } }
            ]
        }).select('fcmTokenWeb fcmTokenApp');

        let tokens = [];
        users.forEach(u => {
            if (u.fcmTokenWeb) tokens.push(u.fcmTokenWeb);
            if (u.fcmTokenApp) tokens.push(u.fcmTokenApp);
        });

        // Unique tokens only
        tokens = [...new Set(tokens)].filter(t => t && t !== '');

        if (tokens.length === 0) {
            console.log('No tokens found for broadcast');
            return;
        }

        const message = {
            notification: {
                title: payload.title,
                body: payload.body,
            },
            data: payload.data || {},
            tokens: tokens,
        };

        const response = await admin.messaging().sendEachForMulticast(message);
        console.log(`Broadcast success: ${response.successCount} users notified.`);

        if (response.failureCount > 0) {
            for (let i = 0; i < response.responses.length; i++) {
                const resp = response.responses[i];
                if (!resp.success && resp.error.code === 'messaging/registration-token-not-registered') {
                    const errorToken = tokens[i];
                    await User.updateMany({ fcmTokenWeb: errorToken }, { $set: { fcmTokenWeb: '' } });
                    await User.updateMany({ fcmTokenApp: errorToken }, { $set: { fcmTokenApp: '' } });
                    console.log(`Global Clean Up: Removed dead token during broad broadcast.`);
                }
            }
        }
    } catch (error) {
        console.error('Error broadcasting notification:', error);
    }
};
