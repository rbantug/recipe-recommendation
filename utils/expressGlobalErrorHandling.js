import AppError from "./AppError"

export default function (err, req, res, next) {

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res)
    } else if (process.env.NODE_ENV === 'production') {

        if (err.message === 'The recipe does not exist') {
            err = handleNonexistingResource(err)
        }

        if (err.message === 'The user does not exist') {
            err = handleNonexistingResource(err)
        }
        
        if (err.message === 'This query is invalid') {
            err = handleNonexistingResource(err)
        }

        if (err.message.startsWith('ValidationError')) {
            err = handleJoiValidationError(err)
        }

        // These are programming errors. I need to keep the stack trace for debugging. The only way to test them is to deliberately add a bug in your code.

        if (err.message === 'You can only change properties that are related to resetting the token') {
            const newProps = handleErrorDB()
            err = { ...err, ...newProps }
            err.programmingError = true
        }

        if (err.message === 'You can\'t change these properties') {
            const newProps = handleErrorDB()
            err = { ...err, ...newProps }
            err.programmingError = true
        }

        sendErrorProd(err, req, res)
    }
}

function sendErrorDev (err, req, res) {
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

function sendErrorProd (err, req, res) {
    if (req.originalUrl.startsWith('/api')) {
        if(err.programmingError) {
            console.error(err)
        }

        res.status(err.statusCode).json({
            headers: err.headers,
            status: err.status,
            statusCode: err.statusCode,
            message: err.message
        })
    }
}

function handleNonexistingResource(err) {
    return new AppError(err.message, 404)
}

function handleJoiValidationError(err) {
    const errMsg = err.message.split(': ')
    return new AppError(`Invalid input data: ${errMsg[1]}`, 400)
}

function handleErrorDB() {
    return {
        statusCode: 500,
        message: 'Something went wrong'
    }
}
