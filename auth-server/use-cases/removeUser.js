export default function makeRemoveUser({ usersDB }) {
    return async function removeUser({ userId }) {
        const deleteUser = await usersDB.deleteUser({ id: userId })

        return deleteUser
    }
}