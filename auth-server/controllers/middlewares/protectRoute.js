export default function makeProtectRoute(listUserById, verifyToken, AppError) {
    return async function protectRoute(req, res, next) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            // Getting the token and checking if it exist
            let token

            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1]
            } else if (req.cookies?.jwt) {
                token = req.cookies.jwt
            }

            if (!token) {
                throw new AppError('The user is not logged in', 401, headers)
            }
            // Token verification
            const decodeData = await verifyToken(token)

            // Check if the user still exist
            const currentUser = await listUserById(decodeData.userId)
            const removeProp = ['password', 'passwordConfirm', 'passwordChangedAt', 'passwordResetToken', 'passwordResetExpires', 'createdAt', 'lastModified', 'type']
            removeProp.forEach(x => delete currentUser[x])

            // TODO: check if the user changed the password after the token was issued

            req.user = currentUser
            next()

        } catch (error) {
           next(error)
        }
    }
}