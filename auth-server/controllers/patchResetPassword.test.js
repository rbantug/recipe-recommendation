import { describe, expect, it } from "vitest";
import request from "supertest"
import nock from 'nock'

import Server from "../../server.js"
import { usersDB } from "../../database/index.js";
import token from "../../utils/token.js";

process.env.JWT_SECRET = 'papaya'
process.env.JWT_EXPIRES_IN = 600000
process.env.JWT_COOKIE_EXPIRES_IN = 2
process.env.MAILTRAP_TOKEN = 'ae8a9c80d085bf25db788226d34c88a1' // test email token
process.env.MAILTRAP_EMAIL_FROM = 'hello@demomailtrap.com'
process.env.NODE_ENV = 'development'

const testUserId = 'gwcf2uevgsxb42k446vvyea1'
const testUserNewPassword = 'abcijaosdaw'

const validMockResponse = { success: true }

function runNock(statusCode, response) {
    nock('https://sandbox.api.mailtrap.io')
        .post('/api/send/3283668')
        .reply(statusCode, response)
}

describe('patchResetPassword', () => {
    const { app } = new Server

    runNock(200, validMockResponse)

    describe('given the user clicks on a valid reset password link', async () => {
            const response1 = await request(app)
            .patch('/api/v1/users/forgotPassword')
            .send({ email: 'Hazel.Dickinson@gmail.com' })

            const response2 = await request(app)
            .patch(`/api/v1/users/resetPassword/${response1.body.data.resetToken}`)
            .send({ password: testUserNewPassword, passwordConfirm: testUserNewPassword })

        it('should respond with status code 200', () => {
            expect(response2.statusCode).toBe(200)
        })

        it('should respond with status "success" and a json object in a particular format', async () => {
            const getUser = await usersDB.findOneUser({ email: 'Hazel.Dickinson@gmail.com' })

            const { userId: decodeAuthToken } = await token.verifyToken(response2.body.token)

            const mockResponse = {
                headers: { 'Content-Type': 'application/json' },
                status: 'success',
                statusCode: 200,
                data: {
                    email: getUser.email,
                    fullName: getUser.fullName,
                    userName: getUser.userName,
                    role: getUser.role,
                    favoriteRecipes: getUser.favoriteRecipes
                },
            }

            delete response2.body.token

            expect(testUserId).toBe(decodeAuthToken)
            expect(response2.body).toEqual(mockResponse)
        })
    })
})