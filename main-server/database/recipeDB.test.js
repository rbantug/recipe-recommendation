import { beforeAll, describe, expect, it } from "vitest";

import identity from "../../utils/id.js";
import makeFakeRecipe from "../../__test__/fixtures/recipes.js";

let recipesDB;

beforeAll(() => {
    recipesDB = globalThis.recipesDB
})

describe('recipeDB', () => {
    it('should list all recipes', async () => {
        const sampleData = [
            makeFakeRecipe(),
            makeFakeRecipe(),
            makeFakeRecipe()
        ]

        const inserts = await recipesDB.insertManyRecipes(sampleData)

        const findAll = await recipesDB.findAll()

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

        const query = { recipeName: 'Flying Dumpling' }

        await recipesDB.insertManyRecipes(sampleData)

        const findOne = await recipesDB.findOneRecipe(query)

        const check = sampleData[0].id === findOne.id

        expect(check).toBe(true)
    })

    it('should find recipes based on a list of ingredients', async () => {
        const sampleData = [makeFakeRecipe({ ingredients: ['egg', 'milk', 'turkraken'], recipeName: '1' }),
        makeFakeRecipe({ ingredients: ['rice', 'milk', 'basilisk', 'boundless charisma', 'anxiety inducing flatulence'], recipeName: '2' }),
        makeFakeRecipe({ ingredients: ['egg', 'milk', 'flying crockpot', 'basic bamboozled'], recipeName: '3' }),
        makeFakeRecipe({ ingredients: ['garlic', 'turnips', 'black holes can\'t emotionally hurt you'], recipeName: '4' }),]

        await recipesDB.insertManyRecipes(sampleData)

        const query = ['milk', 'egg']

        const findRecipes = await recipesDB.findRecipesBasedOnIngredients(query)

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
        
        await recipesDB.insertManyRecipes(sampleData)

        const testUserId = identity.makeId()

        const data = await recipesDB.updateIsFavorite(testUserId, sampleData[0].id, sampleData[0].isFavorite)

        expect(data.isFavorite).toEqual(expect.arrayContaining([testUserId]))
    })

    it('should update the document and add the "lastModified" property', async () => {
        const sampleData = [
            makeFakeRecipe()
        ]
        
        await recipesDB.insertManyRecipes(sampleData)

        const testUserId = identity.makeId()

        await recipesDB.updateIsFavorite(testUserId, sampleData[0].id)

        const data = await recipesDB.findOneRecipe({ id: sampleData[0].id })

        const testDate = new Date()
        testDate.setSeconds(0,0)

        expect(data).toHaveProperty('lastModified')
        expect(data.lastModified).toStrictEqual(testDate)
    })

    it('should throw an error if the document that will be updated does not exist', async () => {
        const wrongRecipeId = 'au9oq32e'
        const testUserId = 'aidoawd23ad'

        expect(recipesDB.updateIsFavorite(testUserId, wrongRecipeId)).rejects.toThrow(new Error('The recipe does not exist'))
    })
})