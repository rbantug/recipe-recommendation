import userService from "../use-cases/index.js"
import makeProtectRoute from "./protectRoute.js"

import token from "../../utils/token.js"

const protectRoute = makeProtectRoute(userService.listUserById, token.verifyToken)

const userController = Object.freeze({
    protectRoute
})

export default userController