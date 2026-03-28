const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', categoryController.getAllCategories);

// Admin Only
router.use(protect, restrictTo('admin', 'super-admin'));
router.post('/', categoryController.createCategory);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
