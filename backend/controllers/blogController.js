const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({ status: 'Published' }).sort('-createdAt').lean();
        res.status(200).json({ status: 'success', results: blogs.length, data: { blogs } });
    } catch (err) {
        next(err);
    }
};

exports.adminGetAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().sort('-createdAt').lean();
        res.status(200).json({ status: 'success', data: { blogs } });
    } catch (err) {
        next(err);
    }
};

exports.createBlog = async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json({ status: 'success', data: { blog } });
    } catch (err) {
        next(err);
    }
};

exports.updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!blog) return res.status(404).json({ status: 'error', message: 'Blog not found.' });
        res.status(200).json({ status: 'success', data: { blog } });
    } catch (err) {
        next(err);
    }
};

exports.deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ status: 'error', message: 'Blog not found.' });
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        next(err);
    }
};
