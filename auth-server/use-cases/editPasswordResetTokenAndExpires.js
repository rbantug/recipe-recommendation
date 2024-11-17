import makeUser from "../entities/user";

export default function makeEditPasswordResetTokenAndExpires({ usersDB, crypto }) {
    return async function editPasswordResetTokenAndExpires({  userId }) {
        const resetToken = crypto.randomBytes(32).toString('hex')
        const passwordResetToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')
        const passwordResetExpires = new Date(Date.now() + 600000)
        passwordResetExpires.setSeconds(0,0)

        const user = makeUser({ type: 'resetToken', passwordResetToken, passwordResetExpires })

        const patchUser = await usersDB.updateUser(userId, {
            passwordResetToken: user.getPasswordResetToken(),
            passwordResetExpires: user.getPasswordResetExpires(),
            type: user.getType()
        })

        return patchUser
    }
}