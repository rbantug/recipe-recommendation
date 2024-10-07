import { describe, expect, it } from "vitest";
import request from 'supertest';

import Server from '../server.js'
import makeGetRecipeByName from "./getRecipesByName.js";
import singleFakeRecipe from "../../__test__/fixtures/singleFakeRecipe.js";

describe('GET /recipe-by-name/:name', () => {
    const { app } = new Server

    describe('given a valid recipe name', async () => {
        const response = await request(app).get('/api/v1/recipes/recipe-by-name/soup')

        it('should respond with status code 200', () => {
            expect(response.statusCode).toBe(200)
        })

        it('should respond with status: "success" and a json object in a particular format', async () => {
            const getRecipeByName = makeGetRecipeByName(() => [singleFakeRecipe])

            const mockRequest = {
                params: {
                    recipeName: 'soup'
                }
            }

            const mockActual = await getRecipeByName(mockRequest)

            expect(mockActual).toEqual(response.body)
        })
    })

    describe('given an invalid recipe name', async () => {
        const getRecipeByName = makeGetRecipeByName(() => {
            throw Error('This is not a valid recipe name.')
        })

        const mockRequest = {
            params: {
                recipeName: 1234
            }
        }

        const mockActual = await getRecipeByName(mockRequest)

        it('should respond with status code 400', () => {
            expect(mockActual.statusCode).toBe(400)
        })

        it('should respond with status: "fail" and a json object in a particular format', async () => {
            const mockResponse = {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                status: 'fail',
                message: 'This is not a valid recipe name.'
            }

            expect(mockActual).toEqual(mockResponse)
        })
    })
})
