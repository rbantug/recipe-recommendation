export default function makePatchMyPassword({ listUserById, editPassword, sendToken, comparePassword, AppError }) {
    return async function patchMyPassword(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            // check if user exist using the userId from httpRequest.user
            const { id } = httpRequest.user
            const getUser = await listUserById(id)

            // extract new password and passwordConfirm from httpRequest.body and check if the old password provided by the user is correct
            const { newPassword, newPasswordConfirm, oldPassword } = httpRequest.body
            const checkPassword = await comparePassword(oldPassword, getUser.password)

            if (!checkPassword) {
                throw new AppError('Wrong Password', 401)
            }

            // update password and passwordConfirm
            await editPassword({ userInfo: {
                password: newPassword,
                passwordConfirm: newPasswordConfirm
            }, userId: getUser.id })

            // create new authentication token and cookie
            const { cookie, token } = await sendToken(getUser.id, httpRequest.secure, httpRequest.headers, httpRequest.protocol)

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
                statusCode: error.statusCode || 400,
                message: error.message,
                stack: error.stack
            }
        }
    }
}