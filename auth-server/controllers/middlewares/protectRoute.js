export default function makeProtectRoute(listUserById, verifyToken, AppError) {
    return async function protectRoute(httpRequest, res, next) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            // Getting the token and checking if it exist
            let token

            if (httpRequest.headers.authorization && httpRequest.headers.authorization.startsWith('Bearer')) {
                token = httpRequest.headers.authorization.split(' ')[1]
            } else if (httpRequest.cookies?.jwt) {
                token = httpRequest.cookies.jwt
            }
            if (!token) {
                throw new Error('The user is not logged in')
            }
            // Token verification
            const decodeData = await verifyToken(token)

            // Check if the user still exist
            const currentUser = await listUserById(decodeData.userId.userId)
            const removeProp = ['password', 'passwordConfirm', 'passwordChangedAt', 'passwordResetToken', 'passwordResetExpires', 'createdAt', 'lastModified', 'type']
            removeProp.forEach(x => delete currentUser[x])

            // TODO: check if the user changed the password after the token was issued

            httpRequest.user = currentUser
            next()

        } catch (error) {
            return next(new AppError(error.message, 401, headers))
        }
    }
}