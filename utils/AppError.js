export default class AppError extends Error {
    constructor(message, statusCode, headers) {
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.headers = headers || { "Content-Type": "application/json" }
        Error.captureStackTrace(this, this.constructor)
    }
}