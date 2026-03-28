require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const adminExists = await User.findOne({ email: 'customercare@saundaryashringar.com' });
        if (adminExists) {
            console.log('Admin already exists.');
            process.exit();
        }

        await User.create({
            name: 'Trisha Mishra',
            email: 'customercare@saundaryashringar.com',
            password: 'admin@123',
            phone: '+91 9896472169',
            role: 'super-admin'
        });

        console.log('\x1b[32m%s\x1b[0m', '✓ Super Admin Created.');
        process.exit();
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', `✗ Admin Creation Failed: ${err.message}`);
        process.exit(1);
    }
};

createAdmin();
