const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Standard Protection
router.use(protect);

// Customer Routes
router.post('/', ticketController.createTicket);
router.get('/my-tickets', ticketController.getMyTickets);

// Admin Routes
router.use(restrictTo('admin', 'super-admin'));
router.get('/', ticketController.getAllTickets);
router.patch('/:id', ticketController.updateTicket);

module.exports = router;
