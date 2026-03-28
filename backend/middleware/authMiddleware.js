const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ status: 'error', message: 'Not logged in. Access denied.' });
        }

        // Verify token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ status: 'error', message: 'User no longer exists.' });
        }

        // Grant access
        req.user = currentUser;
        next();
    } catch (err) {
        next(err);
    }
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ status: 'error', message: 'Permission Denied.' });
        }
        next();
    };
};

module.exports = { protect, restrictTo };
