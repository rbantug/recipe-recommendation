import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

let mongoServer;
let connection;
let db;

export async function connectDB() {
    try {
        mongoServer = await MongoMemoryServer.create();
        connection = await MongoClient.connect(mongoServer.getUri());
        console.log('Test DB is working');
        db = connection.db()
        const col = db.collection('test');
        return col
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function dropCollections() {
    try {
        const collectionCursor = db.listCollections()
        const collectionArr = await collectionCursor.toArray()
        if (collectionArr.length !== 0) {
            collectionArr.forEach(async (collection) => {
                try {
                    await db.dropCollection(`${collection.name}`)
                } catch (error) {
                    if (error.code === 26) {
                        console.log('collection not found');
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

export function dropDB() {
    setTimeout(async () => {
        try {
            await connection.close()
            await mongoServer.cleanup()
            await mongoServer.stop()
        } catch (error) {
            console.log(error.message);
        }
    }, 1000)
}