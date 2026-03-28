const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', testimonialController.getAllTestimonials);

router.use(protect, restrictTo('admin', 'super-admin'));
router.get('/admin', testimonialController.adminGetAllTestimonials);
router.post('/', testimonialController.createTestimonial);
router.patch('/:id', testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
