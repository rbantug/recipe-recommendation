import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

let mongoServer;
let connection;
let db;

export async function connectDB(collectionName) {
    try {
        mongoServer = await MongoMemoryServer.create();
        connection = await MongoClient.connect(mongoServer.getUri());
        console.log(`${collectionName} DB is working`);
        db = connection.db()
        db.collections
        const col = db.collection(collectionName);
        return col
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function dropCollections() {
    try {
        const collectionList = await db.collections()
        for(let x of collectionList) {
            await db.dropCollection(x)
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