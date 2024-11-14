export default function makeListUserByEmail({ usersDB, checkEmail }) {
    return async function listUserByEmail(email) {
        // email format validation
        const isEmail = checkEmail(email)
        
        if(!isEmail) {
            throw new Error('This is not a valid email')
        }

        const result = await usersDB.findOneUser({
            email
        })

        return result
    }
}