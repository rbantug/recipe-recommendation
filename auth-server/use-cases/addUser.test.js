import { it, describe, expect, beforeEach } from "vitest";

import makeAddUser from "./addUser";
import { makeFakeNewUser } from "../../__test__/fixtures/users";
import identity from "../../utils/id";

let usersDB
let addUser

beforeEach(() => {
    usersDB = globalThis.usersDB
    addUser = makeAddUser({ usersDB, encrypt: () => 'abcdefg' })
})

describe('addUser', () => {
    it('should insert the correct user', async () => {
        const sampleData = [
            makeFakeNewUser({ email: 'unbridledPotato@gmail.com' }),
            makeFakeNewUser({ email: 'timidGrapes@gmail.com' }),
            makeFakeNewUser({ email: 'crudeTurnip@gmail.com' }),
        ]

        await Promise.all(sampleData.map(addUser))

        const date = new Date()
        date.setSeconds(0, 0)

        const mockUser = structuredClone(sampleData[0])
        mockUser.password = 'abcdefg'
        mockUser.passwordConfirm = null
        mockUser.passwordChangedAt = null
        mockUser.passwordResetToken = null
        mockUser.passwordResetExpires = null
        mockUser.favoriteRecipes = []
        mockUser.createdAt = date
        mockUser.active = true
        mockUser.lastModified = date
        delete mockUser.type

        const getUser = await usersDB.findOneUser({ email: 'unbridledPotato@gmail.com' })

        const { id, ...getUserWithoutId } = getUser 
        
        const isId = identity.isValid(id)

        expect(getUserWithoutId).toEqual(mockUser)
        expect(isId).toBe(true)
    })
})