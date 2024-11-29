export default function makeLogin({ listUserByEmail, passwordCompare, sendToken, AppError }) {
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