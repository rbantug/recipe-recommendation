import { beforeAll, afterAll, afterEach, it, expect, describe } from "vitest";
import { ObjectId } from "mongodb";

import makeFindRecipeById from "./findRecipeById";
import makeRecipeDb from "../database/recipeDB";
import { connectDB, dropCollections, dropDB } from "../../__test__/fixtures/mongoDB";

let recipesDB, findRecipeById;

beforeAll(async () => {
    const recipesCollection = await connectDB();
    recipesDB = makeRecipeDb({ recipesCollection })
    findRecipeById = makeFindRecipeById({ recipesDB })
    
})

afterAll(() => {
    dropDB();
})

afterEach(async () => {
    await dropCollections()
})

describe('findRecipeById', () => {
    it('should accept valid object ids', () => {
        const testObjectId = '12asopduajdw'
        
        expect(findRecipeById(testObjectId)).rejects.toThrow('This is not a valid recipe id')
    })
})