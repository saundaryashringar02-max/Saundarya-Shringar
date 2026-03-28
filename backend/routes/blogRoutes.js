const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', blogController.getAllBlogs);

router.use(protect, restrictTo('admin', 'super-admin'));
router.get('/admin', blogController.adminGetAllBlogs);
router.post('/', blogController.createBlog);
router.patch('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
