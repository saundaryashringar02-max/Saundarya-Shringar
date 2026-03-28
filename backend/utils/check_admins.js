const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const checkAdmins = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const admins = await User.find({ role: 'admin' });
        console.log('Admins list:');
        admins.forEach(u => {
            console.log(`- ${u.email} (Role: ${u.role}, Name: ${u.name})`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkAdmins();
