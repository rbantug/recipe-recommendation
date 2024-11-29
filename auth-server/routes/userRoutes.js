import express from "express"

import makeExpressCallback from "../../utils/express-callback.js"
import userController from "../controllers/index.js"
import userService from "../use-cases/index.js"
import token from "../../utils/token.js"
import AppError from "../../utils/AppError.js"

// middlewares
import makeProtectRoute from "../controllers/middlewares/protectRoute.js"

const userRouter = express.Router()

userRouter.post(
    '/login', 
    makeExpressCallback(userController.login, AppError)
)
userRouter.post(
    '/signup', 
    makeExpressCallback(userController.signup, AppError)
)

userRouter.patch(
    '/forgotPassword', 
    makeExpressCallback(userController.patchForgetPassword, AppError)
)
userRouter.patch(
    '/resetPassword/:token', 
    makeExpressCallback(userController.patchResetPassword, AppError)
)

userRouter.use(makeProtectRoute(userService.listUserById, token.verifyToken, AppError))

userRouter
    .patch(
        '/updateMyPassword', 
        makeExpressCallback(userController.patchMyPassword, AppError),
    )


export default userRouter