import { hash, compare } from "bcryptjs";

const passwordEncrypt = Object.freeze({
    encrypt: async (password) => await hash(password, 12),
    compare: async (loginPassword, databasePassword) => await compare(loginPassword, databasePassword)
})

export default passwordEncrypt