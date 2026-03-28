const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB.');

        const email = 'customercare@saundaryashrinagar.com';
        const password = '1234';
        const name = 'Saundarya Admin';
        const role = 'admin';

        // Check if admin already exists
        let admin = await User.findOne({ email });

        if (admin) {
            console.log('Admin already exists. Updating password and role...');
            admin.password = password;
            admin.role = role;
            admin.name = name;
            await admin.save();
            console.log('Admin updated successfully.');
        } else {
            console.log('Creating new admin...');
            admin = await User.create({
                name,
                email,
                password,
                role,
                phone: '0000000000' // Placeholder phone
            });
            console.log('Admin created successfully.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error creating admin:', err.message);
        process.exit(1);
    }
};

createAdmin();
