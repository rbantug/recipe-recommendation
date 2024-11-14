import { describe, expect, it } from "vitest";
import request from "supertest"

import Server from "../../server.js"
import tokenUtil from "../../utils/token.js";
import { usersDB } from "../../database/index.js";

process.env.JWT_SECRET = 'papaya'
process.env.JWT_EXPIRES_IN = 600000
process.env.JWT_COOKIE_EXPIRES_IN = 2

describe('POST /signup', () => {
    const { app } = new Server

    describe('given a valid user info', async () => {
        const response = await request(app)
            .post('/api/v1/users/signup')
            .send({
                email: 'book@gmail.com',
                fullName: 'Full Book',
                userName: 'melting_book',
                role: 'user',
                password: '12ascvfg',
                passwordConfirm: '12ascvfg',
            })

        it('should return a status code of 201', () => {
            expect(response.statusCode).toBe(201)
        })

        it('should respond with status: "success" and a json object in a particular format', async () => {
            const mockResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'success',
                statusCode: 201,
                data: {
                    email: 'book@gmail.com',
                    fullName: 'Full Book',
                    userName: 'melting_book',
                    role: 'user',
                    favoriteRecipes: []
                }
            }

            const getUser = await usersDB.findOneUser({ email: 'book@gmail.com' })

            const { token, ...responseBody } = response.body
            const compareToken = await tokenUtil.verifyToken(token)

            expect(responseBody).toEqual(mockResponse)
            expect(compareToken.userId).toBe(getUser.id)
        })

        it('should respond with header["set-cookie"] that contains a jwt', () => {
            const isToken = response.header['set-cookie'][0]

            expect(isToken.startsWith('jwt')).toBe(true)
        })
    })
})