const { MongoClient } = require("mongodb");
require("dotenv").config({ path: __dirname + "/config.env" });

async function main() {
    const DB = process.env.ATLAS_URI;
    const client = new MongoClient(DB);

    try {
        await client.connect();

        const collections = await client.db("compydb").collections();
        collections.forEach((collection) => {
            console.log(collection.collectionName);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();