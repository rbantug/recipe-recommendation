import makeListUsers from "./listUsers.js";
import makeListUserById from "./listUserById.js";

import { usersDB } from "../database/userDB.js"
import identity from "../../utils/id.js";

const listUsers = makeListUsers({ usersDB })
const listUserById = makeListUserById({ usersDB, isValid: identity.isValid })

const userService = Object.freeze({
    listUsers,
    listUserById
})

export default userService;