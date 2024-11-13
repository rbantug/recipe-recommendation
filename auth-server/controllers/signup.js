export default function makeSignup({ addUser, listUserByEmail, signToken }) {
    return async function signup(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const { email, fullName, userName, role, password, passwordConfirm } = httpRequest.body

            await addUser({ email, fullName, userName, role, password, passwordConfirm })

            const getUser = await listUserByEmail(email)

            const token = await signToken(getUser.id)

            const cookie = [{
                name: 'jwt',
                payload: token,
                options: {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 3600000), // 2 hours
                    httpOnly: true,
                    secure: httpRequest.secure || httpRequest.headers['x-forwarded-proto'] === 'https',
                    sameSite: 'Lax',
                    path: '/api'
                }
            }]

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