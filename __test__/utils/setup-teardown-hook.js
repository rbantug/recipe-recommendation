import { beforeAll, afterAll, afterEach } from "vitest";

import { connectDB, dropCollections, dropDB } from "../fixtures/mongoDB.js";
import makeRecipeDb from "../../main-server/database/recipeDB.js";
import makeUserDb from "../../auth-server/database/userDB.js";

if (process.env.NODE_ENV !== 'supertest') {
    beforeAll(async () => {
        const testCollection = await connectDB()
        globalThis.recipesDB = makeRecipeDb({ recipesCollection: testCollection })
        globalThis.usersDB = makeUserDb({ usersCollection: testCollection })
    })

    afterAll(async () => {
        await dropDB()
    })

    afterEach(async () => {
        await dropCollections()
    })
}

