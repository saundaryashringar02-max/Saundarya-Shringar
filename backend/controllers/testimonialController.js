const Testimonial = require('../models/Testimonial');

exports.getAllTestimonials = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find({ status: 'Approved' }).sort('-createdAt').lean();
        res.status(200).json({ status: 'success', results: testimonials.length, data: { testimonials } });
    } catch (err) {
        next(err);
    }
};

exports.adminGetAllTestimonials = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find().sort('-createdAt').lean();
        res.status(200).json({ status: 'success', data: { testimonials } });
    } catch (err) {
        next(err);
    }
};

exports.createTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.create(req.body);
        res.status(201).json({ status: 'success', data: { testimonial } });
    } catch (err) {
        next(err);
    }
};

exports.updateTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!testimonial) return res.status(404).json({ status: 'error', message: 'Testimonial not found.' });
        res.status(200).json({ status: 'success', data: { testimonial } });
    } catch (err) {
        next(err);
    }
};

exports.deleteTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) return res.status(404).json({ status: 'error', message: 'Testimonial not found.' });
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        next(err);
    }
};
