import { describe, expect, it } from "vitest";
import request from "supertest"

import Server from "../../server.js"

process.env.JWT_SECRET = 'papaya'
process.env.JWT_EXPIRES_IN = 600000
process.env.JWT_COOKIE_EXPIRES_IN = 2

describe('POST /login', () => {
    const { app } = new Server

    describe('given a valid email and password', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send({ email: 'Roderick.Kub@gmail.com', password: 'x0hvw3bMS2' })

        it('should return a status code of 200', () => {
            expect(response.statusCode).toBe(200)
        })

        it('should respond with status: "success" and a json object in a particular format', () => {
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
                statusCode: 200
            }

            expect(response.body).toEqual(mockResponse)
        })
    })

    describe('given only a valid email in a development environment', async () => {
        process.env.NODE_ENV = 'development'

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
                stack: 'Error: Please provide email and password\n' +
                    '    at C:\\Users\\BANTUG\\Documents\\Javascript\\clean-architecture-template\\utils\\express-callback.js:46:25\n' +
                    '    at processTicksAndRejections (node:internal/process/task_queues:105:5)'
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

        it('should return a status code of 400', () => {
            expect(response.statusCode).toBe(400)
        })

        it('should respond with status "fail" and a json object in a particular format', () => {
            const mockResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'fail',
                statusCode: 400,
                message: 'Please provide email and password',
                stack: 'Error: Please provide email and password\n' +
                    '    at C:\\Users\\BANTUG\\Documents\\Javascript\\clean-architecture-template\\utils\\express-callback.js:46:25\n' +
                    '    at processTicksAndRejections (node:internal/process/task_queues:105:5)'
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

        it('should respond with status code 401', () => {
            expect(response.statusCode).toBe(401)
        })

        it('should respond with status "fail" and a json object in a particular format', () => {
            const mockResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'fail',
                statusCode: 401,
                message: 'Incorrect email or password',
                stack: 'Error: Incorrect email or password\n' +
                    '    at C:\\Users\\BANTUG\\Documents\\Javascript\\clean-architecture-template\\utils\\express-callback.js:46:25'
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
})
