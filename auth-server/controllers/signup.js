export default function makeSignup({ addUser, listUserByEmail, sendToken }) {
    return async function signup(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const { email, fullName, userName, role, password, passwordConfirm } = httpRequest.body

            await addUser({ email, fullName, userName, role, password, passwordConfirm })

            const getUser = await listUserByEmail(email)

            const { token, cookie } = await sendToken(getUser.id, httpRequest.secure, httpRequest.headers, httpRequest.protocol)

            return {
                headers,
                statusCode: 201,
                status: 'success',
                token,
                cookie,
                data: {
                    email: getUser.email,
                    fullName: getUser.fullName,
                    userName: getUser.userName,
                    role: getUser.role,
                    favoriteRecipes: getUser.favoriteRecipes
                }
            }
        } catch (error) {
            return {
                headers,
                status: 'fail',
                statusCode: error.statusCode,
                message: error.message
            }
        }
    }
}