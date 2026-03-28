const notificationService = require('./utils/notificationService');
const User = require('./models/User');
const mongoose = require('mongoose');
require('dotenv').config();

const testNotification = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Testing Push Notification System...');

        // Find a user with a token
        const user = await User.findOne({ fcmTokenWeb: { $ne: '' } });
        if (!user) {
            console.log('No user found with a valid FCM token.');
            process.exit(0);
        }

        console.log(`Attempting to send notification to User: ${user.phone} (${user.role})`);

        // Test sendToUser
        await notificationService.sendToUser(user._id, {
            title: 'Saundarya Shringar - Test Alert',
            body: 'Hello! This is a test push notification to verify the system is operational. ✨',
            data: { type: 'test' }
        });

        console.log('Check the console output above for FCM success status.');

        // Optional: Test broadcast to all
        // console.log('Testing Broadcast to topic "all"...');
        // await notificationService.broadcast({
        //   title: 'Broadcast Test',
        //   body: 'Testing global broadcast.'
        // });

        mongoose.connection.close();
    } catch (err) {
        console.error('Test Failed:', err);
        process.exit(1);
    }
};

testNotification();
