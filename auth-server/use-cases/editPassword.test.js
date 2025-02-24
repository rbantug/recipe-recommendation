import { it, describe, expect, beforeAll } from "vitest";

import makeEditPassword from "./editPassword.js";
import makeAddUser from "./addUser";
import { makeFakeNewUser } from "../../__test__/fixtures/users";

let editPassword
let addUser
let usersDB

const sampleData = [
    makeFakeNewUser({ id: 'o6aagfum1wcexrqlgwlbj5sm' }),
    makeFakeNewUser({ id: 'xows2mm7za9s612368iqzww7' }),
    makeFakeNewUser({ id: 'rlduhwu9id93b3d86woj5sdd' })
]

beforeAll(async () => {
    usersDB = globalThis.usersDB
    editPassword = makeEditPassword({
        usersDB,
        encrypt: () => 'hotpot'
    })
    addUser = makeAddUser({
        usersDB,
        encrypt: () => 'claypot'
    })

    await Promise.all(sampleData.map(addUser))
})

describe('editPassword', () => {
    it('should update the password of an existing user', async () => {
        const userInfo = {
            password: 'iawdhnawdaw12',
            passwordConfirm: 'iawdhnawdaw12',
        }

        const updatedUser = await editPassword({ userInfo, userId: sampleData[2].id })

        const date = new Date()
        date.setSeconds(0,0)

        const sampleData2Clone = structuredClone(sampleData[2])

        const mockUser = {
            ...sampleData2Clone,
            password: 'hotpot',
            passwordChangedAt: date,
            passwordConfirm: null,
            lastModified: date,
            createdAt: date,
            active: true,
            favoriteRecipes: [],
            passwordResetExpires: null,
            passwordResetToken: null
        }
        delete mockUser.type

        expect(updatedUser).toEqual(mockUser)
    })
})