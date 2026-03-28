const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\x1b[32m%s\x1b[0m`, `✓ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`\x1b[31m%s\x1b[0m`, `✗ Error Connecting to MongoDB: ${error.message}`);
        // Exit process with failure if initial connection fails
        process.exit(1);
    }
};

module.exports = connectDB;
