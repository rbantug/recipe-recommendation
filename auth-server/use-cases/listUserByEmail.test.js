import { it, expect, describe, beforeAll } from "vitest";

import makeListUserByEmail from "./listUserByEmail.js";
import { makeFakeUser } from "../../__test__/fixtures/users.js";

let listUserByEmail
let usersDB

beforeAll(() => {
    usersDB = globalThis.usersDB
})

describe('listUserByEmail', () => {
    it('should accept a valid email', () => {
        listUserByEmail = makeListUserByEmail({ usersDB, checkEmail: () => false })

        const wrongEmail = 'awdawd.com@/bahkkj'

        expect(listUserByEmail(wrongEmail)).rejects.toThrow('This is not a valid email')
    })

    it('should return the correct user', async () => {
        listUserByEmail = makeListUserByEmail({ usersDB, checkEmail: () => true })

        const sampleData = [
            makeFakeUser({ email: 'bubblybanana@gmail.com' }),
            makeFakeUser({ email: 'deniedblueberry@gmail.com' }),
            makeFakeUser({ email: 'unhingedpeach@gmail.com' }),
        ]

        await Promise.all(sampleData.map(usersDB.insertUser))

        const getUser = await listUserByEmail('deniedblueberry@gmail.com')

        expect(getUser).toEqual(sampleData[1])
    })
})