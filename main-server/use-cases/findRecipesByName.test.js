import { beforeAll, afterAll, afterEach, it, expect, describe } from "vitest";

import makeFindRecipesByName from "./findRecipesByName.js";
import makeRecipeDb from "../database/recipeDB.js";
import { connectDB, dropCollections, dropDB } from "../../__test__/fixtures/mongoDB.js";
import makeFakeRecipe from '../../__test__/fixtures/recipes.js'

let recipesDB, findRecipesByName;

beforeAll(async () => {
    const recipesCollection = await connectDB();
    recipesDB = makeRecipeDb({ recipesCollection })
    findRecipesByName = makeFindRecipesByName({ recipesDB })

})

afterAll(() => {
    dropDB();
})

afterEach(async () => {
    await dropCollections()
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

        const insertArr = structuredClone(sampleData)

        await recipesDB.insertManyRecipes(insertArr)

        const find = await findRecipesByName(recipeName)
        
        sampleData.splice(2,1)
        let i = 0
        find.forEach(r => {
            const { _id, ...res } = r
            expect(sampleData[i]).toEqual(res)
            i++
        })
        expect(find.length).toBe(2)
    })
})