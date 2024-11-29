import { describe, expect, it } from "vitest";
import request from "supertest"

import Server from "../../server.js"
import tokenUtil from "../../utils/token.js";

process.env.JWT_SECRET = 'papaya'
process.env.JWT_EXPIRES_IN = 600000
process.env.JWT_COOKIE_EXPIRES_IN = 2
process.env.NODE_ENV = 'development'

describe('PATCH /updateMyPassword', () => {
    const { app } = new Server

    describe('given a valid newPassword, newPasswordConfirm and oldPassword while logged in', async () => {
        //process.env.NODE_ENV = 'development'

        const response1 = await request(app)
            .post('/api/v1/users/login')
            .send({ email: 'Roderick.Kub@gmail.com', password: 'x0hvw3bMS2' })

        const response2 = await request(app)
            .patch('/api/v1/users/updateMyPassword')
            .send({
                newPassword: 'awdasdwdawd',
                newPasswordConfirm: 'awdasdwdawd', oldPassword: 'x0hvw3bMS2'
            })
            .set('authorization', [`Bearer ${response1.body.token}`])

        //console.log(response1.body)

        it('should respond with status code 200', () => {
            expect(response2.statusCode).toBe(200)
        })

        it('should response with status "success" and a json object in a particular format', async () => {
            const testUserId = 'tg4w5azvb2ckxmi3bv8gr7yk'

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

            const {token, ...responseBody} = response2.body

            const compareToken = await tokenUtil.verifyToken(token)

            expect(mockResponse).toEqual(responseBody)
            expect(compareToken.userId).toBe(testUserId)
        })
    })

    describe('given a user tries to update their password but they provided the wrong old password in a development environment', async () => {
        //process.env.NODE_ENV = 'development'

        const response1 = await request(app)
            .post('/api/v1/users/login')
            .send({ email: 'Roderick.Kub@gmail.com', password: 'awdasdwdawd' })

        const response2 = await request(app)
            .patch('/api/v1/users/updateMyPassword')
            .send({
                newPassword: 'x0hvw3bMS2',
                newPasswordConfirm: 'x0hvw3bMS2', oldPassword: '123asdwersdf'
            })
            .set('authorization', [`Bearer ${response1.body.token}`])

        it('should respond with status code 401', () => {
            expect(response2.statusCode).toBe(401)
        })

        it('should respond with status "fail" and a json object in a particular format', async () => {
            const mockedResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'fail',
                message: 'Wrong Password',
                statusCode: 401,
            }

            delete response2.body.stack

            expect(response2.body).toEqual(mockedResponse)
        })
    })
    
    describe('given a user tries to update their password but they provided the wrong old password in a production environment', async () => {
        process.env.NODE_ENV = 'production'

        const response1 = await request(app)
            .post('/api/v1/users/login')
            .send({ email: 'Roderick.Kub@gmail.com', password: 'awdasdwdawd' })

        const response2 = await request(app)
            .patch('/api/v1/users/updateMyPassword')
            .send({
                newPassword: 'x0hvw3bMS2',
                newPasswordConfirm: 'x0hvw3bMS2', oldPassword: '123asdwersdf'
            })
            .set('authorization', [`Bearer ${response1.body.token}`])

        it('should respond with status code 401', () => {
            expect(response2.statusCode).toBe(401)
        })

        it('should respond with status "fail" and a json object in a particular format', async () => {
            const mockedResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'fail',
                message: 'Wrong Password',
                statusCode: 401,
            }

            expect(response2.body).toEqual(mockedResponse)
        })
    })
})