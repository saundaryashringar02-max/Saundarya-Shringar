const SupportTicket = require('../models/SupportTicket');

// Create a new support ticket
exports.createTicket = async (req, res, next) => {
    try {
        const { subject, description, priority, orderId } = req.body;
        
        const ticket = await SupportTicket.create({
            user: req.user.id,
            subject,
            description,
            priority: priority || 'Medium',
            orderId
        });

        res.status(201).json({
            status: 'success',
            data: { ticket }
        });
    } catch (err) {
        next(err);
    }
};

// Get my tickets (Customer)
exports.getMyTickets = async (req, res, next) => {
    try {
        const tickets = await SupportTicket.find({ user: req.user.id }).sort('-createdAt');
        res.status(200).json({
            status: 'success',
            results: tickets.length,
            data: { tickets }
        });
    } catch (err) {
        next(err);
    }
};

// Get all tickets (Admin)
exports.getAllTickets = async (req, res, next) => {
    try {
        const tickets = await SupportTicket.find().populate('user', 'name phone email').sort('-createdAt');
        res.status(200).json({
            status: 'success',
            results: tickets.length,
            data: { tickets }
        });
    } catch (err) {
        next(err);
    }
};

// Update ticket status (Admin)
exports.updateTicket = async (req, res, next) => {
    try {
        const { status, adminNote } = req.body;
        const ticket = await SupportTicket.findByIdAndUpdate(
            req.params.id, 
            { status, adminNote }, 
            { new: true, runValidators: true }
        );

        if (!ticket) return res.status(404).json({ status: 'error', message: 'Ticket not found.' });

        res.status(200).json({
            status: 'success',
            data: { ticket }
        });
    } catch (err) {
        next(err);
    }
};
