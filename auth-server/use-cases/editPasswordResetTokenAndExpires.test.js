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
})

afterAll(() => {
    vi.restoreAllMocks()
})

describe('editPasswordResetTokenAndExpires', () => {

    describe('given a valid passwordResetToken, passwordResetExpires and userId with createToken being true', () => {

        it('should return a user updated with the valid passwordResetToken and passwordResetExpires', async () => {
            await addUser(sampleData[1])

            const { resetToken, updatedUser } = await editPasswordResetTokenAndExpires({ userId: 'xows2mm7za9s612368iqzww7', createToken: true })

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

            expect(updatedUser).toEqual(mockData)
            expect(resetToken).toBe('test')
        })
    })

    describe('given a valid passwordResetToken, passwordResetExpires and userId with createToken being false', () => {

        it('should return a user with the passwordResetToken and passwordResetExpires as null', async () => {
            await addUser(sampleData[2])

            const { resetToken, updatedUser } = await editPasswordResetTokenAndExpires({ userId: 'rlduhwu9id93b3d86woj5sdd', createToken: false })

            const date = new Date()
            date.setSeconds(0, 0)

            const mockData = {
                ...sampleData[2],
                id: 'rlduhwu9id93b3d86woj5sdd',
                password: 'drumstick',
                passwordConfirm: null,
                passwordChangedAt: null,
                passwordResetToken: null,
                passwordResetExpires: null,
                favoriteRecipes: [],
                createdAt: date,
                active: true,
                lastModified: date
            }
            delete mockData.type

            expect(updatedUser).toEqual(mockData)
            expect(resetToken).toBe('reset token and expiry date were reverted back to null')
        })
    })
})