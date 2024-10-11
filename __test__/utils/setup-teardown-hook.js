import { beforeAll, afterAll, afterEach } from "vitest";

import { connectDB, dropCollections, dropDB } from "../fixtures/mongoDB.js";
import makeRecipeDb from "../../main-server/database/recipeDB.js";
import makeUserDb from "../../auth-server/database/userDB.js";

if(process.env.NODE_ENV !== 'supertest') {
    beforeAll(async () => {
        const recipesCollection = await connectDB('recipe')
        const usersCollection = await connectDB('users')
        globalThis.recipesDB = makeRecipeDb({ recipesCollection })
        globalThis.usersDB = makeUserDb({ usersCollection })
    })
    
    afterAll(() => {
        dropDB()
    })
    
    afterEach(async () => {
        await dropCollections()
    })
}

