import { it, expect, describe, beforeAll } from "vitest";

import makeListUserById from "./listUserById.js";
import identity from "../../utils/id.js";
import { makeFakeUser } from "../../__test__/fixtures/users.js";

let listUserById
let usersDB

beforeAll(() => {
    usersDB = globalThis.usersDB
    listUserById = makeListUserById({ usersDB, isValid: identity.isValid })
})

describe('listUserById', () => {
    it('should accept a valid id', () => {
        const wrongId = 'aweawdauiwhd'

        expect(listUserById(wrongId)).rejects.toThrow('This is not a valid user id')
    })

    it('should return the correct user', async () => {
        const sampleData = [
            makeFakeUser({ id: '83vdugsqrt3pg2s0r9n144a1' }),
            makeFakeUser({ id: '4vvxh35u5u8ihcgye5m5ku33' }),
            makeFakeUser({ id: 'v267rr1m9z070ajg5jo4y9d6' })
        ]

        await Promise.all(sampleData.map(usersDB.insertUser))

        const getUser = await listUserById('v267rr1m9z070ajg5jo4y9d6')

        expect(getUser).toEqual(sampleData[2])
    })
})