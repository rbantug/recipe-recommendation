import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

import makeRecipeDb from "./recipeDB.js";
import singleFakeRecipe from "../../__test__/fixtures/singleFakeRecipe.js";

///////////////////
// MONGODB
///////////////////

let uri

if(process.env.NODE_ENV === 'supertest') {
    const mongoServer = await MongoMemoryServer.create()
    uri = mongoServer.getUri()
} else {
    uri = "mongodb://superuser:superuser@localhost:6000/?authSource=admin&replicaSet=dbrs&readPreference=primary&directConnection=true&ssl=false"
}

const client = new MongoClient(uri)

async function run() {
    try {
        await client.connect();
        console.log("You are now connected to the DB")
        const db = client.db("mainDB");
        const recipesCollection = db.collection('recipes')
        return recipesCollection;
    } catch (e) {
        console.error(e.message)
        client.close();
    }
}

const recipesCollection = await run();

const recipesDB = makeRecipeDb({ recipesCollection })

if( process.env.NODE_ENV === 'supertest' ) {
    const insertOneRecipe = structuredClone(singleFakeRecipe)
    await recipesDB.insertManyRecipes([
        insertOneRecipe
    ])
}

export default recipesDB;