require('dotenv').config();
const mongoose = require('mongoose');

const checkOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Order = mongoose.models.Order || mongoose.model('Order', new mongoose.Schema({ orderId: String, items: Array }));
        
        const ordersWithItems = await Order.find({ 'items.0': { $exists: true } }).limit(5);
        if (ordersWithItems.length === 0) {
            console.log('NONE_FOUND');
        } else {
            ordersWithItems.forEach(o => console.log(`Order: ${o.orderId}, Items: ${o.items.length}`));
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

checkOrders();
