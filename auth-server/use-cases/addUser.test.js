import { it, describe, expect, beforeEach } from "vitest";

import makeAddUser from "./addUser";
import makeFakeUser from "../../__test__/fixtures/users";
import passwordEncrypt from "../../utils/passwordEncryption";

let usersDB
let addUser

beforeEach(() => {
    usersDB = globalThis.usersDB
    addUser = makeAddUser({ usersDB, encrypt: passwordEncrypt.encrypt })
})

describe('addUser', () => {
    it('should insert the correct user', async () => {
        const sampleData = [
            makeFakeUser({ email: 'unbridledPotato@gmail.com' }),
            makeFakeUser({ email: 'timidGrapes@gmail.com' }),
            makeFakeUser({ email: 'crudeTurnip@gmail.com' }),
        ]

        await Promise.all(sampleData.map(addUser))

        const mockUser = structuredClone(sampleData[0])
        mockUser.passwordConfirm = null
        delete mockUser.password
        delete mockUser.type

        const getUser = await usersDB.findOneUser({ email: 'unbridledPotato@gmail.com' })

        const { password, ...getUserWithoutPassword } = getUser 

        const comparePasswords = await passwordEncrypt.compare(sampleData[0].password, getUser.password)

        expect(getUserWithoutPassword).toEqual(mockUser)
        expect(comparePasswords).toEqual(true)
    })
})