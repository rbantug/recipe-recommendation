export default function makeRestrictedTo(...roles) {
    return function restrictedTo(req, res, next) {
        const headers = {
            'Content-Type': 'application/json'
        }

        /* if (!roles.includes(req.user.role)) {
            return {
                headers,
                statusCode: 403,
                status: 'fail',
                message: 'You are not authorized to perform this action'
            }
        }

        next() */

        try {
            if (!roles.includes(req.user.role)) throw new Error('You are not authorized to perform this action')

            next()
        } catch (error) {
            res.status(403).json({
                headers: headers,
                status: 'fail',
                message: error.message,
                statusCode: 403,
            })
        }
    }

}