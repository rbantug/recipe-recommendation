import bcryptjs from "bcryptjs";

//const { hash, compare } = bcryptjs

async function encryptPassword(password) {
    return bcryptjs.hash(password, 12)
}

async function comparePassword(loginPassword, databasePassword) {
    const checkPassword = bcryptjs.compare(loginPassword, databasePassword)
    return checkPassword
}

const passwordEncrypt = Object.freeze({
    encryptPassword,
    comparePassword
})

export default passwordEncrypt