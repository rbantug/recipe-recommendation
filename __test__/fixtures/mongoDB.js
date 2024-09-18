import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

let mongoServer;
let connection;

export async function connectDB() {
    try {
        mongoServer = await MongoMemoryServer.create();
        connection = await MongoClient.connect(mongoServer.getUri());

        console.log('Test DB is working');
        const db = connection.db()
        const col = db.collection('test');
        return col
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function dropCollections() {
    try {
        const collections = await connection.db().collections()
        if (collections.length !== 0) {
            collections.forEach(async (collection) => {
                try {
                    await collection.drop();
                } catch (error) {
                    if (error.code === 26) {
                        console.log('namespace not found', collection.collectionName);
                    } else {
                        throw error;
                    }
                }
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

export async function dropDB() {
    try {
        await connection.close()
        await mongoServer.cleanup({  })
        await mongoServer.stop()
    } catch (error) {
        console.log(error.message);
    }
}