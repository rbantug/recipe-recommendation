import { describe, expect, it, beforeAll } from "vitest";
import request from 'supertest';

import Server from '../server.js'
import makeGetRecipeById from "./getRecipeById.js";
import singleFakeRecipe from "../../__test__/fixtures/singleFakeRecipe.js";


describe('GET /:recipeId', () => {
    const { app } = new Server()

    describe('given a valid recipeId', async () => {   
        const response = await request(app).get('/api/v1/recipes/recipe-by-id/n9g1665u0op218xes3z23dnu')

        it('should respond with status code 200', () => {
            expect(response.statusCode).toBe(200)
        })

        it('should respond with status: "success" and a json object in a particular format', async () => {
            const getRecipeById = makeGetRecipeById(() => {
                return singleFakeRecipe
            })
            const mockRequest = {
                params: {
                    id: 'n9g1665u0op218xes3z23dnu'
                }
            }
            const mockActual = await getRecipeById(mockRequest)
            
            expect(mockActual).toEqual(response.body)
        })
    })

    describe('given an invalid recipeId', async () => {
        const response = await request(app).get('/api/v1/recipes/recipe-by-id/16weddfsefsdsdf322fef3gn')

        it('should respond with status code 400', () => {
            expect(response.statusCode).toBe(400)
        })

        it('should respond with status: "fail" and a json object in a particular format', async () => {
            const getRecipeById = makeGetRecipeById(() => {
                throw Error('The recipe does not exist')
            })
            const mockRequest = {
                params: {
                    id: '16weddfsefsdsdf322fef3gn'
                }
            }
            const mockActual = await getRecipeById(mockRequest)
            expect(mockActual).toEqual(response.body)
        })
    })
})