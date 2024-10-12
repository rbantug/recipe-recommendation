import { it, expect, describe, beforeAll } from "vitest";

import makeFindRecipeById from "./findRecipeById.js";
import identity from "../../utils/id.js"

let findRecipeById;

beforeAll(() => {
    findRecipeById = makeFindRecipeById({ recipesDB: globalThis.recipesDB, isValid: identity.isValid })
})

describe('findRecipeById', () => {
    it('should accept valid ids', () => {
        const wrongId = '12asopduajdw'
        
        expect(findRecipeById(wrongId)).rejects.toThrow('This is not a valid recipe id')
    })
})