const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true, // Allows null/missing for phone-only logins
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        unique: true,
        required: [true, 'Please provide a phone number'],
        trim: true
    },
    password: {
        type: String,
        select: false // Hide password by default
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'super-admin'],
        default: 'customer'
    },
    otp: String,
    otpExpires: Date,
    address: {
        type: String,
        trim: true
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    joinedDate: {
        type: Date,
        default: Date.now
    },
    fcmTokenWeb: {
        type: String,
        default: ''
    },
    fcmTokenApp: {
        type: String,
        default: ''
    },
    bankDetails: {
        accountName: String,
        bankName: String,
        accountNumber: String,
        ifscCode: String
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) return;
    this.password = await bcrypt.hash(this.password, 12);
});

// Compare password method
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
