const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Public Routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

// Admin Only Routes
router.use(protect, restrictTo('admin', 'super-admin'));
router.post('/', productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
