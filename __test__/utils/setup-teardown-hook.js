import { beforeAll, afterAll, afterEach } from "vitest";

import { connectDB, dropCollections, dropDB } from "../fixtures/mongoDB";
import makeRecipeDb from "../../main-server/database/recipeDB";

beforeAll(async () => {
    const recipesCollection = await connectDB()
    globalThis.recipesDB = makeRecipeDb({ recipesCollection })
})

afterAll(() => {
    dropDB()
})

afterEach(async () => {
    await dropCollections()
})
