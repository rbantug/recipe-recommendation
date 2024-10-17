import { describe, it, expect } from "vitest";

import makeFakeUser from "../../../__test__/fixtures/users";
import makeUser from './index.js'

describe('user', () => {
    it('must have an id that has 24 characters', () => {
        const wrongId = 'aiodyuwqe2'
        const testUser = makeFakeUser({
            id: wrongId
        })
        expect(() => makeUser(testUser)).toThrow(new Error('ValidationError: "id" length must be 24 characters long'))
    })

    it('must have an id that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, new Date()]

        wrongValues.forEach(x => {
            const wrongUser = makeFakeUser({ id: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "id" must be a string'))
        })
    })

    it('must have an id that is not undefined', () => {
        const userIsUndefined = makeFakeUser({ id: undefined })
        expect(() => makeUser(userIsUndefined)).toThrow(new Error('ValidationError: "id" is required'))
    })

    it('must have an email in a valid format', () => {
        const wrongEmail = 'awdaddd).com/@bahl'
        const testUser = makeFakeUser({
            email: wrongEmail
        })
        expect(() => makeUser(testUser)).toThrow(new Error('ValidationError: "email" must be a valid email'))
    })

    it('must have an email that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, new Date()]

        wrongValues.forEach(x => {
            const wrongUser = makeFakeUser({ email: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "email" must be a string'))
        })
    })

    it('must have an email that is not undefined', () => {
        const userIsUndefined = makeFakeUser({ email: undefined })
        expect(() => makeUser(userIsUndefined)).toThrow(new Error('ValidationError: "email" is required'))
    })

    it('must have a full name that is less than 50 characters', () => {
        const wrongFullName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        const testUser = makeFakeUser({
            fullName: wrongFullName
        })
        expect(() => makeUser(testUser)).toThrow(new Error('ValidationError: "fullName" length must be less than or equal to 50 characters long'))
    })

    it('must have a full name that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, new Date()]

        wrongValues.forEach(x => {
            const wrongUser = makeFakeUser({ fullName: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "fullName" must be a string'))
        })
    })

    it('must have a full name that is not undefined', () => {
        const userIsUndefined = makeFakeUser({ fullName: undefined })
        expect(() => makeUser(userIsUndefined)).toThrow(new Error('ValidationError: "fullName" is required'))
    })

    it('must have valid roles', () => {
        const wrongRole = 'guest'
        const testUser = makeFakeUser({
            role: wrongRole
        })
        expect(() => makeUser(testUser)).toThrow(new Error('ValidationError: "role" must be one of [user, admin]'))
    })

    it('must have a password with a minimum of 6 characters', () => {
        const wrongPass = 'abcd'
        const testUser = makeFakeUser({
            password: wrongPass
        })
        expect(() => makeUser(testUser)).toThrow(new Error('ValidationError: "password" length must be at least 6 characters long'))
    })

    it('must have a password that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, new Date()]

        wrongValues.forEach(x => {
            const wrongUser = makeFakeUser({ password: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "password" must be a string'))
        })
    })

    it('must have a password that is not undefined', () => {
        const userIsUndefined = makeFakeUser({ password: undefined })
        expect(() => makeUser(userIsUndefined)).toThrow(new Error('ValidationError: "password" is required'))
    })

    it('must have a passwordConfirm that is the same with the password', () => {
        const wrongPC = 'abcdef'
        const testUser = makeFakeUser({
            passwordConfirm: wrongPC
        })
        expect(() => makeUser(testUser)).toThrow(new Error('ValidationError: "passwordConfirm" is not the same with "password"'))
    })

    it('must have a passwordConfirm that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, new Date()]

        wrongValues.forEach(x => {
            const wrongUser = makeFakeUser({ passwordConfirm: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "passwordConfirm" must be a string'))
        })
    })

    it('must have a passwordChangedAt that is a date', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null]

        wrongValues.forEach(x => {
            const wrongUser = makeFakeUser({ passwordChangedAt: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "passwordChangedAt" must be a valid date'))
        })
    })

    it('must have a passwordResetToken that is a string', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, new Date()]

        wrongValues.forEach(x => {
            const wrongUser = makeFakeUser({ passwordResetToken: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "passwordResetToken" must be a string'))
        })
    })

    it('must have a passwordResetExpires that is a date', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, 'anbasd']

        wrongValues.forEach(x => {
            const wrongUser = makeFakeUser({ passwordResetExpires: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "passwordResetExpires" must be a valid date'))
        })
    })

    it('must have a favoriteRecipes that is an array', () => {
        const wrongValues = [100, true, {pickle: 1}, new Date(), 'anbasd', null]

        wrongValues.forEach(x => {
            const wrongUser = makeFakeUser({ favoriteRecipes: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "favoriteRecipes" must be an array'))
        })
    })

    it('must have a createdAt that is a date', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, 'anbasd']

        wrongValues.forEach(x => {
            const wrongUser = makeFakeUser({ createdAt: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "createdAt" must be a valid date'))
        })
    })

    it('must have an "active" property that is a boolean', () => {
        const wrongValues = [100, {pickle: 1}, ['tamarind', 9], null, 'anbasd', new Date()]

        wrongValues.forEach(x => {
            const wrongUser = makeFakeUser({ active: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "active" must be a boolean'))
        })
    })

    it('must have a lastModified that is a date', () => {
        const wrongValues = [100, true, {pickle: 1}, ['tamarind', 9], null, 'anbasd']

        wrongValues.forEach(x => {
            const wrongUser = makeFakeUser({ lastModified: x })
            expect(() => makeUser(wrongUser)).toThrow(new Error('ValidationError: "lastModified" must be a valid date'))
        })
    })
})