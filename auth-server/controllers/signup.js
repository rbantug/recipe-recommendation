export default function makeSignup({ addUser, signToken, passwordEncrypt, AppError }) {
    return async function signup(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const { email, fullName, userName, role, password, passwordConfirm } = httpRequest.body

            if(password !== passwordConfirm) {
                throw new AppError('The password and passwordConfirm are not the same', 400)
            }

            const hashPassword = await passwordEncrypt(password)
            const insert = await addUser({ email, fullName, userName, role, password: hashPassword, passwordConfirm: null })

            const token = signToken({ userId: insert.insertedId })

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
                statusCode: 201,
                status: 'success',
                token,
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