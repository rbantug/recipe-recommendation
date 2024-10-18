export default function makeListUserByEmail({ usersDB, joi }) {
    return async function listUserByEmail(email) {
        // email format validation

        const validateEmail = joi.object({
            email: joi.string().email()
        })

        const { error, value } = validateEmail.validate({
            email
        })

        if(error) {
            throw new Error('This is not a valid email')
        }

        const result = await usersDB.findOneUser({
            email
        })

        return result
    }
}