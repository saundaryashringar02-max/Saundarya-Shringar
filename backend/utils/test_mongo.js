const { MongoClient } = require('mongodb');
const uri = "mongodb://saundaryashringar02_db_user:fwR1GCkkgel6hfkT@ac-3emmyce-shard-00-00.kg3kpfi.mongodb.net:27017,ac-3emmyce-shard-00-01.kg3kpfi.mongodb.net:27017,ac-3emmyce-shard-00-02.kg3kpfi.mongodb.net:27017/?ssl=true&replicaSet=atlas-3emmyce-shard-0&authSource=admin";

async function run() {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    try {
        console.log("Connecting...");
        await client.connect();
        console.log("Connected successfully to server");
        const databases = await client.db().admin().listDatabases();
        console.log("Databases:", databases);
    } catch (err) {
        console.error("Connection failed:", err.message);
    } finally {
        await client.close();
    }
}
run();
