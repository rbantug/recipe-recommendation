import crypto from 'crypto'

import userService from "../use-cases/index.js"
import makeSignup from "./signup.js"
import makeLogin from "./login.js"
import makePatchForgotPassword from "./patchForgotPassword.js"
import makePatchResetPassword from "./patchResetPassword.js"

import token from "../../utils/token.js"
import passwordEncrypt from "../../utils/passwordEncryption.js"
import AppError from "../../utils/AppError.js"
import Email from "../../utils/email.js"

const signup = makeSignup({ addUser: userService.addUser, listUserByEmail: userService.listUserByEmail, sendToken: token.sendToken })

const login = makeLogin({ listUserByEmail: userService.listUserByEmail, passwordCompare: passwordEncrypt.comparePassword, sendToken: token.sendToken, AppError })

const patchForgetPassword = makePatchForgotPassword({ listUserByEmail: userService.listUserByEmail, editPasswordResetTokenAndExpires: userService.editPasswordResetTokenAndExpires, Email, AppError })

const patchResetPassword = makePatchResetPassword({
    listUserByResetToken: userService.listUserByResetToken,
    editPassword: userService.editPassword,
    editPasswordResetTokenAndExpires: userService.editPasswordResetTokenAndExpires,
    sendToken: token.sendToken,
    crypto,
    AppError
})

const userController = Object.freeze({
    signup,
    login,
    patchForgetPassword,
    patchResetPassword
})

export default userController