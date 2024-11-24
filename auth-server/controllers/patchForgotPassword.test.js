import { describe, expect, it } from "vitest";
import request from "supertest"
import nock from 'nock'

import Server from "../../server.js"
import { usersDB } from "../../database/index.js";

const validMockResponse = { success: true }
const invalidMockRequest = { message: 'not authorized' }

function runNock(statusCode, response) {
    nock('https://sandbox.api.mailtrap.io')
        .post('/api/send/3283668')
        .reply(statusCode, response)
}

describe('patchForgetPassword', () => {
    const { app } = new Server

    runNock(200, validMockResponse)
    runNock(500, invalidMockRequest)

    describe('given the user forgots their password', async () => {
        process.env.MAILTRAP_TOKEN = 'ae8a9c80d085bf25db788226d34c88a1' // test email token
        process.env.MAILTRAP_EMAIL_FROM = 'hello@demomailtrap.com'
        process.env.NODE_ENV = 'development'

        const response = await request(app)
            .patch('/api/v1/users/forgotPassword')
            .send({ email: 'Hortense12@gmail.com' })

        it('should respond with a status code of 200', () => {
            expect(response.statusCode).toBe(200)
        })

        it('should respond with status "success" and a json object in a particular format', () => {
            const mockRespose = {
                headers: { 'Content-Type': 'application/json' },
                status: 'success',
                statusCode: 200,
                message: "Token was sent to the user's email"
            }

            delete response.body.data

            expect(response.body).toEqual(mockRespose)
        })
    })

    describe('given the user forgets their password but somehow the email service provider doesn\'t work while in a development environment', async () => {
        process.env.NODE_ENV = 'development'
        process.env.MAILTRAP_TOKEN = 'ae8a9c80d085bf25db788226d34c88a1'

        const response = await request(app)
            .patch('/api/v1/users/forgotPassword')
            .send({ email: 'Hortense12@gmail.com' })

        it('should respond with a status code of 500', () => {
            expect(response.statusCode).toBe(500)
        })

        it('should respond with status "fail" and a json object in a particular format', () => {
            const mockRespose = {
                headers: { 'Content-Type': 'application/json' },
                status: 'error',
                statusCode: 500,
                message: "There was an error sending the email. Please try again.",
            }
            delete response.body.stack

            expect(response.body).toEqual(mockRespose)
        })

        it('The passwordResetToken and passwordResetExpires should be both null', async () => {
            const getUser = await usersDB.findOneUser({ email: 'Hortense12@gmail.com' })

            expect(getUser.passwordResetToken).toBeNull()
            expect(getUser.passwordResetExpires).toBeNull()
        })
    })
})
