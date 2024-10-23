import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

let mongoServer;
let connection;
let db;

export async function connectDB() {
    try {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri()
        connection = await MongoClient.connect(uri);
        db = connection.db()
        const col = db.collection('mongo-test');
        return col
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function dropCollections() {
    try {
        await db.dropCollection('mongo-test')
    } catch (error) {
        console.log(error.message)
    }
}

export async function dropDB() {
    try {
        await db.dropDatabase()
        await connection.close()
        await mongoServer.stop()
    } catch (error) {
        console.log(error.message);
    }

}