export default function makeRestrictedTo() {
    return function restrictedTo(req, res, next, roles) {
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
            return {
                headers,
                statusCode: 403,
                status: 'fail',
                message: error.message
            }
        }
    }

}