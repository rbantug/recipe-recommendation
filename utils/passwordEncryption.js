import bcryptjs from "bcryptjs";

//const { hash, compare } = bcryptjs

async function encryptPassword(password) {
    const hash = await bcryptjs.hash(password, 12)
    return hash
}

async function comparePassword(loginPassword, databasePassword) {
    const checkPassword = await bcryptjs.compare(loginPassword, databasePassword)
    return checkPassword
}

const passwordEncrypt = Object.freeze({
    encryptPassword,
    comparePassword
})

export default passwordEncrypt