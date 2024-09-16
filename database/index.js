import { MongoClient } from "mongodb";

import makeRecipeDb from "./recipeDB.js";
import makeUserDb from "./userDB.js";

const uri = "mongodb://superuser:superuser@localhost:6000/?authSource=admin&replicaSet=dbrs&readPreference=primary&directConnection=true&ssl=false"

const client = new MongoClient(uri)

async function run() {
    try {
        await client.connect();
        console.log("You are now connected to the DB")
        const db = client.db("mainDB");
        const recipesCollection = db.collection('recipes')
        const usersCollection = db.collection('users')
        return { recipesCollection, usersCollection };
    } catch(e) {
        console.error(e.message)
        client.close();
    }
}

const collection = await run();

const recipesCollection = collection?.recipesCollection
const usersCollection = collection?.usersCollection

const recipesDB = makeRecipeDb({ recipesCollection }) 
const usersDB = makeUserDb({ usersCollection }) 

export default { recipesDB, usersDB };