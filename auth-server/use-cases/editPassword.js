import makeUser from "../entities/user/index.js";

export default function makeEditPassword({ usersDB, encrypt }) {
    return async function editPassword({ userInfo, userId }) {
        const getProps = Object.keys(userInfo)
        const checkProps = getProps.every(x => x === 'password' || x === 'passwordConfirm')

        if (!checkProps) {
            throw new Error('You can only accept the "password" and "passwordConfirm"')
        }

        const user = makeUser({ type: 'updatePassword', ...userInfo })

        const hashedPassword = await encrypt(user.getPassword())

        const date = new Date()
        date.setSeconds(0, 0)

        const patchPassword = await usersDB.updateUser(userId, {
            password: hashedPassword,
            passwordConfirm: null,
            passwordChangedAt: date,
            type: user.getType()
        })

        return patchPassword
    }
}