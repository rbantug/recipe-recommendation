import { it, expect, describe, beforeAll } from "vitest";

import makeFindRecipeById from "./findRecipeById.js";
import makeFakeRecipe from "../../__test__/fixtures/recipes.js";

let findRecipeById;
let recipesDB;

beforeAll(() => {
    recipesDB = globalThis.recipesDB
})

describe('findRecipeById', () => {
    it('should accept valid ids', () => {
        findRecipeById = makeFindRecipeById({ recipesDB, isValid: () => false })

        const wrongId = '12asopduajdw'
        
        expect(findRecipeById(wrongId)).rejects.toThrow('This is not a valid recipe id')
    })

    it('should find the correct recipe', async () => {
        findRecipeById = makeFindRecipeById({ recipesDB, isValid: () => true })

        const sampleData = [
            makeFakeRecipe({ id: 'qurutw0s3qgfjhlwxnn6trl2' }),
            makeFakeRecipe({ id: '63k4zxejioydowzhsh083puh' }),
            makeFakeRecipe({ id: 't90llnii2ix0ho2o29sbjmkl' }),
        ]

        await recipesDB.insertManyRecipes(sampleData)

        const getRecipe = await findRecipeById('63k4zxejioydowzhsh083puh')

        expect(getRecipe).toEqual(sampleData[1])
    })
})