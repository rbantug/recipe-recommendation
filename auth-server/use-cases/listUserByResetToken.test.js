import { it, expect, describe, beforeAll } from "vitest";

import makeListUserByResetToken from "./listUserByResetToken.js";
import { makeFakeUser } from "../../__test__/fixtures/users.js";

let listUserByResetToken
let usersDB

beforeAll(() => {
    usersDB = globalThis.usersDB
    listUserByResetToken = makeListUserByResetToken({ usersDB })
})

describe('listUserById', () => {

    it('should return the correct user', async () => {

        const sampleData = [
            makeFakeUser({ passwordResetToken: 'ra48a94ksismq6j6zl3dwvum' }),
            makeFakeUser({ passwordResetToken: '5wykybpwombcokgocrchikr5' }),
            makeFakeUser({ passwordResetToken: '2ir8j6zd4ax3lstt7r5nlrz5' })
        ]

        await Promise.all(sampleData.map(usersDB.insertUser))

        const getUser = await listUserByResetToken('2ir8j6zd4ax3lstt7r5nlrz5')

        expect(getUser).toEqual(sampleData[2])
    })
})