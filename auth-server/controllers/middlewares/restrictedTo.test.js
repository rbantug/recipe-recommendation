import { describe, expect, it } from "vitest";
import request from "supertest"

import Server from "../../../server";
import token from "../../../utils/token";

process.env.JWT_SECRET = 'papaya'
process.env.JWT_EXPIRES_IN = 600000

// This user has the role of "admin". Look for importUsers.json for more info.
const userId = '6ma364gdcnv6q9ueidp2do1y'

const testToken = await token.signToken(userId)

describe('restrictedTo middleware', () => {
    const { app } = new Server

    describe('given a user with an "admin" role is trying to access a endpoint only for "user" roles AND NODE_ENV = "development"', async () => {
        process.env.NODE_ENV = 'development'

        // With patchUpdateIsFavorite, only users with the role of 'users' can access the endpoint
        const response = await request(app)
            .patch('/api/v1/recipes/f9smrwidoda4rlswde7tjkwm')
            .set('authorization', [`Bearer ${testToken}`])

        it('should respond with status 403', () => {
            expect(response.statusCode).toBe(403)
        })

        it('should respond with status: "fail" and a json object in a particular format', () => {
            const mockResult = {
                headers: { 'Content-Type': 'application/json' },
                statusCode: 403,
                status: 'fail',
                message: 'You are not authorized to perform this action'
            }

            delete response.body.stack

            expect(response.body).toEqual(mockResult)
        })
    })

    describe('given a user with an "admin" role is trying to access a endpoint only for "user" roles AND NODE_ENV = "production"', async () => {
        process.env.NODE_ENV = 'production'

        // With patchUpdateIsFavorite, only users with the role of 'users' can access the endpoint
        const response = await request(app)
            .patch('/api/v1/recipes/f9smrwidoda4rlswde7tjkwm')
            .set('authorization', [`Bearer ${testToken}`])

        it('should respond with status 403', () => {
            expect(response.statusCode).toBe(403)
        })

        it('should respond with status: "fail" and a json object in a particular format', () => {
            const mockResult = {
                headers: { 'Content-Type': 'application/json' },
                statusCode: 403,
                status: 'fail',
                message: 'You are not authorized to perform this action'
            }

            expect(response.body).toEqual(mockResult)
        })
    })
})