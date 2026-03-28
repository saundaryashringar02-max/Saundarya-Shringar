const Banner = require('../models/Banner');

exports.getAllBanners = async (req, res, next) => {
    try {
        const banners = await Banner.find({ status: 'Live' }).lean();
        res.status(200).json({ status: 'success', data: { banners } });
    } catch (err) {
        next(err);
    }
};

exports.adminGetAllBanners = async (req, res, next) => {
    try {
        const banners = await Banner.find().lean();
        res.status(200).json({ status: 'success', data: { banners } });
    } catch (err) {
        next(err);
    }
};

exports.createBanner = async (req, res, next) => {
    try {
        const banner = await Banner.create(req.body);
        res.status(201).json({ status: 'success', data: { banner } });
    } catch (err) {
        next(err);
    }
};

exports.updateBanner = async (req, res, next) => {
    try {
        const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!banner) return res.status(404).json({ status: 'error', message: 'Banner not found.' });
        res.status(200).json({ status: 'success', data: { banner } });
    } catch (err) {
        next(err);
    }
};

exports.deleteBanner = async (req, res, next) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.params.id);
        if (!banner) return res.status(404).json({ status: 'error', message: 'Banner not found.' });
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        next(err);
    }
};
