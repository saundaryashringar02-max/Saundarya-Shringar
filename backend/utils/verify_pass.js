const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const verifyAdminPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const email = 'customercare@saundaryashrinagar.com';
        const rawPassword = '1234';

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            console.log('User not found.');
            process.exit(1);
        }

        console.log('Comparing bcrypt ...');
        const isMatch = await bcrypt.compare(rawPassword, user.password);
        console.log(`Password: ${rawPassword}`);
        console.log(`Stored Hash: ${user.password}`);
        console.log(`Match Result: ${isMatch}`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verifyAdminPassword();
