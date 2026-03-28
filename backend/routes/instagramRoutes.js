const express = require('express');
const router = express.Router();
const instagramController = require('../controllers/instagramController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', instagramController.getAllPosts);

router.use(protect, restrictTo('admin', 'super-admin'));
router.get('/admin', instagramController.adminGetAllPosts);
router.post('/', instagramController.createPost);
router.patch('/:id', instagramController.updatePost);
router.delete('/:id', instagramController.deletePost);

module.exports = router;
