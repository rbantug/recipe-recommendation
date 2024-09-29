import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { ObjectId } from "mongodb";
import { createId, isCuid } from "@paralleldrive/cuid2";

import { connectDB, dropCollections, dropDB } from "../../__test__/fixtures/mongoDB.js";
import makeRecipeDb from "./recipeDB.js";
import makeFakeRecipe from "../../__test__/fixtures/recipes.js";

let recipeDB;

beforeAll(async () => {
    const recipesCollection = await connectDB();
    recipeDB = makeRecipeDb({ recipesCollection })
    
})

afterAll(() => {
    dropDB();
})

afterEach(async () => {
    await dropCollections()
})

describe('recipeDB', () => {
    it('should list all recipes', async () => {
        const sampleData = [
            makeFakeRecipe(),
            makeFakeRecipe(),
            makeFakeRecipe()
        ]
        const insertArr = structuredClone(sampleData)

        const inserts = await recipeDB.insertManyRecipes(insertArr)

        const findAll = await recipeDB.findAll()

        const idArr = sampleData.map(r => r.id)

        let check = true

        findAll.forEach(x => {
            let test = idArr.includes(x.id)
            if(!test) {
                check = false
                return
            }
        })

        expect(inserts.insertedCount).toBe(findAll.length)
        expect(check).toBe(true)
    })

    it('should find a single recipe', async () => {
        const sampleData = [
            makeFakeRecipe({ recipeName: 'Flying Dumpling' })
        ]

        const insertArr = structuredClone(sampleData)

        const query = { recipeName: 'Flying Dumpling' }

        await recipeDB.insertManyRecipes(insertArr)

        const findOne = await recipeDB.findOneRecipe(query)

        const check = sampleData[0].id === findOne.id

        expect(check).toBe(true)
    })

    it('should find recipes based on a list of ingredients', async () => {
        const sampleData = [makeFakeRecipe({ ingredients: ['egg', 'milk', 'turkraken'], recipeName: '1' }),
        makeFakeRecipe({ ingredients: ['rice', 'milk', 'basilisk', 'boundless charisma', 'anxiety inducing flatulence'], recipeName: '2' }),
        makeFakeRecipe({ ingredients: ['egg', 'milk', 'flying crockpot', 'basic bamboozled'], recipeName: '3' }),
        makeFakeRecipe({ ingredients: ['garlic', 'turnips', 'black holes can\'t emotionally hurt you'], recipeName: '4' }),]

        const insertArr = structuredClone(sampleData)

        const insert = await recipeDB.insertManyRecipes(insertArr)

        const query = ['milk', 'egg']

        const findRecipes = await recipeDB.findRecipesBasedOnIngredients(query)

        sampleData.splice(3, 1)
        let i = 0

        findRecipes.forEach(r => {
            expect(r).toEqual(sampleData[i])
            i++
        })

        expect(findRecipes.length).toBe(3)
    })

    it('should update isFavorite with a user\'s id', async () => {
        const sampleData = [
            makeFakeRecipe()
        ]
        const insertArr = structuredClone(sampleData)
        const insert = await recipeDB.insertManyRecipes(insertArr)

        const testUserId = createId()

        const data = await recipeDB.updateIsFavorite(testUserId, sampleData[0].id, sampleData[0].isFavorite)

        expect(data.isFavorite).toEqual(expect.arrayContaining([testUserId]))
    })

    it('The updated document should contain the "lastModified" property', async () => {
        const sampleData = [
            makeFakeRecipe()
        ]
        const insertArr = structuredClone(sampleData)
        const insert = await recipeDB.insertManyRecipes(insertArr)

        const testUserId = createId()

        await recipeDB.updateIsFavorite(testUserId, sampleData[0].id, sampleData[0].isFavorite)

        const data = await recipeDB.findOneRecipe({ id: sampleData[0].id })

        const testDate = new Date()
        testDate.setSeconds(0,0)

        expect(data).toHaveProperty('lastModified')
        expect(data.lastModified).toStrictEqual(testDate)
    })
})