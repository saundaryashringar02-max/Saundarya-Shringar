require('dotenv').config();

// Critical Environment Variable Checks
if (!process.env.JWT_SECRET) {
    console.error('\x1b[31m%s\x1b[0m', '✗ FATAL ERROR: JWT_SECRET is not defined in .env');
    process.exit(1);
}
if (!process.env.MONGODB_URI) {
    console.error('\x1b[31m%s\x1b[0m', '✗ FATAL ERROR: MONGODB_URI is not defined in .env');
    process.exit(1);
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Initialize Express
const app = express();

// Middleware Stack
app.use(helmet()); // Security headers
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map(o => o.trim());
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Cross-origin access blocked by professional security policy'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
})); // Refined cross-origin access with multi-origin support
app.use(compression()); // Compress responses
app.use(express.json({ limit: '50mb' })); // Body parser
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev')); // Request logging

// Connect to Database
connectDB();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const userRoutes = require('./routes/userRoutes');
const couponRoutes = require('./routes/couponRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const blogRoutes = require('./routes/blogRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const instagramRoutes = require('./routes/instagramRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Root API Route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Saundarya Shringar Backend API is operational',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/instagram', instagramRoutes);
app.use('/api/reviews', reviewRoutes);

// Centralized Error Handling Middleware (Professional Implementation)
app.use((err, req, res, next) => {
    // Detailed Console Logging for Developers
    console.error(`\x1b[31m%s\x1b[0m`, `● ERROR: ${err.name} - ${err.message}`);
    console.error(`\x1b[30m%s\x1b[0m`, err.stack);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        name: err.name,
        message: err.message,
        // Show stack trace in development only
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Port Configuration
const PORT = process.env.PORT || 5000;

// Start Server
const server = app.listen(PORT, () => {
    console.log(`\x1b[36m%s\x1b[0m`, `★ Saundarya Shringar Server Running on http://localhost:${PORT}`);
    console.log(`\x1b[33m%s\x1b[0m`, `→ Mode: ${process.env.NODE_ENV || 'development'}`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
    console.error(`\x1b[31m%s\x1b[0m`, `⚠ UNHANDLED REJECTION: ${err.message}`);
    server.close(() => process.exit(1));
});
