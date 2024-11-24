import makeUser from "../entities/user";

export default function makeEditPasswordResetTokenAndExpires({ usersDB, crypto }) {
    return async function editPasswordResetTokenAndExpires({ userId, createToken }) {
        let resetToken, passwordResetToken, passwordResetExpires

        if(createToken) {
            resetToken = crypto.randomBytes(32).toString('hex')
            passwordResetToken = crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex')
            passwordResetExpires = new Date(Date.now() + 600000) // 10 minutes
            passwordResetExpires.setSeconds(0,0)
        } else {
            resetToken = 'reset token and expiry date were reverted back to null'
            passwordResetToken = null
            passwordResetExpires = null
        }

        const user = makeUser({ type: 'resetToken', passwordResetToken, passwordResetExpires })

        const updatedUser = await usersDB.updateUser(userId, {
            passwordResetToken: user.getPasswordResetToken(),
            passwordResetExpires: user.getPasswordResetExpires(),
            type: user.getType()
        })

        return { resetToken, updatedUser }
    }
}