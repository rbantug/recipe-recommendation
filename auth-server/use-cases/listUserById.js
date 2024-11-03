export default function makeListUserById({ usersDB, isValid }) {
    return async function listUserById(userId) {
        if(!isValid(userId)) {
            throw new Error('This is not a valid user id')
        }
        
        const result = await usersDB.findOneUser({
            id: userId
        })
        
        return result
    }
}