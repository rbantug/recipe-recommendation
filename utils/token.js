// TODO: Try PASETO and JWT

import jwt from 'jsonwebtoken'
import { promisify } from 'util'

/**
 * A function that creates a token.
 * @param {string} userId
 * @returns {string}
 */
async function signToken(userId) {
    try {
        const signPromise = promisify(jwt.sign)

        const newToken = await signPromise(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        return newToken
    } catch (error) {
        console.log(error)
    }

}

/**
 * A function that verifies the token and extracts the data that was encrypted in it
 * @param {string} token - a token that was 
 * @returns {*} the data encrypted in the token. It should contain the user ID
 */
async function verifyToken(token) {
    try {
        const verifyPromise = promisify(jwt.verify)

        const decodedData = await verifyPromise(token, process.env.JWT_SECRET)

        return decodedData
    } catch (error) {
        console.log(error)
    }
}

const token = Object.freeze({
    signToken,
    verifyToken
})

export default token

