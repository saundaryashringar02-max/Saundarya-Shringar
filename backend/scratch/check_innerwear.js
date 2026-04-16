const mongoose = require('mongoose');
require('dotenv').config();

const checkInnerwear = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const count = await mongoose.connection.db.collection('products').countDocuments({ category: 'Innerwear' });
        console.log('Innerwear Product Count:', count);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkInnerwear();
