import { MongoClient } from "mongodb";
import { createClient } from "valkey";

import makeUserDb from "./userDB.js";

///////////////////
// MONGODB
///////////////////

let uri

if(process.env.NODE_ENV === 'supertest') {
    uri = 'mongodb://localhost:7000'
} else {
    uri = "mongodb://superuser:superuser@localhost:6000/?authSource=admin&replicaSet=dbrs&readPreference=primary&directConnection=true&ssl=false"
}

const client = new MongoClient(uri)

async function run() {
    try {
        await client.connect();
        console.log("You are now connected to the DB")
        const db = client.db("mainDB");
        const usersCollection = db.collection('users')
        return usersCollection;
    } catch(e) {
        console.error(e.message)
        client.close();
    }
}

const usersCollection = await run();
 
const usersDB = makeUserDb({ usersCollection })

///////////////////
// VALKEY
///////////////////

// TODO: Make valkey work

const valkeyClient = createClient({
    socket: {
        host: 'objective_wilbur',
        port: 6379
    }
})

valkeyClient
    .on('error', err => console.log('Valkey Client Error', err))
    .connect()

// username valkey
// password myPass    

export default { usersDB };