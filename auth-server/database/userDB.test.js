import { beforeEach, describe, expect, it, vi } from "vitest";

import makeFakeUser from '../../__test__/fixtures/users.js'

let usersDB;

const sampleData = [
    makeFakeUser({ id: 's6w8d9m4mo8xp7zlvhhgjk8g' }),
    makeFakeUser({ id: 'ipgnhryzbaqb6v4kaus71o33' }),
    makeFakeUser({ id: 'mgcg0pocpwnjsdmvou3x6ip5' })
]

beforeEach(async() => {
    usersDB = globalThis.usersDB
    await usersDB.insertUser(sampleData[0])
    await usersDB.insertUser(sampleData[1])
    await usersDB.insertUser(sampleData[2])
})

describe('usersDB', () => {
    it('should list all users', async () => {
        const list = await usersDB.findAll()

        let i = 0
        list.forEach(x => {
            const { password, passwordConfirm, ...user } = sampleData[i]
            expect(x).toEqual(user)
            i++
        })

        expect(list.length).toBe(3)
    })

    it('should find a single user', async () => {
        const findSingleUser = await usersDB.findOneUser({ id: 'mgcg0pocpwnjsdmvou3x6ip5' })

        expect(findSingleUser).toEqual(sampleData[2]) 
    })

    it('should throw an error if the single user does not exist', async () => {
        const wrongId = 'dawdawd232w3sachjggdf2du'

         expect(usersDB.findOneUser({ id: wrongId })).rejects.toThrow(new Error('The user does not exist'))
    })

    it('should update a single user', async () => {
        const date = new Date()

        const newUsernamne = 'blah'
        const update = await usersDB.updateUser('ipgnhryzbaqb6v4kaus71o33', {
            username: newUsernamne
        })
        update.lastModified = date

        const mockData = structuredClone(sampleData[1])
        mockData.username = newUsernamne
        mockData.lastModified = date
        const { password, passwordConfirm, ...mockActual } = mockData

        expect(update).toEqual(mockActual)
    })

    it('should throw an error if you try to update the "password", "confirmPassword" or "id" properties', async () => {
        const update1 = usersDB.updateUser('ipgnhryzbaqb6v4kaus71o33', {
            password: 'asdasdawd'
        })

        const update2 = usersDB.updateUser('ipgnhryzbaqb6v4kaus71o33', {
            confirmPassword: 'asdasdawd'
        })

        const update3 = usersDB.updateUser('ipgnhryzbaqb6v4kaus71o33', {
            id: 'asdioydaiwduaw8d9ad'
        })

        expect(update1).rejects.toThrow(new Error('You can\'t change these properties'))
        expect(update2).rejects.toThrow(new Error('You can\'t change these properties'))
        expect(update3).rejects.toThrow(new Error('You can\'t change these properties'))
    })

    it('should throw an error if an invalid user id was used to update a user', async () => {
        const wrongId = 'dawdawd232w3sachjggdf2du'

        const update = usersDB.updateUser(wrongId, {
            username: 'shrimp'
        })

        expect(update).rejects.toThrow(new Error('The user does not exist'))
    })

    it('should delete a user', async () => {
        const deleteUser = await usersDB.deleteUser({ id: 'mgcg0pocpwnjsdmvou3x6ip5' })

        expect(deleteUser).toBe('User was deleted')
    })

    it('should throw an error if the user that will be deleted does not exist', () => {
        const wrongId = 'dawdawd232w3sachjggdf2du'

        const deleteUser = usersDB.deleteUser({ id: wrongId })

        expect(deleteUser).rejects.toThrow(new Error('This user does not exist'))
    })

    it('should throw an error if it will delete more than 1 user', () => {
        const deleteUser = usersDB.deleteUser({ active: true })

        expect(deleteUser).rejects.toThrow(new Error('This query is invalid'))
    })
})