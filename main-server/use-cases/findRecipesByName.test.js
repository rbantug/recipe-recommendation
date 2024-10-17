import { beforeAll, it, expect, describe } from "vitest";

import makeFindRecipesByName from "./findRecipesByName.js";
import makeFakeRecipe from '../../__test__/fixtures/recipes.js'

let recipesDB, findRecipesByName

beforeAll(() => {
    recipesDB = globalThis.recipesDB
    findRecipesByName = makeFindRecipesByName({ recipesDB })
})

describe('findRecipedByName', () => {
    it('should accept strings', () => {
        const testRecipeName = ['It might work?']

        expect(findRecipesByName(testRecipeName)).rejects.toThrow('This is not a valid recipe name')
    })

    it('should return the correct recipe', async () => {
        const sampleData = [
            makeFakeRecipe({ recipeName: 'awdasdwchickenadjioapwjd' }),
            makeFakeRecipe({ recipeName: '213adchicken908quad' }),
            makeFakeRecipe({ recipeName: '3' }),
        ]

        const recipeName = 'chicken'

        await recipesDB.insertManyRecipes(sampleData)

        const find = await findRecipesByName(recipeName)
        
        const correctResults = [
            sampleData[0],
            sampleData[1]
        ]
        
        let i = 0
        find.forEach(r => {
            const { _id, ...res } = r
            expect(correctResults[i]).toEqual(res)
            i++
        })
        expect(find.length).toBe(2)
    })
})