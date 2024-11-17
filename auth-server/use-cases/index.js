//import joi from 'joi'

import makeAddUser from "./addUser.js";
import makeListUsers from "./listUsers.js";
import makeListUserById from "./listUserById.js";
import makeListUserByEmail from "./listUserByEmail.js"
import makeSignToken from './signToken.js';
import makeEditPassword from './editPassword.js'
import makeRemoveUser from './removeUser.js';
import makeEditPasswordResetTokenAndExpires from "./editPasswordResetTokenAndExpires.js";

import { usersDB } from "../../database/index.js"
import identity from "../../utils/id.js";
import passwordEncrypt from '../../utils/passwordEncryption.js'
import token from '../../utils/token.js'
import validators from "../../utils/validator.js";

const addUser = makeAddUser({ usersDB, encrypt: passwordEncrypt.encryptPassword })
const listUsers = makeListUsers({ usersDB })
const listUserById = makeListUserById({ usersDB, isValid: identity.isValid })
const listUserByEmail = makeListUserByEmail({ usersDB, checkEmail: validators.checkEmail })
const signToken = makeSignToken({ createToken: token.signToken })
const editPassword = makeEditPassword({ usersDB, encrypt: passwordEncrypt.encryptPassword })
const removeUser = makeRemoveUser({ usersDB })
const editPasswordResetTokenAndExpires = makeEditPasswordResetTokenAndExpires({ usersDB })

const userService = Object.freeze({
    addUser,
    listUsers,
    listUserById,
    listUserByEmail,
    signToken,
    editPassword,
    editPasswordResetTokenAndExpires,
    removeUser
})

export default userService;