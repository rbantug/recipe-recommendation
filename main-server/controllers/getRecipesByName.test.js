import { describe, expect, it } from "vitest";
import request from 'supertest';

import Server from '../server.js'
import makeGetRecipeByName from "./getRecipesByName.js";

const sampleData = {
    "id": "wiswghsj61gkjy2wsi3bfdak",
    "recipeName": "Flying Venison",
    "cuisine": "Chinese",
    "sourceWebsite": "Made with Lau",
    "url": "https://trustworthy-elevator.com",
    "imgUrl": "https://loremflickr.com/3417/2106?lock=7764632647667910",
    "description": "Fresh cabbage with a pinch of baharat, topped by a caramelized currant with whipped cream",
    "ingredients": [
        "sausages"
    ],
    "isFavorite": [
        "593qyuZX7v9rl4wn1PzUvMoG",
        "Vxq0HoEWu6u4oQCMGPgN1Fvl",
        "GN11up6xLvV6QSkijm63puVN"
    ]
}

    describe('GET /recipe-by-name/:name', () => {
        const { app } = new Server

        describe('given a valid recipe name', async () => {
            const response = await request(app).get('/api/v1/recipes/recipe-by-name/Flying Venison')

            it('should respond with status code 200', () => {
                expect(response.statusCode).toBe(200)
            })

            it('should respond with status: "success" and a json object in a particular format', async () => {
                const getRecipeByName = makeGetRecipeByName(() => [sampleData])

                const mockRequest = {
                    params: {
                        recipeName: 'Flying Venison'
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
