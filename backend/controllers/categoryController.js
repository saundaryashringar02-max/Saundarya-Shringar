const Category = require('../models/Category');

// Public: Get all categories
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().lean();
        res.status(200).json({ status: 'success', data: { categories } });
    } catch (err) {
        next(err);
    }
};

// Admin: Create category
exports.createCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({ status: 'success', data: { category } });
    } catch (err) {
        next(err);
    }
};

// Admin: Update category
exports.updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) return res.status(404).json({ status: 'error', message: 'Category not found.' });
        res.status(200).json({ status: 'success', data: { category } });
    } catch (err) {
        next(err);
    }
};

// Admin: Delete category
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ status: 'error', message: 'Category not found.' });
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        next(err);
    }
};
