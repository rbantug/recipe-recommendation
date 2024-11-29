import { describe, expect, it } from "vitest";
import request from "supertest"

import Server from "../../server.js"
import tokenUtil from "../../utils/token.js";

process.env.JWT_SECRET = 'papaya'
process.env.JWT_EXPIRES_IN = 600000
process.env.JWT_COOKIE_EXPIRES_IN = 2

const testUserId = 'tg4w5azvb2ckxmi3bv8gr7yk'

describe('POST /login', () => {
    const { app } = new Server

    describe('given a valid email and password', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send({ email: 'Roderick.Kub@gmail.com', password: 'x0hvw3bMS2' })

        it('should return a status code of 200', () => {
            expect(response.statusCode).toBe(200)
        })

        it('should respond with status: "success" and a json object in a particular format', async () => {
            const mockResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'success',
                data: {
                    email: 'Roderick.Kub@gmail.com',
                    fullName: 'Roderick Kub',
                    userName: 'Roderick43',
                    role: 'user',
                    favoriteRecipes: []
                },
                statusCode: 200,
            }

            const { token, ...responseBody } = response.body
            const compareToken = await tokenUtil.verifyToken(token)

            expect(responseBody).toEqual(mockResponse)
            expect(compareToken.userId).toBe(testUserId)
        })

        it('should respond with header["set-cookie"] that contains a jwt', () => {
            const isToken = response.header['set-cookie'][0]

            expect(isToken.startsWith('jwt')).toBe(true)
        })
    })

    describe('given only a valid email in a development environment', async () => {
        process.env.NODE_ENV = 'development'

        const response = await request(app)
            .post('/api/v1/users/login')
            .send({ email: 'Roderick.Kub@gmail.com', password: null })

        delete response.body.stack

        it('should return a status code of 400', () => {
            expect(response.statusCode).toBe(400)
        })

        it('should respond with status "fail" and a json object in a particular format', () => {
            const mockResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'fail',
                statusCode: 400,
                message: 'Please provide email and password',
            }

            expect(response.body).toEqual(mockResponse)
        })
    })

    describe('given only a valid email in a production environment', async () => {
        process.env.NODE_ENV = 'production'

        const response = await request(app)
            .post('/api/v1/users/login')
            .send({ email: 'Roderick.Kub@gmail.com', password: null })

        it('should return a status code of 400', () => {
            expect(response.statusCode).toBe(400)
        })

        it('should respond with status "fail" and a json object in a particular format', () => {
            const mockResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'fail',
                statusCode: 400,
                message: 'Please provide email and password',
            }

            expect(response.body).toEqual(mockResponse)
        })
    })

    describe('given only a valid password in a development environment', async () => {
        process.env.NODE_ENV = 'development'

        const response = await request(app)
            .post('/api/v1/users/login')
            .send({ email: null, password: 'aidyhaiwawd' })
        
        delete response.body.stack

        it('should return a status code of 400', () => {
            expect(response.statusCode).toBe(400)
        })

        it('should respond with status "fail" and a json object in a particular format', () => {
            const mockResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'fail',
                statusCode: 400,
                message: 'Please provide email and password'
            }

            expect(response.body).toEqual(mockResponse)
        })
    })
    describe('given only a valid password in a production environment', async () => {
        process.env.NODE_ENV = 'production'

        const response = await request(app)
            .post('/api/v1/users/login')
            .send({ email: null, password: 'aidyhaiwawd' })

        it('should return a status code of 400', () => {
            expect(response.statusCode).toBe(400)
        })

        it('should respond with status "fail" and a json object in a particular format', () => {
            const mockResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'fail',
                statusCode: 400,
                message: 'Please provide email and password',
            }

            expect(response.body).toEqual(mockResponse)
        })
    })

    describe('given a valid email and an incorrect password in a development environment', async () => {
        process.env.NODE_ENV = 'development'

        const response = await request(app)
            .post('/api/v1/users/login')
            .send({ email: 'Roderick.Kub@gmail.com', password: 'aidyhaiwawd' })

        delete response.body.stack

        it('should respond with status code 401', () => {
            expect(response.statusCode).toBe(401)
        })

        it('should respond with status "fail" and a json object in a particular format', () => {
            const mockResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'fail',
                statusCode: 401,
                message: 'Incorrect email or password'
            }

            expect(response.body).toEqual(mockResponse)
        })
    })

    describe('given a valid email and an incorrect password in a production environment', async () => {
        process.env.NODE_ENV = 'production'

        const response = await request(app)
            .post('/api/v1/users/login')
            .send({ email: 'Roderick.Kub@gmail.com', password: 'aidyhaiwawd' })

        it('should respond with status code 401', () => {
            expect(response.statusCode).toBe(401)
        })

        it('should respond with status "fail" and a json object in a particular format', () => {
            const mockResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'fail',
                statusCode: 401,
                message: 'Incorrect email or password',
            }

            expect(response.body).toEqual(mockResponse)
        })
    })

    describe('given an invalid email address and a password', async () => {
        process.env.NODE_ENV = 'production'

        const response = await request(app)
            .post('/api/v1/users/login')
            .send({ email: 'Roderick.is.here@gmail.com', password: 'aidyhaiwawd' })

        it('should respond with status code 404', () => {
            expect(response.statusCode).toBe(404)
        })

        it('should respond with status "fail" and a json object in a particular format', () => {
            const mockResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'fail',
                statusCode: 404,
                message: 'The user does not exist',
            }

            expect(response.body).toEqual(mockResponse)
        })
    })
})
