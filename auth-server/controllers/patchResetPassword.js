export default function makePatchResetPassword({ listUserByResetToken, editPassword, editPasswordResetTokenAndExpires, sendToken, crypto, AppError }) {
    return async function patchResetPassword(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            // get token from req.params.token
            const resetToken = httpRequest.params.token

            if(!resetToken) {
                throw new AppError('A token is required', 403)
            }

            const hashedToken = crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex')

            // get user based on the token
            const getUser = await listUserByResetToken(hashedToken)

            // get new password and passwordConfirm from httpRequest.body
            const { password, passwordConfirm } = httpRequest.body

            // update the user's password and passwordConfirm
            await editPassword({ userInfo: { password, passwordConfirm }, userId: getUser.id })

            // set passwordResetToken and passwordResetExpires to null
            await editPasswordResetTokenAndExpires({ userId: getUser.id, createToken: false })

            // send authentication token to user
            const { token, cookie } = await sendToken(getUser.id, httpRequest.secure, httpRequest.headers, httpRequest.protocol)

            return {
                headers,
                statusCode: 200,
                status: 'success',
                data: {
                    email: getUser.email,
                    fullName: getUser.fullName,
                    userName: getUser.userName,
                    role: getUser.role,
                    favoriteRecipes: getUser.favoriteRecipes
                },
                token,
                cookie
            }

        } catch (error) {
            return {
                headers,
                status: 'fail',
                statusCode: error.statusCode,
                message: error.message,
                stack: error.stack
            }
        }
    }
}