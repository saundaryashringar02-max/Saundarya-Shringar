const Product = require('../models/Product');

// Public: Get all products with filters
exports.getAllProducts = async (req, res, next) => {
    try {
        const { category, subCategory, search, minPrice, maxPrice, sort, flashSale } = req.query;
        let query = { status: 'active' };

        if (category && category !== 'all') query.category = category;
        if (subCategory) query.subCategory = subCategory;
        if (flashSale === 'true') query.flashSale = true;
        if (search) query.$text = { $search: search };
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        let productsQuery = Product.find(query);

        // Sorting
        if (sort === 'Price: Low to High') productsQuery = productsQuery.sort('price');
        else if (sort === 'Price: High to Low') productsQuery = productsQuery.sort('-price');
        else if (sort === 'Top Rated') productsQuery = productsQuery.sort('-rating');
        else productsQuery = productsQuery.sort('-createdAt'); // Default: New Arrivals

        const products = await productsQuery.lean();

        res.status(200).json({ status: 'success', count: products.length, data: { products } });
    } catch (err) {
        next(err);
    }
};

// Public: Get single product
exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).lean();
        if (!product) return res.status(404).json({ status: 'error', message: 'Product not found.' });
        res.status(200).json({ status: 'success', data: { product } });
    } catch (err) {
        next(err);
    }
};

// Admin: Create product
exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({ status: 'success', data: { product: newProduct } });
    } catch (err) {
        next(err);
    }
};

// Admin: Update product
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ status: 'error', message: 'Product not found.' });

        // NOTIFICATION: Admin - Low Stock Alert
        if (product.stock < 10) {
            const notificationService = require('../utils/notificationService');
            notificationService.sendToAdmin({
                title: 'Low Stock Warning! ⚠️',
                body: `${product.name} is running low on stock. Only ${product.stock} units left!`,
                data: { type: 'low_stock', id: product._id.toString() }
            });
        }

        res.status(200).json({ status: 'success', data: { product } });
    } catch (err) {
        next(err);
    }
};

// Admin: Delete product
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ status: 'error', message: 'Product not found.' });
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        next(err);
    }
};
