import userService from "../use-cases/index.js"
import makeSignup from "./signup.js"
import makeLogin from "./login.js"

import token from "../../utils/token.js"
import passwordEncrypt from "../../utils/passwordEncryption.js"
import AppError from "../../utils/AppError.js"

const signup = makeSignup({ addUser: userService.addUser, signToken: token.signToken, passwordEncrypt: passwordEncrypt.encrypt, AppError })
const login = makeLogin({ listUserByEmail: userService.listUserByEmail, passwordCompare: passwordEncrypt.compare, signToken: token.signToken, AppError })

const userController = Object.freeze({
    signup,
    login
})

export default userController