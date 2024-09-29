import { describe, it, expect } from "vitest";

import makeFakeRecipe from '../../../__test__/fixtures/recipes.js';
import makeRecipe from "./index.js";

describe('recipe', () => {
    it('must have an id that has 24 characters', () => {
        const wrongId = '1ioasudawd'
        const testRecipe = makeFakeRecipe({ id: wrongId })
        expect(() => makeRecipe(testRecipe)).toThrow('ValidationError: "id" length must be 24 characters long')
    })

    it('must have a recipeName that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null]
        
        wrongValues.forEach(x => {
            const wrongRN = makeFakeRecipe({ recipeName: x })
            expect(() => makeRecipe(wrongRN)).toThrow('ValidationError: "recipeName" must be a string')
        })
    })

    it('must have a recipeName that is not undefined', () => {
        const rnIsUndefined = makeFakeRecipe({ recipeName: undefined })
        expect(() => makeRecipe(rnIsUndefined)).toThrow('ValidationError: "recipeName" is required')
    })

    it('must have a recipeName that is more than one character', () => {
        const emptyString = makeFakeRecipe({ recipeName: '' })
        expect(() => makeRecipe(emptyString)).toThrow('ValidationError: "recipeName" is not allowed to be empty')
    })

    it('must have a cuisine that only what\'s specified in the schema', () => {
        const otherCuisine = makeFakeRecipe({ cuisine: 'Thai' })
        expect(() => makeRecipe(otherCuisine)).toThrow('ValidationError: "cuisine" must be [Chinese]')
    })

    it('must have a sourceWebsite that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null]
        wrongValues.forEach(x => {
            const otherSW = makeFakeRecipe({ sourceWebsite: x })
            expect(() => makeRecipe(otherSW)).toThrow('ValidationError: "sourceWebsite" must be [Made with Lau]')
        })
    })

    it('must have a valid url', () => {
        const wrongUrl = makeFakeRecipe({ url: 'ww.flyingDonut/1/fluke' })
        expect(() => makeRecipe(wrongUrl)).toThrow('ValidationError: "url" must be a valid uri')
    })

    it('must have a valid image url', () => {
        const wrongImgUrl = makeFakeRecipe({ imgUrl: 'ww.flyingDonut/1/fluke' })
        expect(() => makeRecipe(wrongImgUrl)).toThrow('ValidationError: "imgUrl" must be a valid uri')
    })

    it('must have a description', () => {
        const wrongDescription = makeFakeRecipe({ description: '' })
        expect(() => makeRecipe(wrongDescription)).toThrow('ValidationError: "description" is not allowed to be empty')
    })

    it('must have an array of one or more ingredients', () => {
        const wrongIngredients = makeFakeRecipe({ ingredients: [] })
        expect(() => makeRecipe(wrongIngredients)).toThrow('ValidationError: "ingredients" must contain at least 1 items')

    })

    it('must have an array for isFavorites', () => {
        const wrongValues = [100, true, {pickle: 1}, 'tamarind', null]

        wrongValues.forEach(x => {
            const wrongIsFavorite = makeFakeRecipe({ isFavorite: x })
            expect(() => makeRecipe(wrongIsFavorite)).toThrow('ValidationError: "isFavorite" must be an array')
        })
    })

    it('must have isFavorite that is not undefined', () => {
        const isFavoriteIsUndefined = makeFakeRecipe({ isFavorite: undefined })
        expect(() => makeRecipe(isFavoriteIsUndefined)).toThrow('ValidationError: "isFavorite" is required')
    })
})
