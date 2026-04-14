const Location = require('../models/Location');

// Get all locations
exports.getLocations = async (req, res) => {
    try {
        const locations = await Location.find().sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: { locations } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Create new location
exports.createLocation = async (req, res) => {
    try {
        const { pincode, city, district, state } = req.body;

        const existing = await Location.findOne({ pincode });
        if (existing) {
            return res.status(400).json({ status: 'error', message: 'Pincode already exists.' });
        }

        const location = await Location.create({ pincode, city, district, state });
        res.status(201).json({ status: 'success', data: { location } });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};

// Update location
exports.updateLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!location) {
            return res.status(404).json({ status: 'error', message: 'Location not found' });
        }
        res.status(200).json({ status: 'success', data: { location } });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};

// Delete location
exports.deleteLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        if (!location) {
            return res.status(404).json({ status: 'error', message: 'Location not found' });
        }
        res.status(200).json({ status: 'success', message: 'Location deleted successfully' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};
