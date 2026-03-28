const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', bannerController.getAllBanners);

router.use(protect, restrictTo('admin', 'super-admin'));
router.get('/all', bannerController.adminGetAllBanners);
router.post('/', bannerController.createBanner);
router.patch('/:id', bannerController.updateBanner);
router.delete('/:id', bannerController.deleteBanner);

module.exports = router;
