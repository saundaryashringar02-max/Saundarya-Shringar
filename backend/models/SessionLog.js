const mongoose = require('mongoose');

const sessionLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ip: {
        type: String,
        default: 'Unknown'
    },
    device: {
        type: String,
        default: 'Unknown Device'
    },
    status: {
        type: String,
        enum: ['Success', 'Blocked', 'Failed'],
        default: 'Success'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 30 * 24 * 60 * 60 // Optional: automatically delete logs older than 30 days
    }
});

sessionLogSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('SessionLog', sessionLogSchema);
