import { it, expect, describe, beforeEach } from "vitest";

import identity from "../../utils/id.js";
import makeUpdateIsFavorite from "./updateIsFavorite";
import makeFakeRecipe from "../../__test__/fixtures/recipes";

let updateIsFavorite;

const sampleData = [
    makeFakeRecipe({ id: 'wihb3j3its3rsqafyusfqm5o' })
]

beforeEach(async () => {
    updateIsFavorite = makeUpdateIsFavorite({ recipesDB: globalThis.recipesDB, isValid: identity.isValid })

    await globalThis.recipesDB.insertManyRecipes(sampleData)
})

describe('updateIsFavorite', () => {
    it('should accept valid object ids', () => {
        const testRecipeId = '12asopduajdw'

        const sampleUserId = 'wxoa04yer8fwzgetrchjm3ie'

        const updateRecipe = updateIsFavorite(sampleUserId, testRecipeId, sampleData[0].isFavorite)
        
        expect(updateRecipe).rejects.toThrow('This is not a valid recipe id')
    })

    it('should update the recipe', async () => {
        const sampleUserId = 'wxoa04yer8fwzgetrchjm3ie'

        const getIsFavorite = sampleData[0].isFavorite

        const updateRecipe = await updateIsFavorite(sampleUserId, 'wihb3j3its3rsqafyusfqm5o', getIsFavorite)

        const date = new Date()
        date.setSeconds(0,0)

        const expectedResult = {
            ...sampleData[0],
            isFavorite: [...getIsFavorite, sampleUserId],
            lastModified: date
        }

        expect(updateRecipe).toEqual(expectedResult)
    })
})