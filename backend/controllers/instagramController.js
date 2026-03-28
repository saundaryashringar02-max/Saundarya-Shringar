const InstagramPost = require('../models/InstagramPost');

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await InstagramPost.find({ status: 'Show' }).sort('-createdAt').lean();
        res.status(200).json({ status: 'success', results: posts.length, data: { posts } });
    } catch (err) {
        next(err);
    }
};

exports.adminGetAllPosts = async (req, res, next) => {
    try {
        const posts = await InstagramPost.find().sort('-createdAt').lean();
        res.status(200).json({ status: 'success', data: { posts } });
    } catch (err) {
        next(err);
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const post = await InstagramPost.create(req.body);
        res.status(201).json({ status: 'success', data: { post } });
    } catch (err) {
        next(err);
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const post = await InstagramPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!post) return res.status(404).json({ status: 'error', message: 'Post not found.' });
        res.status(200).json({ status: 'success', data: { post } });
    } catch (err) {
        next(err);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const post = await InstagramPost.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ status: 'error', message: 'Post not found.' });
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        next(err);
    }
};
