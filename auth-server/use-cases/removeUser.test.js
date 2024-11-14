import { describe, it, expect, beforeAll } from "vitest";

import makeRemoveUser from "./removeUser.js";
import { makeFakeNewUser } from "../../__test__/fixtures/users.js";
import makeAddUser from "./addUser";
import makeListUsers from "./listUsers";

let usersDB
let removeUser
let addUser
let listUsers

const sampleData = [
    makeFakeNewUser({ id: '9axppnhflavp7244tz5mqobd' }),
    makeFakeNewUser({ id: 'mok0ueo3f9fh28jbz3qxrwn1' }),
    makeFakeNewUser({ id: 'a17d15xole94d3oonoqeot1g' })
]

beforeAll(async () => {
    usersDB = globalThis.usersDB
    removeUser = makeRemoveUser({ usersDB })
    addUser = makeAddUser({
        usersDB,
        encrypt: () => 'hotpot'
    })
    listUsers = makeListUsers({ usersDB })
})

describe('removeUser', () => {
    it('should remove the correct user', async () => {
        await Promise.all(sampleData.map(addUser))

        const byeUser = 'a17d15xole94d3oonoqeot1g'

        const deleted = await removeUser({ userId: byeUser })

        const allUsers = await listUsers()

        allUsers.forEach(x => {
            expect(x.id).not.toBe('a17d15xole94d3oonoqeot1g')
        })

        expect(deleted).toBe('User was deleted')
        expect(allUsers.length).toBe(2)

    })
})