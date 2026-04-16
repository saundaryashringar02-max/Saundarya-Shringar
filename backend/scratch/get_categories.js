const mongoose = require('mongoose');
require('dotenv').config();

const getCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const products = await mongoose.connection.db.collection('products').distinct('category');
        console.log('Categories:', products);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

getCategories();
