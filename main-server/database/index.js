import { MongoClient } from "mongodb";

import makeRecipeDb from "./recipeDB.js";
import { connectDB } from "../../__test__/fixtures/mongoDB.js";

///////////////////
// MONGODB
///////////////////

let recipesCollection;
let recipesDB;

if(process.env.NODE_ENV !== "supertest") {
    const uri = "mongodb://superuser:superuser@localhost:6000/?authSource=admin&replicaSet=dbrs&readPreference=primary&directConnection=true&ssl=false"
    
    const client = new MongoClient(uri)
    
    async function run() {
        try {
            await client.connect();
            console.log("You are now connected to the DB")
            const db = client.db("mainDB");
            const recipesCollection = db.collection('recipes')
            return recipesCollection;
        } catch(e) {
            console.error(e.message)
            client.close();
        }
    }
    
    const recipesCollection = await run();
    
    recipesDB = makeRecipeDb({ recipesCollection }) 
} else {
    recipesCollection = await connectDB()
    recipesDB = makeRecipeDb({ recipesCollection })
}

export default recipesDB;