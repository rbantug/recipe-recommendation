export default function makeLogin({ listUserByEmail, passwordCompare, signToken, AppError }) {
    return async function login(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const { email, password, ...userInfo } = httpRequest.body

            if (!email || !password) {
                throw new AppError('Please provide email and password', 400)
            }

            const getUser = await listUserByEmail(email)

            const checkPassword = await passwordCompare(password, getUser.password)

            if (!checkPassword) {
                throw new AppError('Incorrect email or password', 401)
            }

            const token = signToken({ userId: getUser.id })

            const cookies = [{
                name: 'jwt',
                payload: token,
                options: {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 3600000), // 2 hours
                    httpOnly: true,
                    secure: httpRequest.secure || httpRequest.headers['x-forwarded-proto'] === 'https',
                }
            }]

            return {
                headers,
                statusCode: 200,
                status: 'success',
                token,
                data: {
                    email: getUser.email,
                    fullName: getUser.fullName,
                    userName: getUser.userName,
                    role: getUser.role,
                    favoriteRecipes: getUser.favoriteRecipes
                },
                cookies
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