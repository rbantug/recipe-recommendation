import { describe, expect, it } from "vitest";
import request from 'supertest';

import Server from '../../server.js'

const sampleData = {
    "id": "rapzyscs9tbf0csbj54sj3sg",
    "recipeName": "Fenugreek-crusted Pigeon",
    "cuisine": "Chinese",
    "sourceWebsite": "Made with Lau",
    "url": "https://magnificent-legend.info/",
    "imgUrl": "https://loremflickr.com/1274/3956?lock=7243858339263339",
    "description": "Crispy fried chicken bites, seasoned with curry and served with a tangy passionfruit dipping sauce.",
    "ingredients": [
        "chickory",
        "calamari",
        "butternut pumpkin",
        "barley",
        "watermelon",
        "extra virgin olive oil",
        "tom yum",
        "parsnip",
        "mango",
        "sprouts",
        "rye bread",
        "soy flour",
        "barramundi"
    ],
    "isFavorite": []
}


describe('GET /recipe-by-id/:id', () => {
    const { app } = new Server()

    describe('given a valid recipeId', async () => {
        const response = await request(app).get('/api/v1/recipes/recipe-by-id/rapzyscs9tbf0csbj54sj3sg')

        it('should respond with status code 200', () => {
            expect(response.statusCode).toBe(200)
        })

        it('should respond with status: "success" and a json object in a particular format', async () => {
            const mockResult = {
                headers: { 'Content-Type': 'application/json' },
                statusCode: 200,
                status: 'success',
                data: sampleData
            }

            expect(response.body).toEqual(mockResult)
        })
    })

    describe('given an invalid recipeId', async () => {
        const response = await request(app).get('/api/v1/recipes/recipe-by-id/16weddfsefsdsdf322fef3gn')

        it('should respond with status code 400', () => {
            expect(response.statusCode).toBe(400)
        })

        it('should respond with status: "fail" and a json object in a particular format', async () => {
            const mockResult = {
                headers: { 'Content-Type': 'application/json' },
                statusCode: 400,
                status: 'fail',
                message: 'The recipe does not exist'
            }

            expect(response.body).toEqual(mockResult)
        })
    })
})