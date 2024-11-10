import AppError from "./AppError";

const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        res.status(err.statusCode).json({
            headers: err.headers,
            status: err.status,
            statusCode: err.statusCode,
            message: err.message,
            stack: err.stack
        })
    }
}

const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                headers: err.headers,
                status: err.status,
                statusCode: err.statusCode,
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
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res)
    } else if (process.env.NODE_ENV === 'production') {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error';

        sendErrorProd(err, req, res)
    }
}