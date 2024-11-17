import { describe, expect, it, beforeAll, afterAll, vi } from "vitest";
import crypto from 'crypto'

import makeEditPasswordResetTokenAndExpires from "./editPasswordResetTokenAndExpires";
import makeAddUser from "./addUser";
import { makeFakeNewUser } from "../../__test__/fixtures/users";

let editPasswordResetTokenAndExpires
let usersDB
let addUser

const sampleData = [
    makeFakeNewUser({ id: 'o6aagfum1wcexrqlgwlbj5sm' }),
    makeFakeNewUser({ id: 'xows2mm7za9s612368iqzww7' }),
    makeFakeNewUser({ id: 'rlduhwu9id93b3d86woj5sdd' })
]


beforeAll(async () => {
    vi.mock('crypto', () => {
        return {
            default: {
                randomBytes: vi.fn().mockReturnValue('test'),
                createHash: vi.fn().mockReturnThis(),
                update: vi.fn().mockReturnThis(),
                digest: vi.fn().mockReturnValue('testToken')
            }
        }
    })

    usersDB = globalThis.usersDB
    addUser = makeAddUser({ usersDB, encrypt: () => 'drumstick' })
    editPasswordResetTokenAndExpires = makeEditPasswordResetTokenAndExpires({ usersDB, crypto })

    await Promise.all(sampleData.map(addUser))
})

afterAll(() => {
    vi.restoreAllMocks()
})

describe('editPasswordResetTokenAndExpires', () => {

    describe('given a valid passwordResetToken, passwordResetExpires and userId', () => {

        it('should return a user with an updated the passwordResetToken and passwordResetExpires', async () => {
            const updateUser = await editPasswordResetTokenAndExpires({ userId: 'xows2mm7za9s612368iqzww7' })

            const date = new Date()
            date.setSeconds(0, 0)

            const passwordResetExpires = new Date(Date.now() + 600000)
            passwordResetExpires.setSeconds(0, 0)

            const mockData = {
                ...sampleData[1],
                id: 'xows2mm7za9s612368iqzww7',
                password: 'drumstick',
                passwordConfirm: null,
                passwordChangedAt: null,
                passwordResetToken: 'testToken',
                passwordResetExpires,
                favoriteRecipes: [],
                createdAt: date,
                active: true,
                lastModified: date
            }
            delete mockData.type

            expect(updateUser).toEqual(mockData)
        })
    })
})