import { describe, it, expect } from "vitest";

import { makeFakeNewUser } from "../../../__test__/fixtures/users";
import makeUser from './index.js'

describe('user', () => {
    it('must have an id that has 24 characters', () => {
        const wrongId = 'aiodyuwqe2'
        const testUser = makeFakeNewUser({
            id: wrongId
        })
        expect(() => makeUser(testUser)).toThrow(new Error('ValidationError: "id" length must be 24 characters long'))
    })

    it('must have an id that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, new Date()]

        wrongValues.forEach(x => {
            const wrongUser = makeFakeNewUser({ id: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "id" must be a string'))
        })
    })

    // Removed this test because property "id" now has a default value that automatically adds an id.

    /* it('must have an id that is not undefined', () => {
        const userIsUndefined = makeFakeNewUser({ id: undefined })
        expect(() => makeUser(userIsUndefined)).toThrow(new Error('ValidationError: "id" is required'))
    }) */

    it('must have an email in a valid format', () => {
        const wrongEmail = 'awdaddd).com/@bahl'
        const testUser = makeFakeNewUser({
            email: wrongEmail
        })
        expect(() => makeUser(testUser)).toThrow(new Error('ValidationError: "email" must be a valid email'))
    })

    it('must have an email that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, new Date()]

        wrongValues.forEach(x => {
            const wrongUser = makeFakeNewUser({ email: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "email" must be a string'))
        })
    })

    it('must have an email that is not undefined', () => {
        const userIsUndefined = makeFakeNewUser({ email: undefined })
        expect(() => makeUser(userIsUndefined)).toThrow(new Error('ValidationError: "email" is required'))
    })

    it('must have a full name that is less than 50 characters', () => {
        const wrongFullName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        const testUser = makeFakeNewUser({
            fullName: wrongFullName
        })
        expect(() => makeUser(testUser)).toThrow(new Error('ValidationError: "fullName" length must be less than or equal to 50 characters long'))
    })

    it('must have a full name that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, new Date()]

        wrongValues.forEach(x => {
            const wrongUser = makeFakeNewUser({ fullName: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "fullName" must be a string'))
        })
    })

    it('must have a full name that is not undefined', () => {
        const userIsUndefined = makeFakeNewUser({ fullName: undefined })
        expect(() => makeUser(userIsUndefined)).toThrow(new Error('ValidationError: "fullName" is required'))
    })

    it('must have valid roles', () => {
        const wrongRole = 'guest'
        const testUser = makeFakeNewUser({
            role: wrongRole
        })
        expect(() => makeUser(testUser)).toThrow(new Error('ValidationError: "role" must be one of [user, admin]'))
    })

    it('must have a password with a minimum of 6 characters', () => {
        const wrongPass = 'abcd'
        const testUser = makeFakeNewUser({
            password: wrongPass,
            type: 'updatePassword'
        })
        expect(() => makeUser(testUser)).toThrow(new Error('ValidationError: "password" length must be at least 6 characters long'))
    })

    it('must have a password that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, new Date()]

        wrongValues.forEach(x => {
            const wrongUser = makeFakeNewUser({ password: x, type: 'updatePassword' })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "password" must be a string'))
        })
    })

    it('must have a password that is not undefined', () => {
        const userIsUndefined = makeFakeNewUser({ password: undefined, type: 'updatePassword' })
        expect(() => makeUser(userIsUndefined)).toThrow(new Error('ValidationError: "password" is required'))
    })

    it('must have a passwordConfirm that is the same with the password', () => {
        const wrongPC = 'abcdef'
        const testUser = makeFakeNewUser({
            passwordConfirm: wrongPC,
            type: 'updatePassword'
        })
        expect(() => makeUser(testUser)).toThrow(new Error('ValidationError: "passwordConfirm" is not the same with "password"'))
    })

    /* it('must have a passwordConfirm that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, new Date()]

        wrongValues.forEach(x => {
            const wrongUser = {
                type: 'updatePassword',
                passwordConfirm: x,
                password: 'awdasdwada'
            }
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "passwordConfirm" must be a string'))
        })
    }) */

    it('must have a passwordResetToken that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, new Date()]

        wrongValues.forEach(x => {
            const wrongUser = {
                type: 'resetToken',
                passwordResetToken: x
            }
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "passwordResetToken" must be a string'))
        })
    })

    it('must have a passwordResetExpires that is a date', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, 'aiouwyhdawd']

        wrongValues.forEach(x => {
            const wrongUser = {
                type: 'resetToken',
                passwordResetExpires: x
            }
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "passwordResetExpires" must be a valid date'))
        })
    })
})