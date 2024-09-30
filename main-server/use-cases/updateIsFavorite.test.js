import { beforeAll, afterAll, afterEach, it, expect, describe } from "vitest";

import identity from "../entities/recipe/id.js";
import makeUpdateIsFavorite from "./updateIsFavorite";
import makeFakeRecipe from "../../__test__/fixtures/recipes";
import makeRecipeDb from "../database/recipeDB";
import { connectDB, dropCollections, dropDB } from "../../__test__/fixtures/mongoDB";

let recipesDB, updateIsFavorite, inserts;

const sampleData = [
    makeFakeRecipe()
]

const insertArr = structuredClone(sampleData)

beforeAll(async () => {
    const recipesCollection = await connectDB();
    recipesDB = makeRecipeDb({ recipesCollection })
    updateIsFavorite = makeUpdateIsFavorite({ recipesDB, isValid: identity.isValid })
    inserts = await recipesDB.insertManyRecipes(insertArr)
})

afterAll(() => {
    dropDB();
})

afterEach(async () => {
    await dropCollections()
})

describe('updateIsFavorite', () => {
    it('should accept valid object ids', () => {
        const testObjectId = '12asopduajdw'
        
        expect(updateIsFavorite(testObjectId)).rejects.toThrow('This is not a valid recipe id')
    })
})