const mongoose = require('mongoose');
require('dotenv').config();

const orderSchema = new mongoose.Schema({
    orderId: String,
    shippingAddress: mongoose.Schema.Types.Mixed
}, { strict: false });

const Order = mongoose.model('Order', orderSchema);

async function checkLatest() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const order = await Order.findOne().sort({ createdAt: -1 });
        console.log('Latest Order:', JSON.stringify(order, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkLatest();
