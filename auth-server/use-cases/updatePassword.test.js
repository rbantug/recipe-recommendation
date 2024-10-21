import { it, describe, expect, beforeAll, beforeEach } from "vitest";

import makeUpdatePassword from "./updatePassword";
import makeAddUser from "./addUser";
import passwordEncrypt from "../../utils/passwordEncryption";
import makeFakeUser from "../../__test__/fixtures/users";

let updatePassword
let addUser
let usersDB

const sampleData = [
    makeFakeUser({ id: 'o6aagfum1wcexrqlgwlbj5sm' }),
    makeFakeUser({ id: 'xows2mm7za9s612368iqzww7' }),
    makeFakeUser({ id: 'rlduhwu9id93b3d86woj5sdd' })
]

beforeAll(() => {
    usersDB = globalThis.usersDB
    updatePassword = makeUpdatePassword({
        usersDB,
        encrypt: passwordEncrypt.encrypt
    })
    addUser = makeAddUser({
        usersDB,
        encrypt: passwordEncrypt.encrypt
    })
})

beforeEach(async () => {
    await Promise.all(sampleData.map(addUser))
})

describe('updatePassword', () => {
    it('should update the password of an existing user', async () => {
        const userInfo = {
            password: 'iawdhnawdaw12',
            passwordConfirm: 'iawdhnawdaw12',
        }

        const update = await updatePassword({ userInfo, userId: sampleData[2].id })

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

        expect(updatedUserWithoutPassword).toEqual(mockUser)
        expect(passwordEncrypt.compare(userInfo.password, password)).resolves.toBe(true)
    })
})