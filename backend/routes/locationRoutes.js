const express = require('express');
const { getLocations, createLocation, updateLocation, deleteLocation } = require('../controllers/locationController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getLocations);

// Admin Routes
router.use(protect, restrictTo('admin', 'super-admin'));
router.post('/', createLocation);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

module.exports = router;
