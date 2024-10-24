// TODO: Try PASETO and JWT

import jwt from 'jsonwebtoken'

const token = Object.freeze({
    sign: (userId) => jwt.sign(userId, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    }),
    verify: (token) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) throw new Error(err)
            return decoded
        })
    }
})

export default token

