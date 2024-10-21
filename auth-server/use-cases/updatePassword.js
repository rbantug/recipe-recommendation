import makeUser from "../entities/user";

export default function makeUpdatePassword({ usersDB, encrypt }) {
    return async function updatePassword({ userInfo, userId }) {
        const user = makeUser({ type: 'updatePassword', ...userInfo })

        const hashedPassword = await encrypt(user.getPassword())

        const date = new Date()
        date.setSeconds(0,0)

        const patchPassword = await usersDB.updateUser(userId, {
            password: hashedPassword,
            passwordConfirm: null,
            passwordChangedAt: date,
            type: user.getType()
        })

        return patchPassword
    }
}