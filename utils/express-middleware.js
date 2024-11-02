export default function makeMiddleware(fn) {
    return (req, res, next) => {
        fn(req, res, next)
            .then(err => {
                if (err) {
                    res.status(err.statusCode).json({
                        headers: err.headers,
                        status: err.status,
                        message: err.message,
                        statusCode: err.statusCode,
                    });
                }
            })
            .catch((e) => res.status(500).send({ error: 'An unknown error has occurred.' }));
    }
}