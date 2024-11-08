import express from "express"

import makeExpressCallback from "../../utils/express-callback.js"
import userController from "../controllers/index.js"
import AppError from "../../utils/AppError.js"

const userRouter = express.Router()

userRouter.post('/login', makeExpressCallback(userController.login, AppError))
userRouter.post('/signup', makeExpressCallback(userController.signup, AppError))


export default userRouter