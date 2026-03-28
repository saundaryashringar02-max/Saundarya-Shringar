const { MongoClient } = require('mongodb');
const uri = "mongodb://saundaryashringar02_db_user:fwR1GCkkgel6hfkT@ac-3emmyce-shard-00-00.kg3kpfi.mongodb.net:27017/?ssl=true&authSource=admin&directConnection=true";

async function run() {
    console.log("Connecting directly to shard 0...");
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    try {
        await client.connect();
        console.log("Connected successfully to shard!");
        const databases = await client.db().admin().listDatabases();
        console.log("Databases:", databases);
        process.exit(0);
    } catch (err) {
        console.error("Connection failed:", err.message);
        process.exit(1);
    } finally {
        await client.close();
    }
}
run();
