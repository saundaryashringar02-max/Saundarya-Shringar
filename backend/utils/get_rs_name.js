const { MongoClient } = require('mongodb');
const uri = "mongodb://saundaryashringar02_db_user:fwR1GCkkgel6hfkT@ac-3emmyce-shard-00-00.kg3kpfi.mongodb.net:27017/?ssl=true&authSource=admin&directConnection=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const info = await client.db().admin().command({ hello: 1 });
        console.log("Replica Set Name:", info.setName);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    } finally {
        await client.close();
    }
}
run();
