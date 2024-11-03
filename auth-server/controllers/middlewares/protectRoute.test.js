import { describe, expect, it } from "vitest";
import request from "supertest"

import Server from "../../../server";

describe('protect middleware', () => {
    const { app } = new Server

    describe('given an invalid token', async () => {
        // We will use the endpoint for updating the recipe isFavorite property
        const response = await request(app)
            .patch('/api/v1/recipes/f9smrwidoda4rlswde7tjkwm')

        it('should return a status code of 401', () => {
            expect(response.statusCode).toBe(401)
        })

        it('should respond with status: "fail" and a json object in a particular format', () => {
            const mockResponse = {
                headers: { 'Content-Type': 'application/json' },
                statusCode: 401,
                status: 'fail',
                message: 'The user is not logged in'
            }

            expect(response.body).toEqual(mockResponse)
        })
    })
})