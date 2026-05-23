const Category = require('../models/Category');

// Public: Get all visible categories
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({ isVisible: true }).lean();
        res.status(200).json({ status: 'success', data: { categories } });
    } catch (err) {
        next(err);
    }
};

// Admin: Get all categories (including hidden)
exports.getAdminCategories = async (req, res, next) => {
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

// Admin: Toggle visibility
exports.toggleVisibility = async (req, res, next) => {
    try {
        const { isVisible } = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id, { isVisible }, { new: true, runValidators: true });
        if (!category) return res.status(404).json({ status: 'error', message: 'Category not found.' });

        // Cascade visibility update to all products in this category
        const Product = require('../models/Product');
        await Product.updateMany({ category: category.name }, { isVisible: isVisible });

        res.status(200).json({ status: 'success', data: { category } });
    } catch (err) {
        next(err);
    }
};
