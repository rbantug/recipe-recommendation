import AppError from "./AppError";

const handleJWTInvalidSig = () =>
    new AppError('Invalid token. Please try again!', 401);

const handleExpiredToken = () =>
    new AppError('Expired token. Please try to login again', 401);

const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
    }
}

const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            })
        } else {
            console.error('This is a programming error', err)

            res.status(500).json({
                status: 'error',
                message: 'Something went wrong'
            })
        }
    }
}

export default function (err, req, res, next) {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res)
    } else if (process.env.NODE_ENV === 'production') {

        let error

        if (err.name === 'JsonWebTokenError')error = handleJWTInvalidSig()
        
        if (err.name === 'TokenExpiredError') error = handleExpiredToken()   
        
        sendErrorProd(error, req, res)
    }
}