import { it, describe, expect, beforeEach } from "vitest";

import makeAddUser from "./addUser";
import { makeFakeUser, makeFakeNewUser } from "../../__test__/fixtures/users";
import passwordEncrypt from "../../utils/passwordEncryption";
import identity from "../../utils/id";

let usersDB
let addUser

beforeEach(() => {
    usersDB = globalThis.usersDB
    addUser = makeAddUser({ usersDB, encrypt: passwordEncrypt.encryptPassword })
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
        mockUser.passwordConfirm = null
        mockUser.passwordChangedAt = null
        mockUser.passwordResetToken = null
        mockUser.passwordResetExpires = null
        mockUser.favoriteRecipes = []
        mockUser.createdAt = date
        mockUser.active = true
        mockUser.lastModified = date
        delete mockUser.password
        delete mockUser.type

        const getUser = await usersDB.findOneUser({ email: 'unbridledPotato@gmail.com' })

        const { password, id, ...getUserWithoutPasswordandId } = getUser 

        const comparePasswords = await passwordEncrypt.comparePassword(sampleData[0].password, getUser.password)
        
        const isId = identity.isValid(id)

        expect(getUserWithoutPasswordandId).toEqual(mockUser)
        expect(comparePasswords).toEqual(true)
        expect(isId).toBe(true)
    })
})