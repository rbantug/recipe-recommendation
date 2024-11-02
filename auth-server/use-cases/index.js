import joi from 'joi'

import makeAddUser from "./addUser.js";
import makeListUsers from "./listUsers.js";
import makeListUserById from "./listUserById.js";
import makeListUserByEmail from "./listUserByEmail.js"
import makeSignToken from './signToken.js';
import makeEditPassword from './editPassword.js'
import makeRemoveUser from './removeUser.js';

import { usersDB } from "../../database/index.js"
import identity from "../../utils/id.js";
import passwordEncrypt from '../../utils/passwordEncryption.js'
import token from '../../utils/token.js'

const addUser = makeAddUser({ usersDB, encrypt: passwordEncrypt.encrypt })
const listUsers = makeListUsers({ usersDB })
const listUserById = makeListUserById({ usersDB, isValid: identity.isValid })
const listUserByEmail = makeListUserByEmail({ usersDB, joi })
const signToken = makeSignToken({ createToken: token.sign })
const editPassword = makeEditPassword({ usersDB, encrypt: passwordEncrypt.encrypt })
const removeUser = makeRemoveUser({ usersDB })

const userService = Object.freeze({
    addUser,
    listUsers,
    listUserById,
    listUserByEmail,
    signToken,
    editPassword,
    removeUser
})

export default userService;