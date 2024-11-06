export default function makeRestrictedTo(AppError, ...roles) {
    return function restrictedTo(req, res, next) {
        const headers = {
            'Content-Type': 'application/json'
        }

        if (!roles.includes(req.user.role)) {
            return next(new AppError('You are not authorized to perform this action', 403))
        }

        next()
    }

}