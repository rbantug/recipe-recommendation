import { it, describe, expect, beforeAll } from "vitest";

import makeEditPassword from "./editPassword.js";
import makeAddUser from "./addUser";
import passwordEncrypt from "../../utils/passwordEncryption";
import makeFakeUser from "../../__test__/fixtures/users";

let editPassword
let addUser
let usersDB

const sampleData = [
    makeFakeUser({ id: 'o6aagfum1wcexrqlgwlbj5sm' }),
    makeFakeUser({ id: 'xows2mm7za9s612368iqzww7' }),
    makeFakeUser({ id: 'rlduhwu9id93b3d86woj5sdd' })
]

beforeAll(async () => {
    usersDB = globalThis.usersDB
    editPassword = makeEditPassword({
        usersDB,
        encrypt: passwordEncrypt.encrypt
    })
    addUser = makeAddUser({
        usersDB,
        encrypt: passwordEncrypt.encrypt
    })

    await Promise.all(sampleData.map(addUser))
})

describe('editPassword', () => {
    it('should update the password of an existing user', async () => {
        const userInfo = {
            password: 'iawdhnawdaw12',
            passwordConfirm: 'iawdhnawdaw12',
        }

        const update = await editPassword({ userInfo, userId: sampleData[2].id })

        const { password, ...updatedUserWithoutPassword } = update

        const date = new Date()
        date.setSeconds(0,0)

        const mockUser = {
            ...sampleData[2],
            passwordChangedAt: date,
            passwordConfirm: null,
            lastModified: date
        }
        delete mockUser.password
        delete mockUser.type

        expect(updatedUserWithoutPassword).toEqual(mockUser)
        expect(passwordEncrypt.compare(userInfo.password, password)).resolves.toBe(true)
    })
})