import { describe, expect, it } from "vitest";
import request from 'supertest';

import Server from '../server.js'
import makeGetAllRecipes from "./getAllRecipes.js";

// TODO: When creating the docker container for the main-server, you need to add a volume that will copy the importRecipes.js

import importRecipes from '../../docker-compose-mongo-test/importRecipes.json'


describe('GET /', () => {
    const { app } = new Server()

    describe('get all recipes', async () => {
        const response = await request(app).get('/api/v1/recipes/')

        it('should respond with status code 200', () => {
            expect(response.statusCode).toBe(200)
        })

        it('should respond with status: "success" and a json object in a particular format', async () => {
            const mockResult = {
                headers: { 'Content-Type': 'application/json' },
                statusCode: 200,
                status: 'success',
                data: importRecipes
            }

            expect(response.body).toEqual(mockResult)
        })
    })

    // This is a unit test because the only way to throw an error is if something happened to the database
    describe('throws an error', async () => {
        const getAllRecipes = makeGetAllRecipes(() => {
            throw Error('test error')
        })
        const mockActual = await getAllRecipes()

        it('should respond with status code 400', () => {
            expect(mockActual.statusCode).toBe(400)
        })

        it('should respond with status: "fail" and a json object in a particular format', () => {
            const mockResponse = {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 400,
                status: 'fail',
                message: 'test error'
            }
            expect(mockActual).toEqual(mockResponse)
        })
    })
})