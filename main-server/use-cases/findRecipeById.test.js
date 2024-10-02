import { it, expect, describe, beforeAll } from "vitest";

import makeFindRecipeById from "./findRecipeById";
import identity from "../entities/recipe/id";

let findRecipeById;

beforeAll(() => {
    findRecipeById = makeFindRecipeById({ recipesDB: globalThis.recipesDB, isValid: identity.isValid })
})

describe('findRecipeById', () => {
    it('should accept valid object ids', () => {
        const testObjectId = '12asopduajdw'
        
        expect(findRecipeById(testObjectId)).rejects.toThrow('This is not a valid recipe id')
    })
})