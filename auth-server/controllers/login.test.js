import { describe, expect, it } from "vitest";
import request from "supertest"

import Server from "../../server.js"

describe.skip('login', () => {
    const { app } = new Server

    describe('given a valid email and password', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send({ email: 'Roderick.Kub@gmail.com', password: 'x0hvw3bMS2' })

            //console.log(response)

        it('should return a status code of 200', () => {
            expect(response.statusCode).toBe(200)
        })

        it.skip('should respond with status: "success" and a json object in a particular format', () => {
            const mockResponse = {

            }

            
        })
    })
})
