import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { ObjectId } from "mongodb";

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
        const inserts = await recipeDB.insertManyRecipes([
            makeFakeRecipe(),
            makeFakeRecipe(),
            makeFakeRecipe()
        ])

        const findAll = await recipeDB.findAll()

        const idArr = Object.values(inserts.insertedIds).map(x => x.toString())

        let check = true

        findAll.forEach(x => {
            let test = idArr.includes(x._id.toString())
            if(!test) {
                check = false
                return
            }
        })

        expect(inserts.insertedCount).toBe(findAll.length)
        expect(check).toBe(true)
    })

    it('should find a single recipe', async () => {
        const query = { recipeName: 'Flying Dumpling' }

        const insert = await recipeDB.insertManyRecipes([
            makeFakeRecipe({ recipeName: 'Flying Dumpling' })
        ])

        const findOne = await recipeDB.findOneRecipe(query)

        const check = insert.insertedIds[0].toString() === findOne._id.toString()

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
            const { _id, ...others} = r
            expect(others).toEqual(sampleData[i])
            i++
        })

        expect(findRecipes.length).toBe(3)
    })

    it('should update isFavorite with a user\'s ObjectId', async () => {
        const sampleData = [
            makeFakeRecipe()
        ]
        const insertArr = structuredClone(sampleData)
        const insert = await recipeDB.insertManyRecipes(insertArr)

        const testUserId = ObjectId.createFromTime(1)

        await recipeDB.updateIsFavorite(testUserId, insert.insertedIds['0'], sampleData[0].isFavorite)

        const data = await recipeDB.findOneRecipe({ _id: insert.insertedIds['0'] })

        expect(data.isFavorite).toEqual(expect.arrayContaining([testUserId]))
    })
})