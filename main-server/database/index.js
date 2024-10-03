import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

import makeRecipeDb from "./recipeDB.js";
import makeFakeRecipe from "../../__test__/fixtures/recipes.js";

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
    await recipesDB.insertManyRecipes([
        makeFakeRecipe({ id: 'asweddfsefsdsdf322fefs11'}),
        makeFakeRecipe({ id: 'e2hfgr20gtq6aii12llcoe9e'}),
        makeFakeRecipe({ id: '1wn9gd525sufv1s5mt5lh62z'}),
    ])
}

export default recipesDB;