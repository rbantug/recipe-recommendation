export default function makeLogin({ listUserByEmail, passwordCompare, signToken, AppError }) {
    return async function login(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const { email, password, ...userInfo } = httpRequest.body
            
            if (!email || !password) {
                throw new Error('Please provide email and password')
            }

            const getUser = await listUserByEmail(email)

            const checkPassword = await passwordCompare(password, getUser.password)

            if (!checkPassword) {
                throw new Error('Incorrect email or password')
            }

            const token = await signToken(getUser.id)

            const cookie = [{
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
                cookie
            }
        } catch (error) {
            return {
                headers,
                status: 'fail',
                statusCode: 400,
                message: error.message
            }
        }
    }
}