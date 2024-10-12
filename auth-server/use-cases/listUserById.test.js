import { it, expect, describe, beforeAll } from "vitest";

import makeListUserById from "./listUserById.js";
import identity from "../../utils/id.js";

let listUserById

beforeAll(() => {
    listUserById = makeListUserById({ usersDB: globalThis.usersDB, isValid: identity.isValid })
})

describe('listUserById', () => {
    it('should accept a valid id', () => {
        const wrongId = 'aweawdauiwhd'

        expect(listUserById(wrongId)).rejects.toThrow('This is not a valid user id')
    })
})