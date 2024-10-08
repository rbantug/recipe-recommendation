import { beforeAll, it, expect, describe } from "vitest";

import identity from "../../utils/id.js";
import makeUpdateIsFavorite from "./updateIsFavorite";
import makeFakeRecipe from "../../__test__/fixtures/recipes";

let updateIsFavorite;

const sampleData = [
    makeFakeRecipe()
]

const insertArr = structuredClone(sampleData)

beforeAll(async () => {
    updateIsFavorite = makeUpdateIsFavorite({ recipesDB: globalThis.recipesDB, isValid: identity.isValid })

    await globalThis.recipesDB.insertManyRecipes(insertArr)
})

describe('updateIsFavorite', () => {
    it('should accept valid object ids', () => {
        const testObjectId = '12asopduajdw'
        
        expect(updateIsFavorite(testObjectId)).rejects.toThrow('This is not a valid recipe id')
    })
})