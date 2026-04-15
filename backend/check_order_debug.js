const mongoose = require('mongoose');
require('dotenv').config();

const orderSchema = new mongoose.Schema({
    orderId: String,
    shippingAddress: mongoose.Schema.Types.Mixed
}, { strict: false });

const Order = mongoose.model('Order', orderSchema);

async function checkOrder() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const order = await Order.findOne({ orderId: 'SS-881949' });
        console.log('Order found:', JSON.stringify(order, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkOrder();
