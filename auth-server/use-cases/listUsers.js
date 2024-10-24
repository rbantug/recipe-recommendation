export default function makeListUsers({ usersDB }) {
    return async function listUsers() {
        const result = await usersDB.findAll()

        return result
    }
}