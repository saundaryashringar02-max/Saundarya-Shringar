const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB Connected');

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        for (const coll of ['testimonials', 'instagramposts', 'blogs', 'users']) {
            const docs = await db.collection(coll).find({}).toArray();
            console.log(`- ${coll}: ${docs.length} docs`);
            docs.forEach(d => {
                if (coll === 'users') {
                    console.log(`  - [${d.role}] ${d.phone || d.email} | TokenWeb: ${d.fcmTokenWeb ? 'YES' : 'NO'} | TokenApp: ${d.fcmTokenApp ? 'YES' : 'NO'}`);
                } else {
                    console.log(`  - [${d.status || 'NO STATUS'}] ${d.name || d.caption || d.title}`);
                }
            });
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();
